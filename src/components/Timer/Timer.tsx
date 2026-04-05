import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import TimeManager from '../../helpers/TimeManager';
import Button from '../Button/Button';
import styles from './Timer.module.css'
import {formatRemainingTime, formatTime, isToday} from '../../helpers/DateFunctions.ts';
import LocalStorageManager from "../../helpers/LocalStorageManager.ts";

interface TimerProps {
    id: string
}

const Timer = (props: TimerProps) => {
    const localStorageManager = useMemo(() => new LocalStorageManager<TimeManager>(), []);
    const [timeManager, recreateTimeManager] = useState(() => {
        const storedRaw = localStorageManager.getItem(props.id);
        let stored: TimeManager | null = null;

        if (storedRaw === null) {
            return new TimeManager(0);
        }

        stored = TimeManager.initFromJSON(storedRaw);

        if (!isToday(stored.getStartDate())) {
            localStorageManager.removeItem(props.id);
            return new TimeManager(0);
        }

        return TimeManager.initFromJSON(storedRaw);
    });
    const remainingTimeRef = useRef<HTMLAnchorElement>(null);

    const updateRemainingTime = useCallback(() => {
        const remainingTime = timeManager.getRemainingTime();
        if (remainingTimeRef.current) {
            remainingTimeRef.current.textContent = formatRemainingTime(remainingTime);
        }
    }, [timeManager]);

    const isStartEqualEnd = timeManager.getStartDate().getTime() === timeManager.getEndDate().getTime();
    const startDate = isStartEqualEnd ? '00:00' : formatTime(timeManager.getStartDate());
    const endDate = isStartEqualEnd ? '00:00' : formatTime(timeManager.getEndDate());

    useEffect(() => {
        timeManager.start();
        updateRemainingTime();
        return () => {
            timeManager.stop();
        };
    }, [timeManager, updateRemainingTime]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime();
        }, 200);

        return () => clearInterval(intervalId);
    }, [timeManager, updateRemainingTime]);

    const handleUpdate = (updater: (manager: TimeManager) => void) => {
        updater(timeManager);

        const updatedTimeManager = TimeManager.initFromJSON(timeManager);
        recreateTimeManager(updatedTimeManager);
        localStorageManager.setItem(props.id, timeManager);
    }

    const handlePause = () => handleUpdate(m => m.togglePause());
    const handleAdd = () => handleUpdate(m => m.addTime(1));
    const handleSubstraction = () => handleUpdate(m => m.subtractTime(1));
    const handleClear = () => {
        localStorageManager.removeItem(props.id);
        recreateTimeManager(new TimeManager(0));
    }
    const handleRecreation = (minutes: number) => {
        const newTimeManager = new TimeManager(minutes)
        recreateTimeManager(newTimeManager);
        localStorageManager.setItem(props.id, newTimeManager);
    }

    return (
        <div className={styles.timer_container}>
            <div className={styles.top_buttons}>
                <div className={styles.minute_buttons}>
                    <Button label='-1 мин' onClick={handleSubstraction}/>
                    <Button label='+1 мин' onClick={handleAdd}/>
                </div>
                <Button label='X' onClick={() => handleClear()}/>
            </div>
            <div className={styles.clock}>
                <a onClick={handlePause}
                   ref={remainingTimeRef}
                   className={styles.clock_text}/>
            </div>
            <div className={styles.dates_container}>
                <div className={styles.dates_item}>
                    {startDate}
                </div>
                <div className={styles.dates_item}>
                    {endDate}
                </div>
            </div>
            <div className={styles.presets_buttons}>
                <Button label='15' onClick={() => handleRecreation(15)}/>
                <Button label='30' onClick={() => handleRecreation(30)}/>
                <Button label='60' onClick={() => handleRecreation(60)}/>
                <Button label='90' onClick={() => handleRecreation(90)}/>
                <Button label='120' onClick={() => handleRecreation(120)}/>
            </div>
        </div>
    )
}

export default Timer;