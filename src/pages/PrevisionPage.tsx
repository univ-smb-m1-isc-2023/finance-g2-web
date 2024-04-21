import { Button, Card, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { BasePage } from '../component/base/BasePage';
import Prevision from '../object/Prevision';
import { PrevisionListTable } from '../component/PrevisionListTable';
import { DeletePrevisionModal } from '../component/modal/DeletePrevisionModal';
import { PrevisionModal } from '../component/modal/PrevisionModal';
import { useParams } from 'react-router-dom';
import { get } from '../utils/http';

export const PrevisionPage = () => {
    const { id } = useParams();
    const [search, setSearch] = useState<string>('');
    const [createPrevision, setCreatePrevision] = useState<boolean>(false);
    const [deletePrevision, setDeletePrevision] = useState<boolean>(false);
    const [editPrevision, setEditPrevision] = useState<boolean>(false);
    const [PrevisionForModal, setPrevisionForModal] = useState<Prevision | null>(null);
    const [previsionList, setPrevisionList] = useState<Prevision[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        setError('');
        (async () => {
            const previsionListInfo = await get('/forecast/account', { account: id });
            setLoading(false);
            if (previsionListInfo.error) {
                setError(previsionListInfo.error);
                return;
            }
            setPrevisionList(previsionListInfo);
        })();
    }, [, createPrevision, deletePrevision, editPrevision]);

    const onAdd = () => {
        setCreatePrevision(true);
    };

    const onEdit = (prevision: Prevision) => {
        setEditPrevision(true);
        setPrevisionForModal(prevision);
    };

    const onDelete = (prevision: Prevision) => {
        setPrevisionForModal(prevision);
        setDeletePrevision(true);
    };

    const { t } = useTranslation();

    return (
        <BasePage>
            <div className='flex flex-col pb-4 px-4 mx-auto max-w-screen-xl text-center lg:pb-8 lg:px-12 w-full gap-4'>
                <h1 className='text-4xl font-bold'>{t('prevision.title')}</h1>

                <p className='text-xl'>{t('prevision.description')}</p>

                <Card className='flex mb-4 w-full '>
                    <div className='flex flex-row items-center justify-center gap-3'>
                        <TextInput
                            className='flex-1'
                            id='search'
                            name='search'
                            placeholder={t('prevision.search')}
                            type='text'
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Button
                            className='bg-secondary text-white'
                            onClick={() => {
                                setCreatePrevision(true);
                            }}
                        >
                            <span className='flex flex-row gap-2'>
                                <PlusCircleIcon className='h-6 w-6' />
                                {t('prevision.add_prevision')}
                            </span>
                        </Button>
                    </div>
                </Card>
                <div className='w-full'>
                    <PrevisionListTable
                        onAdd={onAdd}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        search={search}
                        previsionList={previsionList}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>

            <PrevisionModal
                open={createPrevision}
                onClose={() => setCreatePrevision(false)}
                prevision={null}
            />

            <PrevisionModal
                open={editPrevision}
                onClose={() => setEditPrevision(false)}
                prevision={PrevisionForModal}
            />

            <DeletePrevisionModal
                open={deletePrevision}
                onClose={() => setDeletePrevision(false)}
                prevision={PrevisionForModal}
            />
        </BasePage>
    );
};
