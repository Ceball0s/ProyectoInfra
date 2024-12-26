import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../types/AuthContext';

export const ButtonProfile: React.FC = () => {
    const navigate = useNavigate();  // Usamos el hook de navegación para redirigir
    //const { token, user, logout } = useAuth();
    const {  user, logout } = useAuth();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };
    const toProfile = () => {
        navigate('/Profile');
    }

    const toSubasta = () => {
        navigate('/subastas');
    }

    const toLogout = () => {
        logout();
        navigate('/');
    }


    return (
        <div className="relative">
            <button
                data-popover-target=  "menu-1"
                data-popover-nested= "true"
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-red-700 transition-all duration-300" type="button">
                <span role="img" aria-label="Perfil">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            {isMenuVisible && (
            <ul
            role="menu"
            data-popover="menu-1"
            data-popover-placement="bottom"
            className="absolute right-0 mt-2 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
                <li
                        role="menuitem"
                        className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        onClick={toProfile}
                    >
                        {user?.username}
                </li>
                
                
                <li
                    role="menuitem"
                    className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                    onClick={toSubasta}
                >
                    {`Mis Subastas`}
                </li>
                <li
                    role="menuitem"
                    className="cursor-pointer text-slate-800 text-sm flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                    onClick={toLogout}
                >
                    {`Salir`}
                </li>
            </ul>
            )}
        </div>
    );
}