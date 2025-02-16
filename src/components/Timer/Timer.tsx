import { useEffect, useState } from 'react';
import TimeManager from '../../helpers/TimeManager';
import Button from '../Button/Button';
import styles from './Timer.module.css'

const Timer = () => {
    const [timeManager, recreateTimeManager] = useState(() => new TimeManager(0))
    const [remainingTime, setRemainingTime] = useState({ minutes: 0, seconds: 0 });
    const [startDate, setStartDate] = useState('00:00');
    const [endDate, setEndDate] = useState('00:00');

    const formatTime = (date: Date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      };

    useEffect(() => {
        timeManager.start()
        console.log("timer started")
        const interval = setInterval(() => {
            setRemainingTime(timeManager.getRemainingTime());
            let startString = formatTime(timeManager.getStartDate());
            let endString = formatTime(timeManager.getEndDate());
            if (startString === endString) {
                setStartDate('00:00');
                setEndDate('00:00');
            }
            else {
                setStartDate(startString);
                setEndDate(endString);
            }
        }, 100);
        
        return () => {
            clearInterval(interval);
            timeManager.stop();
        }
    }, [timeManager])

    const handlePause = () => timeManager.togglePause();
    const handleAdd = () => timeManager.addTime(1);
    const handleSubstract = () => timeManager.subtractTime(1);
    const handleRecreation = (minutes: number) => recreateTimeManager(new TimeManager(minutes))

    return (
        <div className={styles.timer_container}>
            <div className={styles.top_buttons}>
                <div className={styles.minute_buttons}>
                    <Button label='-1 мин' onClick={handleSubstract}/>
                    <Button label='+1 мин' onClick={handleAdd}/>
                </div>
                <Button label='X' onClick={() => handleRecreation(-1)}/>
            </div>
            <div className={styles.clock}>
                <a onClick={handlePause} className={styles.clock_text}>{remainingTime.minutes}:{remainingTime.seconds < 10 ? '0' : ''}{remainingTime.seconds}</a>
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