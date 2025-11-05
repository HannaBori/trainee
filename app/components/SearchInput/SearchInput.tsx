'use client'

import styles from './SearchInput.module.scss'
import IconSearch from "../SVG/IconSearch"
import { useState } from "react";



const SearchInput = () =>{
    const [text, setText] = useState("");


    return (
        <form className={styles.searchInput}>
            <div className={styles.searchInput__icon}><IconSearch/></div>
            <input className={styles.searchInput__input} type="text" id="inputInSearch" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)}/>
        </form>
    )
}

export default SearchInput;
