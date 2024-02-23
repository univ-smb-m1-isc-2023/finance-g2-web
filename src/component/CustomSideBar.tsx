import { Sidebar, SidebarProps } from 'flowbite-react';
import { useLocation, matchRoutes } from 'react-router-dom';
import { HiHome, HiUser } from 'react-icons/hi';
import User from '../object/User';
import { CustomSideBarItem } from './CustomSideBarItem';

const routes = [
    {
        path: '/',
    },
    {
        path: '/fournisseur',
    },
    {
        path: '/client',
    },
    {
        path: '/account',
    },
    {
        path: '/param',
    },
    {
        path: '/user',
    },
];

export const CustomSideBar = (props: SidebarProps) => {
    const { collapsed = false } = props;

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
                        label={"Home"}
                    />
                    <CustomSideBarItem
                        collapsed={collapsed}
                        path='/line'
                        active={route?.path === '/line'}
                        icon={HiUser as any}
                        label={"Line"}
                    />
                    <CustomSideBarItem
                        collapsed={collapsed}
                        path='/pie'
                        active={route?.path === '/pie'}
                        icon={HiUser as any}
                        label={"Pie"}
                    />
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};
