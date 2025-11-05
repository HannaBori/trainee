'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import IconLeft from '../SVG/IconLeft'
import IconRight from '../SVG/IconRight'
import styles from './Pagination.module.scss'
import { useEffect } from 'react';

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: SimplePaginationProps) =>{
    
    const getPagesToShow = () => {
        const pages: (number | string)[] = [1];
        
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        
        if (start > 2) pages.push('...');
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < totalPages - 1) pages.push('...');
        
        
        if (totalPages > 1) pages.push(totalPages);
        
        return pages;
    };

    return(
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={styles.pagination__btn}
            >
                <IconLeft/>
            </button>
            
                {getPagesToShow().map((page, index) => (
                            typeof page === 'number' ? (
                            <button
                                key={page}
                                onClick={() => onPageChange(page-1)}
                                className={`${styles.pagination__text} ${
                                currentPage === page-1 ? styles.pagination__select : ''
                                }`}
                            >
                                {page}
                            </button>
                            ) : (
                            <span  className={styles.pagination__ellipsis}>
                                {page}
                            </span>
                            )
                ))}
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage + 1 === totalPages}
                className={styles.pagination__btn}
            >
                <IconRight/>
            </button>
    </div>
    )
}

export default Pagination