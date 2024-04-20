import { useNavigate } from 'react-router-dom';
import { BasePage } from '../component/BasePage';

export const HomePage = () => {
    const navigate = useNavigate();
    if (!localStorage.getItem('email')) navigate('/login');
    return (
        <BasePage>
            <h1>Home</h1>
        </BasePage>
    );
};
