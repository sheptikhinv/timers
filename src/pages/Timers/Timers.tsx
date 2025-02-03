import { useEffect, useState } from 'react';
import Timer from '../../components/Timer/Timer';
import styles from './Timers.module.css';

const Timers = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 500);

        return () => clearInterval(intervalId);
    }, [])

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      };

    return (
        <div className={styles.content}>
            <header className={styles.header}>
                <a className={`${styles.header_text} ${styles.title}`}>MetaTimer</a>
                <a className={`${styles.header_text} ${styles.title}`}>{formatTime(time)}</a>
            </header>
            <div className={styles.timers_container}>
                <Timer/>
                <Timer/>
                <Timer/>
                <Timer/>
            </div>
        </div>
    )
}

export default Timers;