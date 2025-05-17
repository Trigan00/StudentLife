import AddQandAButton from '@/components/QandA/AddQandAButton';
import { Loader } from '@/components/UI/Loader/Loader';
import { useAllClasses } from '@/hooks/useClasses';
import { useAllQandAs, useDeleteQandA } from '@/hooks/useQandA';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface QuestionCardProps {
  index: number;
  id: number;
  question: string;
  answer: string;
  deleteHandler: (id: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  index,
  id,
  question,
  answer,
  deleteHandler,
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const toggleAnswer = () => setShowAnswer(!showAnswer);

  return (
    <Box display='flex' justifyContent={'space-between'} alignItems={'start'}>
      <Typography sx={{ mr: 1 }}>{index + 1}.</Typography>
      <Paper
        elevation={3}
        sx={{ marginBottom: 2, width: '100%', p: 1, borderRadius: '15px' }}
      >
        <Typography variant='h6'>{question}</Typography>
        <Collapse in={showAnswer}>
          <Typography variant='body1' sx={{ marginTop: 1 }}>
            {answer}
          </Typography>
        </Collapse>
        <Button onClick={toggleAnswer} sx={{ marginTop: 1 }}>
          {showAnswer ? 'Скрыть ответ' : 'Показать ответ'}
        </Button>
      </Paper>
      <IconButton size='small' onClick={() => deleteHandler(id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

const QandAPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useAllQandAs(Number(id));
  const { data: classes, isLoading: isClassesLoading } = useAllClasses();
  const { deleteQandA } = useDeleteQandA();

  const deleteHandler = (id: number) => {
    deleteQandA(id);
    // setDeleteCommentId(id);
    // setDeleteModal(true);
  };

  if (isLoading || isClassesLoading) return <Loader />;

  return (
    <Container>
      <Stack direction='row' spacing={2} ml={5} mb={2}>
        <Typography variant='h5'>
          Вопросы по предмету «
          {classes?.find((el) => el.id === Number(id))?.name}»
        </Typography>
        <AddQandAButton />
      </Stack>
      <div>
        {data?.map((item, i) => (
          <QuestionCard
            index={i}
            key={item.id}
            id={item.id}
            question={item.question}
            answer={item.answer}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </Container>
  );
};

export default QandAPage;
