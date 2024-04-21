import { BasePage } from '../component/base/BasePage';
import { useUser } from '../context/UserContext';

export const DashboardPage = () => {
    const user = useUser();
    return (
        <BasePage>
            <h1>Home</h1>
        </BasePage>
    );
};
