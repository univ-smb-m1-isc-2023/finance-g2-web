import { Button, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { post } from '../utils/http';

export const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        setMessage('');
        const result = await post('/auth/login', { email: email, password: password });
        setLoading(false);
        console.log(result);
        /*
        if (result.status === 'success') {
            localStorage.setItem('accessToken', result.data.accessToken);
            navigate('/');
        } else {
            setMessage(t(`error.login`));
        }*/
    };

    return (
        <section className=''>
            <div className='flex gap-4 flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <img
                    className='h-24 w-24 object-contain'
                    src='/image/smartcash.png'
                    alt='logo'
                />
                <div className='w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 '>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                            {t('login.title')}
                        </h1>
                        <form className='space-y-4 md:space-y-6'>
                            <div>
                                <label
                                    htmlFor='email'
                                    className='block mb-2 text-sm font-medium text-gray-900 '
                                >
                                    {t('login.email')}
                                </label>
                                <TextInput
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={email}
                                    className='text-black'
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='name@company.com'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='password'
                                    className='block mb-2 text-sm font-medium text-gray-900 '
                                >
                                    {t('login.password')}
                                </label>
                                <TextInput
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='••••••••'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='text-black'
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-start'>
                                    <div className='flex items-center h-5'>
                                        <TextInput
                                            id='remember'
                                            aria-describedby='remember'
                                            type='checkbox'
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                            className=''
                                        />
                                    </div>
                                    <div className='ml-3 text-sm'>
                                        <label
                                            htmlFor='remember'
                                            className='text-gray-500 '
                                        >
                                            {t('login.remember')}
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href='#'
                                    className='text-sm font-medium text-primary-600 hover:underline '
                                >
                                    {t('login.forgot')}
                                </a>
                            </div>
                            {message !== '' && (
                                <div>
                                    <p className='text-sm text-red-500 '>{message}</p>
                                </div>
                            )}
                            {loading && (
                                <div className='flex justify-center items-center text-center'>
                                    <Spinner />
                                </div>
                            )}
                            <Button
                                onClick={login}
                                className='w-full bg-secondary '
                                disabled={loading}
                            >
                                {t('login.login')}
                            </Button>
                            <p className='text-sm font-light text-gray-500 '>
                                {t('login.no_account')}{' '}
                                <a
                                    href='#'
                                    className='font-medium text-primary-600 hover:underline '
                                >
                                    {t('login.register')}
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
