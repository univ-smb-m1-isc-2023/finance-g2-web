import { Sidebar, SidebarProps } from 'flowbite-react';
import { useLocation, matchRoutes } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { CustomSideBarItem } from './CustomSideBarItem';
import { useTranslation } from 'react-i18next';
import { FaChartPie, FaChartLine } from 'react-icons/fa';

const routes = [
    {
        path: '/',
    },
];

export const CustomSideBar = (props: SidebarProps) => {
    const { collapsed = false } = props;

    const { t } = useTranslation();

    const location = useLocation();

    try {
        var [{ route }] = matchRoutes(routes, location) as any;
    } catch (e) {
        route = '';
    }

    return (
        <Sidebar
            collapsed={props.collapsed}
            aria-label='Sidebar with content separator example'
            className='fixed pt-16 !bg-stone-100 z-[30] border-r border-gray-200  dark:border-gray-700'
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <CustomSideBarItem
                        collapsed={collapsed}
                        path='/'
                        active={route?.path === '/'}
                        icon={HiHome as any}
                        label={t('sidebar.home')}
                    />
                    <CustomSideBarItem
                        collapsed={collapsed}
                        path='/line'
                        active={route?.path === '/line'}
                        icon={FaChartLine as any}
                        label={t('sidebar.line')}
                    />
                    <CustomSideBarItem
                        collapsed={collapsed}
                        path='/pie'
                        active={route?.path === '/pie'}
                        icon={FaChartPie as any}
                        label={t('sidebar.pie')}
                    />
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};
