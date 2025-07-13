export const formatFullTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

export const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
}

export const timeTillDate = (date: Date): string => {
    const now = new Date();
    let diff = date.getTime() - now.getTime();

    if (diff <= 0) return "00:00:00";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;

    const seconds = Math.floor(diff / 1000);

    const pad = (num: number) => String(num).padStart(2, '0');

    return `-${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const getClosestTime = (hour: number, minute: number): Date => {
    const now = new Date();
    const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0,
        0
    );

    if (target <= now) {
        // Добавляем 1 день, если время уже прошло
        target.setDate(target.getDate() + 1);
    }

    return target;
};