import {
  Typography,
  TextField,
  Box,
  Stack,
  CircularProgress,
  IconButton,
  Button,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import MyModal from '../UI/MyModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAddQandA } from '@/hooks/useQandA';
import { COLORS } from '@/utils/GeneralConsts';
import { VisuallyHiddenInput } from '../UI/VisuallyHidenInput';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router-dom';

interface QandAFormI {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

export function QandAForm({ isModal, setIsModal }: QandAFormI) {
  const { id: classId } = useParams();
  const { addQandA, isPending } = useAddQandA(() => {
    onClose();
    setIsModal(false);
  });
  const [question, setQuestion] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [answer, setAnswer] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const removeFileHandler = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  const submit = (event: React.FormEvent) => {
    if (!question.trim()) return setErrMsg('Не может быть пустым');
    event.preventDefault();
    const formData = new FormData();
    formData.append('question', question);
    formData.append('answer', answer);
    formData.append('classId', String(classId));
    files.forEach((file) => formData.append('files', file));

    addQandA(formData);
  };

  function onClose() {
    setErrMsg('');
    setQuestion('');
    setAnswer('');
  }

  return (
    <MyModal
      isModal={isModal}
      setIsModal={setIsModal}
      onClose={onClose}
      maxWidth={800}
    >
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '18px',
          mb: 2,
          textAlign: 'center',
        }}
      >
        Добавить вопрос
      </Typography>
      <Stack spacing={2}>
        <Box display='flex' gap={1}>
          <TextField
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            error={!!errMsg}
            helperText={errMsg}
            size='small'
            label='Вопрос'
            variant='outlined'
            multiline
            maxRows={3}
            type='text'
            fullWidth
            margin='none'
          />

          {/* <IconButton
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
          </IconButton> */}
        </Box>
        <TextField
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          multiline
          minRows={5}
          size='small'
          label='Ответ'
          variant='outlined'
          type='text'
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            size='small'
            style={{ marginRight: '10px' }}
            onClick={() => {
              onClose();
              setIsModal(false);
            }}
          >
            Отменить
          </Button>
          <Button
            variant='contained'
            size='small'
            color='primary'
            sx={{ color: 'white' }}
            onClick={submit}
            loading={isPending}
          >
            Добавить
          </Button>
        </Box>
      </Stack>

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
    </MyModal>
  );
}
