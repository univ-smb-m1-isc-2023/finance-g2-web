import { Footer, FooterProps } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

export const CustomFooter = (props: FooterProps) => {
    return (
        <Footer
            container={true}
            className='border-0 border-t border-gray-200  dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-none shadow-none'
        >
            <div className='w-full'>
                <div className='grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1'>
                    <div>
                        <Footer.Brand
                            href='/'
                            src='/smartcash.png'
                            alt='SmartCash Logo'
                            name='SmartCash'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright
                        href='#'
                        by='SmartCash™'
                        year={new Date().getFullYear()}
                    />
                    <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
                        <Footer.Icon
                            href='#'
                            icon={BsFacebook}
                        />
                        <Footer.Icon
                            href='#'
                            icon={BsInstagram}
                        />
                        <Footer.Icon
                            href='#'
                            icon={BsTwitter}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    );
};
