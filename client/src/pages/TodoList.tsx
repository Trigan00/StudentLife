import { Link } from 'react-router-dom';

const TodoList = () => {
  const todos = [
    { id: 1, title: 'Купить молоко' },
    { id: 2, title: 'Сделать уроки' },
    { id: 3, title: 'Позвонить другу' },
  ];

  return (
    <div>
      <h1>Список задач</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
