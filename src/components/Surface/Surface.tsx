import {ReactNode, useEffect} from "react";
import styles from './Surface.module.css'

interface SurfaceProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Surface = ({isOpen, onClose, children}: SurfaceProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;


    return (
        <div className={styles.surfaceOverlay} onClick={onClose}>
            <div className={styles.surfaceFrame} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <div className={styles.surfaceContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};


export default Surface;