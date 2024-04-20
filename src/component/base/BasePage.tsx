import { SidebarProps } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CustomNavBar } from './CustomNavBar';
import { CustomFooter } from './CustomFooter';
import { CustomSideBar } from './CustomSideBar';
import useWindowDimensions from '../../utils/useWindowsDimensions';

export const BasePage = (props: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const { height, width } = useWindowDimensions();

    useEffect(() => {
        if (width < 1280) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [width]);

    return (
        <div className='w-full bg-stone-100 dark:bg-gray-900 flex flex-col h-full overflow-scroll'>
            <CustomNavBar
                collapsed={collapsed}
                onCollapse={() => setCollapsed(!collapsed)}
            />
            <div className='flex flex-row h-full'>
                <CustomSideBar collapsed={collapsed} />
                <div
                    className='flex-1 h-full flex flex-col justify-between pt-16 min-h-screen'
                    style={{
                        paddingLeft: collapsed ? '4rem' : '16rem',
                    }}
                >
                    <div className='flex flex-col flex-1 p-8'>{props.children}</div>
                    <CustomFooter />
                </div>
            </div>
        </div>
    );
};
