import {useEffect, useRef, useState} from 'react';
import TimeManager from '../../helpers/TimeManager';
import Button from '../Button/Button';
import styles from './Timer.module.css'
import {formatTime, isToday} from '../../helpers/DateFunctions.ts';
import LocalStorageManager from "../../helpers/LocalStorageManager.ts";

interface TimerProps {
    id: string
}

type TimerViewState = {
    remainingTime: { minutes: number; seconds: number };
    startDate: string;
    endDate: string;
};

const Timer = (props: TimerProps) => {
    const storageRef = useRef(new LocalStorageManager<TimeManager>());

    const [timeManager, setTimeManager] = useState(() => {
        const storedRaw = storageRef.current.getItem(props.id);

        if (storedRaw === null) {
            return new TimeManager(0);
        }

        const stored = TimeManager.initFromJSON(storedRaw);

        if (!isToday(stored.getStartDate())) {
            storageRef.current.removeItem(props.id);
            return new TimeManager(0);
        }

        return stored;

    });

    const [view, setView] = useState<TimerViewState>({
        remainingTime: {minutes: 0, seconds: 0},
        startDate: '00:00',
        endDate: '00:00',
    });

    useEffect(() => {
        timeManager.start()

        const interval = setInterval(() => {
            const remainingTime = timeManager.getRemainingTime();

            const startDateString = formatTime(timeManager.getStartDate());
            const endDateString = formatTime(timeManager.getEndDate());
            const same = startDateString === endDateString;

            const next: TimerViewState = {
                remainingTime,
                startDate: same ? '00:00' : startDateString,
                endDate: same ? '00:00' : endDateString,
            };

            setView((prev) => {
                if (
                    prev.remainingTime.minutes === next.remainingTime.minutes &&
                    prev.remainingTime.seconds === next.remainingTime.seconds &&
                    prev.startDate === next.startDate &&
                    prev.endDate === next.endDate
                ) {
                    return prev;
                }
                return next;
            })
        }, 250);

        return () => {
            clearInterval(interval);
            timeManager.stop();
        }
    }, [timeManager])

    const handleUpdate = (updater: (manager: TimeManager) => void) => {
        updater(timeManager);
        storageRef.current.setItem(props.id, timeManager);
    }

    const handlePause = () => handleUpdate(m => m.togglePause());
    const handleAdd = () => handleUpdate(m => m.addTime(1));
    const handleSubstraction = () => handleUpdate(m => m.subtractTime(1));

    const handleClear = () => {
        storageRef.current.removeItem(props.id);
        setTimeManager(new TimeManager(0));
    }
    const handleRecreation = (minutes: number) => {
        const newTimeManager = new TimeManager(minutes)
        setTimeManager(newTimeManager);
        storageRef.current.setItem(props.id, newTimeManager);
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
                   className={styles.clock_text}>{view.remainingTime.minutes}:{view.remainingTime.seconds < 10 ? '0' : ''}{view.remainingTime.seconds}</a>
            </div>
            <div className={styles.dates_container}>
                <div className={styles.dates_item}>
                    {view.startDate}
                </div>
                <div className={styles.dates_item}>
                    {view.endDate}
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