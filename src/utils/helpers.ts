import { MediaInterface } from '@/utils/types';

export const addAttributes = (list: MediaInterface[]) => {
    return list.map((item: MediaInterface) => ({
        ...item,
        media_type: 'movie',
    }));
};