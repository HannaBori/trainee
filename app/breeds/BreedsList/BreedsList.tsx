"use client"

import { DogsType } from '@/app/types/types'
import styles from './BreedsList.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect, useState } from 'react';
import { fetchBreeds, removeBreed } from '@/app/redux/features/breedsSlice';
import IconHeart from '../../components/SVG/IconHeart';
import Pagination from '../../components/Pagination/Pagination';
import { useRouter } from 'next/navigation';
import IconDelete from '@/app/components/SVG/IconDelete';
import { addFavorites, removeFavorites } from '@/app/redux/features/favoriteSlice';

const BreedList = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const breeds = useAppSelector(state=>state.breeds.breeds);
    const total = useAppSelector(state => state.breeds.total);
    const [page, setPage] = useState(0);
    const favorites = useAppSelector(state => state.favorites.favorites);
    const showFav = useAppSelector(state => state.favorites.showFav);

    const startIndex = page * 12;
    const endIndex = startIndex + 12;
    const totalPages = showFav ? 1 : Math.ceil(Number(total) / 12); 
    const sort = [...(showFav ? breeds.filter(breed => favorites.includes(breed.id)) : breeds)].sort((a, b) => a.name.localeCompare(b.name));
    const currentBreeds =  sort.slice(startIndex, endIndex);
    

   const handleDogSelect = (props: number) => (e: React.MouseEvent) => {
        e.preventDefault(); 
        router.push(`/breeds/${props}`);
    };
    const handleRemove = (prop: number) => (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(removeBreed(prop)); 
        dispatch(removeFavorites(prop));
    };

    const handleToggleFavorites = (prop:number) => (e: React.MouseEvent) => {
        e.stopPropagation()
        if (favorites.includes(prop)) {
            dispatch(removeFavorites(prop)); 
        } else {
            dispatch(addFavorites(prop));
        }
    };

    useEffect(() => {
        const totalPages = showFav ? 1 : Math.ceil(Number(total) / 12);
        if (page >= totalPages && totalPages > 0) {
            setPage(totalPages - 1);
        }
    }, [total, page, favorites]);
    
    return(
        <div className={styles.breedList}>
            
            <div className={styles.breedList__wrapper}>
                {currentBreeds?.map((breed:DogsType)=>(
                    <div key={breed.id} className={styles.breedList__container} onClick={handleDogSelect(breed.id)}>
                        {breed.reference_image_id ? (<img src={`https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`} className={styles.breedList__img} />):<img src={`https://mvd.gov.by/assets/img/nophoto.jpg`} className={styles.breedList__img} />}
                        <div className={styles.breedList__info}>
                            <p className={styles.breedList__name}>{breed.name}</p>
                            <div className={`${styles.breedList__favorite} ${favorites.includes(breed.id) ? styles.breedList__fav : ''}`} onClick={handleToggleFavorites(breed.id)}><IconHeart/></div>
                            <div className={styles.breedList__delete} onClick={handleRemove(breed.id)}><IconDelete/></div>
                        </div>
                    </div>
                ))}
            </div>
                {
                  !showFav && breeds && breeds.length > 0 &&(
                        <div className={styles.breedList__paginationWrap}>
                            <Pagination currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}/>
                        </div>
                    )
                }
            
        </div>
    )

}

export default BreedList