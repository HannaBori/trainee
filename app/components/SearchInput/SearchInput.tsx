"use client"

import styles from './SearchInput.module.scss'
import { useDispatch } from "react-redux";
import IconSearch from "../SVG/IconSearch"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useRouter } from "next/navigation"



const SearchInput = () =>{
    const [text, setText] = useState("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    // const handleText = (e: React.FormEvent<HTMLFormElement> ) =>{
    //     e.preventDefault();
    //     dispatch(fetchSearchBooks({ text: text.replace(/\s/g,'-').toLowerCase(), page: "1" }));
    //     dispatch(addText(text.replace(/\s/g,'-').toLowerCase()))
    //     router.push("/components/SearchList")
        
    // }

    return (
        <form className={styles.searchInput}>
            <div className={styles.searchInput__icon}><IconSearch/></div>
            <input className={styles.searchInput__input} type="text" id="inputInSearch" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)}/>
        </form>
    )
}

export default SearchInput;
