import React from 'react'
import classes from '../styles/Illustration.module.css'
import loginIllustration from '../assets/images/login.svg'

const IllustrationLogin = () => {
    return (
        <div className={classes.illustration}>
            <img src={loginIllustration} alt="Login" />
        </div>
    )
}

export default IllustrationLogin