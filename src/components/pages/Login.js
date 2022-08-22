import React, { useState } from 'react'
import IllustrationLogin from '../IllustrationLogin'
import Form from '../Form'
import classes from '../../styles/Login.module.css'
import TextInput from '../TextInput'
import Button from '../Button'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../LoadingSpinner'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState()

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError('Login Failed!')
            setLoading(false)
        }
    }
    return (
        <>
            <h1>Login to your account</h1>
            <div className="column">
                <IllustrationLogin />
                <Form className={classes.login} onSubmit={handleSubmit} >
                    {error && (<p className='error'>{error}</p>)}
                    <br />
                    <TextInput
                        required
                        type="text"
                        placeholder="Enter email"
                        icon="alternate_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextInput
                        required
                        type="password"
                        placeholder="Enter password"
                        icon="lock"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type='submit' disabled={loading}>{!loading ? <span>Submit now</span> : <LoadingSpinner />}</Button>
                    <div className="info">Don't have an account? <Link to='/signup' >Signup</Link> instead.</div>
                </Form>
            </div>
        </>
    )
}

export default Login