"use client"

import Link from 'next/link';
import styles from './CreateBreed.module.scss'

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBreed, fetchBreeds } from '@/app/redux/features/breedsSlice';
import IconBack from '../components/SVG/IconBack';
import { DogsType } from '../types/types';

const DogPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const breeds = useAppSelector(state=>state.breeds.breeds);
    const [name, setName] = useState("");
    const [origin, setOrigin] = useState("");
    const [bredFor, setBredFor] = useState("");
    const [temperament, setTemperament] = useState("");
    const [lifeSpan, setLifeSpan] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(breeds.some(breed => breed.name.toLowerCase() === name.toLowerCase())){
            alert("A breed with that name already exists!");
            return;
        }{
            dispatch(addBreed({name:name, origin:origin,bred_for:bredFor, temperament:temperament, life_span:lifeSpan, weight:{metric:weight}, height:{metric:height}, reference_image_id: "",}))
            router.push(`/breeds`);
        }
        
    };

  return (
    <div className={styles.create}>
          <div className={styles.create__container}>
            <div className={styles.create__back}><Link href="/"><IconBack/></Link></div>
            <form className={styles.create__wrapper} onSubmit={handleSubmit}>
                <div className={styles.create__info}>
                    <label htmlFor='breedName' className={styles.create__text} >Breed name: </label>
                    <input type="text" className={styles.create__input} name="name" id='breedName' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className={styles.create__info}>
                    <label htmlFor='breedOrigin' className={styles.create__text}>Country of origin: </label>
                    <input type="text" className={styles.create__input} name="origin" id='breedOrigin' placeholder='Country' value={origin} onChange={(e) => setOrigin(e.target.value)} required/>
                </div>
                <div className={styles.create__info}>
                    <label htmlFor='breedFor' className={styles.create__text}>Breed for: </label>
                    <input type="text" className={styles.create__input} name="breedFor" id='breedFor' placeholder='Breed for' value={bredFor}  onChange={(e) => setBredFor(e.target.value)} required/>
                </div>
                <div className={styles.create__info}>
                    <label htmlFor='breedTemperament' className={styles.create__text}>Temperament: </label>
                    <input type="text" className={styles.create__input} name="temperament" id='breedTemperament' placeholder='Temperament' value={temperament} onChange={(e) => setTemperament(e.target.value)} required/>
                </div>
                <div className={styles.create__info}>
                    <label htmlFor='breedLifespan' className={styles.create__text}>Lifespan: </label>
                    <input type="text" className={styles.create__input} name="lifespan" id='breedLifespan' placeholder='Lifespan' value={lifeSpan} onChange={(e) => setLifeSpan(e.target.value)} required/>
                </div>
                <div className={styles.create__info}>
                    <label htmlFor='breedWeight' className={styles.create__text}>Weight: </label>
                    <input type="text" className={styles.create__input} name="weight" id='breedWeight' placeholder='Weight' value={weight}  onChange={(e) => setWeight(e.target.value)} required/>
                </div>
                <div className={styles.create__info}>
                    <label htmlFor='breedHeight' className={styles.create__text}>Height: </label>
                    <input type="text" className={styles.create__input} name="height" id='breedHeight' placeholder='Height' value={height} onChange={(e) => setHeight(e.target.value)} required/>
                </div>
                <button type="submit" className={styles.create__button} >Create</button>
            </form>

          </div>
          
    </div>
  )
}

export default DogPage