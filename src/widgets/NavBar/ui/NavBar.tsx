import { AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import cls from './NavBar.module.scss';


export const NavBar = () => {
    return (
        <>
            <AppBar
                className={cls.navBar}
                position="static"
                sx={{
                    padding: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <div className={cls.links}>
                    <Link className={cls.link} to={'/'}>Главная</Link>
                    <Link className={cls.link} to={'/inputs'}>Инпуты</Link>
                    <Link className={cls.link} to={'/tables'}>Таблицы</Link>
                    <Link className={cls.link} to={'/forms'}>Формы</Link>
                    <Link className={cls.link} to={'/editor'}>Редактор</Link>
                </div>
            </AppBar>
        </>
    );
};
