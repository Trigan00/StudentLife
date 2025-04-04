import { Comment } from '@/types/comments.types';
import { COLORS, dayCalendarConfig } from '@/utils/GeneralConsts';
import { Box, Avatar, Typography, Card, IconButton } from '@mui/material';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
import DescriptionIcon from '@mui/icons-material/Description';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.locale('ru');

export const CommentCard: React.FC<{
  data: Comment;
  onDelete: (id: number) => void;
}> = ({ data, onDelete }) => {
  return (
    <Box display={'flex'} gap={1} mb={2}>
      <Avatar
        alt={data.username}
        sx={{
          width: '30px',
          height: '30px',
        }}
      />
      <Box width={'100%'}>
        <Box display='flex' justifyContent={'space-between'}>
          <Box
            display='flex'
            alignItems='center'
            gap={1}
            height={'fit-content'}
          >
            <Typography fontWeight='600'>{data.username}</Typography>
            <Typography variant='caption' color={COLORS.textGrey}>
              {dayjs(data.createdAt).calendar(null, dayCalendarConfig)}
            </Typography>
          </Box>
          <IconButton size='small' onClick={() => onDelete(data.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography variant='body2'>{data.text}</Typography>
        {data.attachments.length > 0 &&
          data.attachments.map((file) => (
            <Card
              key={file.id}
              variant='outlined'
              sx={{
                mt: 1,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: 'fit-content',
                minWidth: '150px',
              }}
            >
              <DescriptionIcon color='primary' />
              <Typography
                component={'a'}
                variant='subtitle2'
                sx={{
                  color: 'grey',
                  fontWeight: '600',
                  textDecoration: 'none',
                }}
                key={file.id}
                href={`${process.env.REACT_APP_SERVERURL}/uploads/${file.path}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {file.filename}
              </Typography>
            </Card>
          ))}
      </Box>
    </Box>
  );
};
