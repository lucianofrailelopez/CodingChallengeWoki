import { MediaInterface } from '@/utils/types';
import Image from 'next/image';
import { Rating } from '@/components/Rating';

interface CardProps {
    item: MediaInterface;
}

export const Card = ({ item }: CardProps) => {
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE;

    return (
        <div
            className={`hover:cursor-pointer relative hover:scale-[1.01] transition-all`}
        >
            <Image
                className="relative"
                src={`${imageBaseUrl}${item?.poster_path}`}
                alt="poster"
                width={500}
                height={500}
            />
            <span className="absolute top-2 left-2 bg-[#ffffffaa] px-2 text-sm rounded-lg font-semibold text-black">
                {item?.release_date.split('-')[0]}
            </span>
            <h2 className="absolute p-2 bottom-0 left-0 font-semibold text-white bg-gradient-to-b from-transparent to-black w-full">
                {item?.title}
            </h2>
            <div className="absolute top-0 right-0">
                <Rating movieRating={item?.vote_average} />
            </div>
        </div>
    );
};