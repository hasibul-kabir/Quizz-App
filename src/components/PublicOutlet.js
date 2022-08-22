import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

const PublicOutlet = () => {
    const { currUser } = useAuth()
    return !currUser ? <Outlet /> : <Navigate to='/' />
}

export default PublicOutlet