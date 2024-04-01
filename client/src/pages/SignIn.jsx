import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { signInStart,signInFaiure,signInSucess } from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux'
export default function SignIn() {
  const [formData, setFormData] = useState({})
const  {loading,error:errorMessage}=useSelector(state=>state.user)
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFaiure('please fill out all fields.'))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("this is data from backend",data)
      if (data.success == false) {
        dispatch(signInFaiure(signInFaiure('please fill all the fields')))
      }
      dispatch(signInSucess(data))
      if (res.ok) {
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFaiure(data.message))
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col  md:flex-row  md:items-center gap-5'>
        {/* left side */}
        <div className='flex-1'>
          <Link to='/' className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white" >Tahseen's </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a Web Community for the developer to share the ideas abd express thir thought's ,here you can share and gain knowledge. you can sign in with email and password or gmail
          </p>

        </div>
        {/* right side side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
            <div>
              <Label value='Your Email' />
              <TextInput
                type="email"
                placeholder='example@example.com'
                id='email'
                onChange={handleChange} />
            </div>
            <div>
              <Label value='Your  Password' />
              <TextInput
                type="password"
                placeholder='*********'
                id='password'
                onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' disabled={loading}
              type='submit'>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>

              ) : 'Sign In'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
