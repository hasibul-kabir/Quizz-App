import React from 'react'
import classes from '../styles/Nav.module.css'
import logo from '../assets/images/logo-bg.png'
import Account from './Account'
import { Link } from 'react-router-dom'
const Nav = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to='/' className={classes.brand}>
                        <img src={logo} alt="Logo" />
                        <h3>Quiz App</h3>
                    </Link>
                </li>
            </ul>
            <Account />
        </nav>
    )
}

export default Nav