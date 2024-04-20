import { useTranslation } from 'react-i18next';
import UserDropdown from './UserDropdown';

interface CustomNavBarProps {
    collapsed: boolean;
    onCollapse: (val: boolean) => void;
}

export const CustomNavBar = (props: CustomNavBarProps) => {
    const { t } = useTranslation();
    return (
        <nav className='border-b fixed z-[40] w-full border-gray-200 bg-white h-16 py-2.5 px-3 dark:border-gray-700 dark:bg-gray-800'>
            <div className='mx-auto flex flex-wrap items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <button
                        aria-label='Toggle dark mode'
                        data-testid='dark-theme-toggle'
                        type='button'
                        onClick={() => {
                            props.onCollapse?.(!props.collapsed);
                        }}
                        className='rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                    >
                        <svg
                            stroke='currentColor'
                            fill='currentColor'
                            strokeWidth='0'
                            viewBox='0 0 20 20'
                            className='h-6 w-6 cursor-pointer text-gray-600 dark:text-gray-400'
                            height='1em'
                            width='1em'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                    </button>
                    <img
                        src='/image/smartcash.png'
                        className='h-10 w-10 object-contain'
                        alt={t('navbar.logo')}
                    />
                    <span className='text-xl font-semibold dark:text-white'>{t('navbar.app_name')}</span>
                </div>
                <div className='flex items-center gap-4 mr-2'>
                    <UserDropdown />
                </div>
            </div>
        </nav>
    );
};
