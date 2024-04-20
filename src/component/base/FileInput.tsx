import { Component } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import { Button } from 'flowbite-react';

export interface IFileInputProps {
    onChange: (file: File | null) => void;
    value: File | null | string;
}

export interface IFileInputState {
    drag: boolean;
}

export default class CustomFileInput extends Component<IFileInputProps, IFileInputState> {
    constructor(props: IFileInputProps) {
        super(props);

        this.state = {
            drag: false,
        };
    }

    handleDrag(e: any) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            this.setState({ drag: true });
        } else if (e.type === 'dragleave') {
            this.setState({ drag: false });
        }
    }

    handleDrop(e: any) {
        const { onChange, value } = this.props;
        e.preventDefault();
        e.stopPropagation();
        this.setState({ drag: false });
        if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
            onChange(e.dataTransfer.files.item(0));
        } else {
            onChange(null);
        }
    }
    handleChange(e: any) {
        const { onChange, value } = this.props;
        e.preventDefault();
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            onChange(e.currentTarget.files.item(0));
        } else {
            onChange(null);
        }
    }

    render() {
        const { onChange, value } = this.props;
        const { drag } = this.state;

        return (
            <form
                className={'dark w-full h-56'}
                onDragEnter={(e) => this.handleDrag(e)}
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type='file'
                    className='hidden'
                    id='input-file-upload'
                    multiple={true}
                    onChange={(e) => this.handleChange(e)}
                />
                <label
                    id='label-file-upload'
                    htmlFor='input-file-upload'
                    className={
                        'h-full bg-gray-50 rounded-lg py-12 border-2 border-gray-300 border-dashed cursor-pointer flex flex-col justify-center items-center  dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:text-gray-400 ' +
                        (drag ? ' dark:bg-blue-700 dark:text-white ' : '')
                    }
                >
                    <svg
                        aria-hidden='true'
                        className='mb-3 w-10 h-10'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                        ></path>
                    </svg>

                    {value === null || value === '' ? (
                        <p className='mb-2 text-sm'>
                            <span className='font-semibold'>Cliquez pour rechercher</span> ou glisser-déposer
                        </p>
                    ) : (
                        <p className=' font-semibold mb-2 text-base text-black dark:text-white'>
                            {typeof value === 'string' ? value : value.name}
                        </p>
                    )}
                    {/*
                        <p className="text-xs">PNG, JPG ou JPEG</p>
                        */}
                    {value !== null && value !== '' && (
                        <Button
                            className='bg-red-500 text-white'
                            pill
                            onClick={() => {
                                onChange(null);
                            }}
                        >
                            <TrashIcon />
                            Supprimer
                        </Button>
                    )}
                </label>

                {drag && (
                    <div
                        className='absolute w-full h-full top-0 bottom-0 right-0 left-0'
                        onDragEnter={(e) => this.handleDrag(e)}
                        onDragLeave={(e) => this.handleDrag(e)}
                        onDragOver={(e) => this.handleDrag(e)}
                        onDrop={(e) => this.handleDrop(e)}
                    ></div>
                )}
            </form>
        );
    }
}
