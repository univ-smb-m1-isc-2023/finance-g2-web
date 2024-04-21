import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinePage from './pages/LinePage';
import { PiePage } from './pages/PiePage';
import { LoginPage } from './pages/LoginPage';
import { CagnottePage } from './pages/CagnottePage';
import { DepensePage } from './pages/DepensePage';
import { DashboardPage } from './pages/DashboardPage';
import { RegisterPage } from './pages/RegisterPage';
import { ComptePage } from './pages/ComptePage';
import { UserProvider } from './context/UserContext';
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
                        path='/jackpot'
                        Component={CagnottePage}
                    />
                    <Route
                        path='/spent'
                        Component={DepensePage}
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
