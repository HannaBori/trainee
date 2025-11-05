'use client'

import Link from 'next/link';
import styles from './DogPage.module.scss'
import IconBack from '../../components/SVG/IconBack';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useEffect } from 'react';
import { fetchBreeds } from '@/app/redux/features/breedsSlice';




const DogPage = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(state=>state.breeds.breeds);
  
  const breed = breeds.find(item => item.id == Number(id));
    
 console.log('id в клиентском компоненте:', id);
 useEffect(() => {
    if (breeds.length === 0) {
      dispatch(fetchBreeds());
    }
}, [breeds.length, dispatch]);

    if (!breed) {
    return (
      <div className={styles.page}>
        <div className={styles.page__container}>
          <div className={styles.page__back}>
            <Link href="/breeds"><IconBack /></Link>
          </div>
          <div className={styles.page__error}>
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
          <div className={styles.page__container}>
              <div className={styles.page__back}><Link href="/"><IconBack/></Link></div>
              <div className={styles.page__wrapper}>
                <div className={styles.page__wrapperImage}>
                    <img src={breed.reference_image_id ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg` :`https://mvd.gov.by/assets/img/nophoto.jpg` } alt={breed.name} className={styles.page__img} />
                </div>
                <div className={styles.page__info}>
                  <p className={styles.page__name}>{breed.name}</p>
                  <div className={styles.page__data}>
                      <p className={`${styles.page__parameter} ${styles.page__text}`}>Weight</p>
                      <p className={`${styles.page__answer} ${styles.page__text}`}>{breed.weight?.metric ? `${breed.weight.metric} kg` : "No weight info"} </p>
                  </div>
                    <div className={styles.page__data}>
                      <p className={`${styles.page__parameter} ${styles.page__text}`}>Heiht</p>
                      <p className={`${styles.page__answer} ${styles.page__text}`}>{breed.height?.metric ? `${breed.height.metric} cm` : "No height info"} </p>
                  </div>
                    <div className={styles.page__data}>
                      <p className={`${styles.page__parameter} ${styles.page__text}`}>Lifespan</p>
                      <p className={`${styles.page__answer} ${styles.page__text}`}>{breed.life_span ? `${breed.life_span}` : "No lifespan info"} </p>
                  </div>
                  <div className={styles.page__data}>
                      <p className={`${styles.page__parameter} ${styles.page__text}`}>Country of origin</p>
                      <p className={`${styles.page__answer} ${styles.page__text}`}>{breed.origin ? `${breed.origin}` : "No info"} </p>
                  </div>
                  <div className={styles.page__data}>
                      <p className={`${styles.page__parameter} ${styles.page__text}`}>Bred for</p>
                      <p className={`${styles.page__answer} ${styles.page__text}`}>{breed.bred_for ? `${breed.bred_for}` : "No info"} </p>
                  </div>
                  <div className={styles.page__data}>
                      <p className={`${styles.page__parameter} ${styles.page__text}`}>Temperament</p>
                      <p className={`${styles.page__answer} ${styles.page__text}`}>{breed.temperament ? `${breed.temperament}` : "No temperament info"} </p>
                  </div>
                </div>
            </div>

          </div>
          
    </div>
  )
}

export default DogPage