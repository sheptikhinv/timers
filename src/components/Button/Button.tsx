import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import styles from './Button.module.css'

type ButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    label: string
}

const Button = ({label, ...props}: ButtonProps) => {
    return (
        <button {...props} className={styles.button}>{label}</button>
    )
}

export default Button