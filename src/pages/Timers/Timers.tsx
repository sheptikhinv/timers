import {useEffect, useState} from 'react';
import Timer from '../../components/Timer/Timer';
import styles from './Timers.module.css';
import {formatFullTime} from "../../helpers/DateFunctions.ts";

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
                <Timer id={"timer_1"}/>
                <Timer id={"timer_2"}/>
                <Timer id={"timer_3"}/>
                <Timer id={"timer_4"}/>
            </div>
        </div>
    )
}

export default Timers;