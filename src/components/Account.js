import React from 'react'
import classes from '../styles/Account.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

const Account = () => {
    const { logout, currUser } = useAuth();
    // const navigate = useNavigate()

    // function handleLogout() {
    //     return logout()
    //         .then(() => {
    //             navigate('/login')
    //         })

    // }

    return (
        <div className={classes.account}>
            <span className="material-icons-outlined" title="Account">
                account_circle
            </span>
            {
                currUser ?
                    <>
                        <span>{currUser.displayName}</span>
                        <span className="material-icons-outlined" title="Logout" onClick={logout} > logout </span>
                    </>
                    :
                    <>
                        <Link to='signup'>Signup</Link>
                        <Link to='login'>Login</Link>
                    </>
            }


        </div>
    )
}

export default Account