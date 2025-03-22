import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { COLORS } from '@/utils/GeneralConsts';
import {
  useAddComment,
  useAllComments,
  useDeleteComment,
} from '@/hooks/useComments';
import { Loader } from '../UI/Loader/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentCard } from './CommentCard';
import DeleteModal from '../DeleteModal';
import shortenText from '@/helpers/shortenText';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface CommentsI {
  taskId: number;
}

export function Comments({ taskId }: CommentsI) {
  const { data, isLoading } = useAllComments(taskId);
  const { addComment, isPending } = useAddComment(taskId, () => {
    setText('');
    setFiles([]);
  });
  const { deleteComment, isDeletePending } = useDeleteComment(taskId);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFileHandler = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('taskId', String(taskId));
    formData.append('text', text);
    files.forEach((file) => formData.append('files', file));

    addComment(formData);
  };

  const deleteCommentHandler = (id: number) => {
    setDeleteCommentId(id);
    setDeleteModal(true);
  };

  return (
    <Stack mt={3} spacing={3}>
      <Divider />
      <Typography variant='h6' color='textSecondary' fontWeight='bold'>
        Комментарии
      </Typography>
      <Box>
        {isLoading ? (
          <Loader />
        ) : (
          data?.map((data) => (
            <CommentCard
              key={data.id}
              data={data}
              onDelete={deleteCommentHandler}
            />
          ))
        )}
      </Box>
      <Box display='flex' gap={1}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          size='small'
          label='Комментировать'
          variant='outlined'
          multiline
          maxRows={3}
          type='text'
          fullWidth
          margin='none'
        />
        {isPending ? (
          <CircularProgress />
        ) : (
          <>
            <IconButton
              component='label'
              role={undefined}
              tabIndex={-1}
              sx={{
                backgroundColor: COLORS.primary,
                height: '40px',
                width: '40px',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: COLORS.darkBlue,
                },
              }}
            >
              <VisuallyHiddenInput
                type='file'
                onChange={handleFileChange}
                multiple
              />
              <AttachFileIcon sx={{ color: 'white' }} fontSize='small' />
            </IconButton>

            <IconButton
              sx={{
                backgroundColor: COLORS.primary,
                height: '40px',
                width: '40px',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: COLORS.darkBlue,
                },
              }}
              onClick={handleSubmit}
            >
              <ArrowForwardIosIcon sx={{ color: 'white' }} fontSize='small' />
            </IconButton>
          </>
        )}
      </Box>

      <Stack spacing={2}>
        {files &&
          files.map((file) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                p: 1,
                borderRadius: '10px',
              }}
              key={file.name}
            >
              <IconButton
                color='error'
                size='small'
                onClick={() => removeFileHandler(file.name)}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
              <Typography ml={1} variant='subtitle2'>
                {file.name}
              </Typography>
            </Box>
          ))}
      </Stack>

      {!!deleteCommentId && (
        <DeleteModal
          isModal={deleteModal}
          setIsModal={setDeleteModal}
          deleteFunction={() => deleteComment(deleteCommentId)}
          isLoading={isDeletePending}
          title='Удалить комментарий?'
          subtitle={`Комментарий "${shortenText(
            data?.find((comment) => comment.id === deleteCommentId)?.text || '',
            50,
          )}" будет безвозвратно удален.`}
          confirmation='Удалить комментарий.'
        />
      )}
    </Stack>
  );
}
