import Timer from '../../components/Timer/Timer';
import styles from './Timers.module.css';

const Timers = () => {
    return (
        <div className={styles.content}>
            <header>
                <a className={`${styles.header_text} ${styles.title}`}>ГринТаймер</a>
            </header>
            <div className={styles.timers_container}>
                <Timer/>
                <Timer/>
                <Timer/>
                <Timer/>
            </div>
            <div className={styles.notes_container}>
                <a className={`${styles.title} ${styles.notes_text}`}>Заметки</a>
                <textarea></textarea>
            </div>
            <footer>
                <a className={`${styles.title} ${styles.notes_text}`}>Респекты</a>
                <a>Лиза +вайбик за макет</a>
                <a>Слава сигма за всё остальное</a>
                <a>Игорь красава с нами рядом сидел</a>
            </footer>
        </div>
    )
}

export default Timers;