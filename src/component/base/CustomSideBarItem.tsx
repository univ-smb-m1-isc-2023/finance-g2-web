import { Sidebar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

interface CustomSideBarItemProps {
    path: string;
    active: boolean;
    icon: React.ForwardRefExoticComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
            titleId?: string | undefined;
        }
    >;
    label: string;
    collapsed: boolean;
}

export const CustomSideBarItem = (props: CustomSideBarItemProps) => {
    const { active, label } = props;
    const navigate = useNavigate();
    return (
        <Sidebar.Item
            active={active}
            icon={() => {
                let icon: JSX.Element | null;
                if (active) {
                    icon = (
                        <props.icon className='h-6 w-6 flex-shrink-0 text-primary-700 transition duration-75 group-hover:text-primary-900 dark:text-primary-400 dark:group-hover:text-white' />
                    );
                } else {
                    icon = (
                        <props.icon className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white' />
                    );
                }
                return icon;
            }}
            onClick={(e: any) => {
                e.preventDefault();
                navigate(props.path);
            }}
            href={props.path}
        >
            {active && !props.collapsed ? (
                <span className='text-primary-700 transition duration-75 group-hover:text-primary-900 dark:text-primary-400 dark:group-hover:text-white font-bold'>
                    {label}
                </span>
            ) : (
                label
            )}
        </Sidebar.Item>
    );
};
