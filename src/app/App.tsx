import AppRouter from './providers/router/ui/AppRouter';
import './styles/index.scss';
import Star from 'shared/assets/images/add-circle-svgrepo-com.svg';
import { Main } from 'pages/Main/ui/Main';
import { NavBar } from 'widgets/NavBar';
import { createContext } from 'vm';
import { useState } from 'react';

const App = () => {

    // const FormContext = createContext();
    // const data = useState()

    return (
        <div className="app">
            <NavBar />
            <main className="main">
                <AppRouter />
            </main>
        </div>
    );
};

export default App;