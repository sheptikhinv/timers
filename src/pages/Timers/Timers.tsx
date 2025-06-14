import {useEffect, useState} from 'react';
import Timer from '../../components/Timer/Timer';
import styles from './Timers.module.css';
import {formatFullTime} from "../../helpers/DateFunctions.ts";
import ReleaseList from "../../components/ReleaseList/ReleaseList.tsx";
import Button from "../../components/Button/Button.tsx";

const Timers = () => {
    const [time, setTime] = useState(new Date());
    const [isReleasesListOpen, setIsReleasesListOpen] = useState(false);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 500);

        return () => clearInterval(intervalId);
    }, [])


    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <a className={`${styles.header_text} ${styles.title} ${styles.header_item}`}>MetaTimer</a>
                    <div className={styles.mobile_row}>
                        <a className={`${styles.header_text} ${styles.title} ${styles.header_item}`}>{formatFullTime(time)}</a>
                        <Button className={styles.header_item} label={"?"} onClick={() => setIsReleasesListOpen(!isReleasesListOpen)}/>
                    </div>
                </header>
                <div className={styles.timers_container}>
                    <Timer id={"timer_1"}/>
                    <Timer id={"timer_2"}/>
                    <Timer id={"timer_3"}/>
                    <Timer id={"timer_4"}/>
                </div>
            </div>
            <ReleaseList isOpen={isReleasesListOpen} onClose={() => setIsReleasesListOpen(false)} />
        </>
    )
}

export default Timers;
