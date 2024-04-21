import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinePage from './pages/LinePage';
import { PiePage } from './pages/PiePage';
import { LoginPage } from './pages/LoginPage';
import { CagnottePage } from './pages/CagnottePage';
import { TransactionPage } from './pages/TransactionPage';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterPage } from './pages/RegisterPage';
import { ComptePage } from './pages/ComptePage';
import { UserProvider } from './context/UserContext';
import { PrevisionPage } from './pages/PrevisionPage';
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route
                        path='/'
                        Component={DashboardPage}
                    />
                    <Route
                        path='/account'
                        Component={ComptePage}
                    />
                    <Route
                        path='/account/jackpot/:id'
                        Component={CagnottePage}
                    />
                    <Route
                        path='/account/spent/:id'
                        Component={TransactionPage}
                    />
                    <Route
                        path='/account/forecast/:id'
                        Component={PrevisionPage}
                    />
                    <Route
                        path='/login'
                        Component={LoginPage}
                    />
                    <Route
                        path='/register'
                        Component={RegisterPage}
                    />
                    <Route
                        path='/line'
                        Component={LinePage}
                    />
                    <Route
                        path='/pie'
                        Component={PiePage}
                    />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
};
