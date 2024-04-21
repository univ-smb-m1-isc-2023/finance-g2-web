import { Button, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../utils/Constant';
import { useUser } from '../context/UserContext';
import { get } from '../utils/http';
import User from '../object/User';

export const LoginPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const user = useUser();

    const login = async () => {
        setLoading(true);
        setMessage('');
        const response = await fetch(SERVER_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        });
        setLoading(false);

        if (!response.ok) {
            setMessage(t(`error.login`));
            return;
        } else {
            const result = await response.json();
            localStorage.setItem('accessToken', result.token);
            const userInfo = await get('/users/me', {});
            user.setUser(new User(userInfo.id, userInfo.fullName, userInfo.email, userInfo.email));
            navigate('/');
        }
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
                                    onClick={() => navigate('/register')}
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
