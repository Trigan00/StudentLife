import { routes } from '@/utils/routesConsts';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TasksPage: React.FC = () => {
  const navigate = useNavigate();

  const goToTask2 = () => {
    navigate(`${routes.TASKS_ROUTE}/2`);
  };

  return (
    <div>
      <h1>Tasks Page</h1>
      <p>Welcome to the Tasks Page. Here you can manage all your tasks.</p>
      <button onClick={goToTask2}>Перейти к задаче 2</button>
    </div>
  );
};

export default TasksPage;
