import { Loader } from '@/components/UI/Loader/Loader';
import { useAllClasses } from '@/hooks/useClasses';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { red, blue } from '@mui/material/colors';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/utils/routesConsts';

const getExamColor = () => {
  const shades = [red[300], red[400], red[500]];
  return shades[Math.floor(Math.random() * shades.length)];
};

const getCreditColor = () => {
  const shades = [blue[300], blue[400], blue[500]];
  return shades[Math.floor(Math.random() * shades.length)];
};

const ExamsPage: React.FC = () => {
  const { data, isLoading } = useAllClasses();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Typography variant='h5'>Экзамены/Зачеты</Typography>
      <Grid container spacing={2} mt={2}>
        {data
          ?.filter((s) => s.examType === 'exam' || s.examType === 'credit')
          ?.map((subject) => {
            const isExam = subject.examType === 'exam';
            const bgColor = isExam ? getExamColor() : getCreditColor();
            const hoverColor = isExam ? red[600] : blue[600];
            const Icon = isExam ? SchoolIcon : CheckCircleIcon;

            return (
              <Grid item xs={12} sm={6} md={4} key={subject.id}>
                <Card
                  sx={{
                    backgroundColor: bgColor,
                    color: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    transition:
                      'transform 0.2s, box-shadow 0.2s, background-color 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 6,
                      backgroundColor: hoverColor,
                    },
                  }}
                  onClick={() =>
                    navigate(routes.EXAMS_ROUTE + '/' + subject.id)
                  }
                >
                  <CardContent
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                  >
                    <Icon fontSize='large' />
                    <Box>
                      <Typography variant='h6'>{subject.name}</Typography>
                      <Typography variant='body1'>
                        {subject.examType === 'exam' ? 'Экзамен' : 'Зачет'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default ExamsPage;
