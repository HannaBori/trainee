
import IconGit from '../SVG/IconGit'
import styles from './Footer.module.scss'

const Footer = () =>{
    return(
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <a href={"https://github.com/HannaBori/trainee"} className={styles.footer__git}><IconGit/></a>
            </div>
        </footer>
    )
}

export default Footer