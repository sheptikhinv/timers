class TimeManager {
    private startDate: Date;
    private endDate: Date;
    private initialTime: number;
    private endTime: number;
    private pauseTime: number | null = null;
    private remainingTimeOnPause: number | null = null;
    private intervalId: number | null = null;
    private isPaused: boolean = false;

    constructor(minutes: number) {
        this.startDate = new Date();
        this.initialTime = minutes * 60;
        this.endTime = Date.now() + this.initialTime * 1000;
        this.endDate = new Date(this.endTime);
    }

    static initFromJSON(json: TimeManager): TimeManager {
        const manager = new TimeManager(0);

        manager.startDate = new Date(json.startDate);
        manager.endDate = new Date(json.endDate);
        manager.initialTime = json.initialTime;
        manager.endTime = json.endTime;
        manager.pauseTime = json.pauseTime;
        manager.remainingTimeOnPause = json.remainingTimeOnPause;
        manager.isPaused = json.isPaused;

        return manager;
    }

    start(): void {
        if (this.intervalId !== null || this.pauseTime !== null) return;

        this.intervalId = setInterval(() => {
            if (Date.now() >= this.endTime) {
                this.stop();
            }
        }, 1000);
    }

    stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    pause(): void {
        console.log(this.intervalId)
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.pauseTime = Date.now();
            this.remainingTimeOnPause = Math.max(0, this.endTime - this.pauseTime);
            this.isPaused = true;
            console.log(this.isPaused)
        }
    }

    resume(): void {
        if (this.pauseTime !== null && this.remainingTimeOnPause !== null) {
            const pausedDuration = Date.now() - this.pauseTime;
            this.endTime += pausedDuration;
            this.pauseTime = null;
            this.remainingTimeOnPause = null;
            this.isPaused = false;
            this.start();
        }
    }

    addTime(minutes: number): void {
        this.endTime += minutes * 60 * 1000;
        this.endDate = new Date(this.endTime);
    }

    subtractTime(minutes: number): void {
        this.endTime = Math.max(Date.now(), this.endTime - minutes * 60 * 1000);
        this.endDate = new Date(this.endTime); // Обновляем endDate
    }

    getRemainingTime(): { minutes: number; seconds: number } {
        let remainingMs: number;

        if (this.pauseTime !== null && this.remainingTimeOnPause !== null) {
            remainingMs = this.remainingTimeOnPause;
        } else {
            remainingMs = Math.max(0, this.endTime - Date.now());
        }

        const remainingSeconds = Math.floor(remainingMs / 1000);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        return { minutes, seconds };
    }

    togglePause(): void {
        if (this.isPaused){
            console.log("resuming")
            this.resume()
            return
        }
        else{
            console.log("pause")
            this.pause()
        }
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }
}

export default TimeManager