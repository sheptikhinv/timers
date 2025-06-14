import {useEffect, useState} from 'react';
import Timer from '../../components/Timer/Timer';
import styles from './Timers.module.css';
import {formatFullTime} from "../../helpers/Formatters.ts";

const Timers = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 500);

        return () => clearInterval(intervalId);
    }, [])


    return (
        <div className={styles.content}>
            <header className={styles.header}>
                <a className={`${styles.header_text} ${styles.title}`}>MetaTimer</a>
                <a className={`${styles.header_text} ${styles.title}`}>{formatFullTime(time)}</a>
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