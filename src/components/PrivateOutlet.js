import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

const PrivateOutlet = () => {
    const { currUser } = useAuth();
    return currUser ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateOutlet