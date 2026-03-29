import {useState, useRef, useEffect, useCallback} from 'react';
import Timer from '../../components/Timer/Timer';
import styles from './Timers.module.css';
import {formatFullTime, getClosestTime, timeTillDate} from "../../helpers/DateFunctions.ts";
import ReleaseList from "../../components/ReleaseList/ReleaseList.tsx";
import Button from "../../components/Button/Button.tsx";

const Timers = () => {
    const [isReleasesListOpen, setIsReleasesListOpen] = useState(false);
    const [isReverseTime, setIsReverseTime] = useState(false);
    const timeRef = useRef<HTMLAnchorElement>(null);
    const cachedUpdateTime = useCallback((isReversedTime: boolean) => {
        const targetTime = getClosestTime(22, 0);
        const displayTime = isReversedTime ? timeTillDate(targetTime) : formatFullTime(new Date);
        if (timeRef.current)
            timeRef.current.textContent = displayTime;
    }, []);

    const handleToggleTime = () => {
        setIsReverseTime((prev) => !prev);
        cachedUpdateTime(!isReverseTime);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            cachedUpdateTime(isReverseTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [cachedUpdateTime, isReverseTime]);

    return (
        <>
            <div className={styles.content}>
                <header className={styles.header}>
                    <a className={`${styles.header_text} ${styles.title} ${styles.header_item}`}>
                        MetaTimer
                    </a>
                    <a
                        className={`${styles.header_text} ${styles.title} ${styles.header_item}`}
                        onClick={handleToggleTime}
                        style={{cursor: 'pointer'}}
                        ref={timeRef}
                    >
                    </a>
                    <Button
                        className={styles.header_item}
                        label={"?"}
                        onClick={() => setIsReleasesListOpen(!isReleasesListOpen)}
                    />
                </header>
                <div className={styles.timers_container}>
                    <Timer id={"timer_1"}/>
                    <Timer id={"timer_2"}/>
                    <Timer id={"timer_3"}/>
                    <Timer id={"timer_4"}/>
                </div>
            </div>
            <ReleaseList isOpen={isReleasesListOpen} onClose={() => setIsReleasesListOpen(false)}/>
        </>
    );
};

export default Timers;