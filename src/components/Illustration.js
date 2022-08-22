import React from 'react'
import classes from '../styles/Illustration.module.css'
import illustrationImg from '../assets/images/signup.svg'
const Illustration = () => {
    return (
        <div className={classes.illustration}>
            <img src={illustrationImg} alt="Signup" />
        </div>
    )
}

export default Illustration