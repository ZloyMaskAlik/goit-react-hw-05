import reactLogo from '../../assets/react.svg'
import goitLogo from '../../assets/goit.svg'
import earth from '../../assets/earth.svg'
import styles from './Header.module.css'


export default function Header() {
    return (
        <div className={styles.header}>
        
            <a className={styles.link} href="./index.html" aria-label="Site logo">
                <img src={goitLogo} className={styles.goit}  alt="Goit logo" />
            </a>
            <div className={styles.taskList}>
            <div className={styles.icon}> 
                <img src={reactLogo} className={styles.react} alt="React logo" />
                <img src={earth} className={styles.earth} alt="Earth logo" />
            </div>
            <p className={styles.item}>HOMEWORK <span>REACT</span> TASK 5</p>
            </div>
        </div>
    
    );
};
  
