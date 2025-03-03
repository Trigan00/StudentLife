import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Главная</Link>
          </li>
          <li>
            <Link to='/todos'>Список задач</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
