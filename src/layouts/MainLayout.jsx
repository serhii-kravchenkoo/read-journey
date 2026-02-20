import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import style from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={style.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
