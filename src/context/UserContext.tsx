import { createContext, useContext, FunctionComponent } from 'react';
import User from '../object/User';

interface UserContextType {
    user: User;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
    const user = User.getInstance();

    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context.user;
};
