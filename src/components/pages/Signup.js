import React, { useState } from 'react'
import Illustration from '../Illustration'
import Form from '../Form'
import classes from '../../styles/Signup.module.css'
import TextInput from '../TextInput'
import CheckBox from '../CheckBox'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import LoadingSpinner from '../LoadingSpinner'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [agree, setAgree] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState()

  const navigate = useNavigate()
  const { signup } = useAuth();


  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password doesn't match!");
    }

    try {

      setError('')
      setLoading(true)
      await signup(email, password, username)
      navigate('/')

    } catch (error) {
      console.log(error);
      setLoading(false)
      setError('Signup Failed!')
    }

  }

  return (
    <>
      <h1>Create an account</h1>
      <div className='column'>
        <Illustration />
        <Form className={classes.signup} onSubmit={handleSubmit} >
          {error && (<p className='error'>{error}</p>)}
          <br />
          <TextInput
            required
            type="text"
            placeholder="Enter name"
            icon="person"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <TextInput
            required
            type="password"
            placeholder="Confirm password"
            icon="lock_clock"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <CheckBox
            required
            text="I agree to the Terms & Conditions"
            value={agree}
            onChange={(e) => setAgree(e.target.value)}
          />
          <Button type='submit' disabled={loading}>
            {!loading ? <span>Submit now</span> : <LoadingSpinner />}
          </Button>

        </Form>
      </div>
    </>
  )
}

export default Signup