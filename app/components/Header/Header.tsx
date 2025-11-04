"use client"

import Link from 'next/link'
import styles from './Header.module.scss'
import SearchInput from '../SearchInput/SearchInput'
import IconHeart from '../SVG/IconHeart'
import IconLogo from '../SVG/IconLogo'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { setShowFavorites } from '@/app/redux/features/favoriteSlice'
import { useEffect } from 'react'
import IconAdd from '../SVG/IconAdd'
import { useRouter } from 'next/navigation';

const Header = () =>{
    const dispatch = useAppDispatch();
     const router = useRouter();
    const showFav = useAppSelector((state) => state.favorites.showFav);
    const favorites = useAppSelector((state) => state.favorites.favorites);
    const showFavorites = ()  => {
           if(showFav){
                dispatch(setShowFavorites(false));
           } else{
                dispatch(setShowFavorites(true));
           }

    };
    const handleCreateBreed = ()  => {  
        router.push(`/create-breed`);
    };
    useEffect(() => {
        if (favorites.length === 0 && showFav) {
        dispatch(setShowFavorites(false));
        }
    }, [favorites, showFav, dispatch]);
    return(
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__logo}><Link href="/">Dogs</Link></div>
                <div className={styles.header__search}><SearchInput/></div>   
                <div className={styles.header__create} onClick={() => handleCreateBreed()}><IconAdd/></div>     
                <div className={`${styles.header__favorite} ${showFav ? styles.header__fav : ''} ${favorites.length === 0 ? styles.header__disabled : ''}`} title={ favorites.length === 0 ? "Нет избранного" : showFav
    ? "Показать все породы" : "Показать избранные"}  onClick={() => showFavorites()}><IconHeart/></div>    
            </div>
        </header>
    )
}

export default Header

