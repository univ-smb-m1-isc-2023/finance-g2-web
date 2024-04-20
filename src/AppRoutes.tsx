import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LinePage from './pages/LinePage';
import { PiePage } from './pages/PiePage';
import { LoginPage } from './pages/LoginPage';
import { CagnottePage } from './pages/CagnottePage';
import { DepensePage } from './pages/DepensePage';
import { DashboardPage } from './pages/DashboardPage';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    Component={DashboardPage}
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
                    path='/line'
                    Component={LinePage}
                />
                <Route
                    path='/pie'
                    Component={PiePage}
                />
            </Routes>
        </BrowserRouter>
    );
};
