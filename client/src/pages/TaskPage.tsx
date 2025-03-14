import { useParams } from 'react-router-dom';

const TaskPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Задача #{id}</h1>
      <p>Описание задачи...</p>
    </div>
  );
};

export default TaskPage;
