import { Avatar, Dropdown } from 'flowbite-react';
import User from '../object/User';
import { useNavigate } from 'react-router-dom';

export default function UserDropdown() {
    const navigate = useNavigate();


    return (
        <Dropdown
            floatingArrow={false}
            arrowIcon={false}
            inline
            label={
                <Avatar
                    alt='User settings'
                    placeholderInitials={User.getInstance().getDisplayInitial()}
                    rounded
                />
            }
        >
            <Dropdown.Header>
                <span className='block text-sm'>{User.getInstance().getDisplayName()}</span>
                <span className='block truncate text-sm font-medium'>EMAIL</span>
            </Dropdown.Header>
            <Dropdown.Item
                onClick={() => {
                    navigate('/account');
                }}
            >
                Mes Informations
            </Dropdown.Item>
            <Dropdown.Item
                onClick={() => {
                    navigate('/param');
                }}
            >
                Paramètres
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
                onClick={() => {
                }}
            >
                Déconnexion
            </Dropdown.Item>
        </Dropdown>
    );
}
