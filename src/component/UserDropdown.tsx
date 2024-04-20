import { Avatar, Dropdown } from 'flowbite-react';
import User from '../object/User';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function UserDropdown() {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                <span className='block truncate text-sm font-medium'>{localStorage.getItem('email')}</span>
            </Dropdown.Header>
            <Dropdown.Item
                onClick={() => {
                    localStorage.clear();
                    navigate('/login');
                }}
            >
                {t('navbar.logout')}
            </Dropdown.Item>
        </Dropdown>
    );
}
