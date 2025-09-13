// rafce
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

const Register = () => {
  // Javascript

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleOnChange = (e) => {
    // Code
    console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password in not match')
    }
    console.log(form)
    // Send to Back
    try {
      // Code
      const res = await axios.post('https://chombueng-selection.vercel.app/api/register', form)
      console.log(res)
      toast.success(res.data)
      navigate('/login')


    } catch (err) {
      //err
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  return (

    <div className='bg-gradient-to-b from-[#F6C2CF] to-[#F9F6F3] md:h-[720px] h-[890px] flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white md:px-11 px-6 pt-14 pb-10 rounded-lg max-w-[420px] md:max-w-[480px] md:h-[75%] h-[60%] scale-90 md:scale-100'>
        <p className='text-center font-kanit md:text-3xl text-2xl font-semibold'>
          สมัครสมาชิก
        </p>
        <input
          name='email'
          onChange={handleOnChange}
          type='text'
          placeholder='ชื่อผู้ใช้งาน'
          className='border-2 md:text-2xl text-lg py-2 px-3 pr-28 w-full mt-16 rounded-xl border-[#F499A0] font-kanit font-light'
        />
        <br />
        <input
          name='password'
          onChange={handleOnChange}
          type='text'
          placeholder='รหัสผ่าน'
          className='border-2 md:text-2xl text-lg py-2 px-3 pr-28 w-full mt-8 rounded-xl border-[#F499A0] font-kanit font-light'
        />
        <br />
        <input
          name='confirmPassword'
          onChange={handleOnChange}
          type='text'
          placeholder='ยืนยันรหัสผ่าน'
          className='border-2 md:text-2xl text-lg py-2 px-3 pr-28 w-full mt-8 rounded-xl border-[#F499A0] font-kanit font-light'
        />
        <br />
        <button
          className='md:text-2xl text-xl font-kanit bg-[#F499A0] text-white block mx-auto py-2 w-full font-light rounded-xl mt-10'
        >
          สมัครสมาชิก
        </button>
        <div className='mt-6 mb-12 flex justify-center gap-2'>
          <p className='md:text-xl text-lg font-kanit font-light'>
            มีบัญชีแล้ว
          </p>
          <NavLink
            to={'/login'}
            className='md:text-xl text-lg font-semibold text-[#FF0004] font-kanit'
          >
            เข้าสู่ระบบ
          </NavLink>
        </div>
      </form>
    </div>

    // <div>
    //   Register
    //   <form onSubmit={handleSubmit}>

    //     Username
    //     <input className='border'
    //       onChange={handleOnChange}
    //       name='email'
    //       type='text'
    //     />

    //     Password
    //     <input className='border'
    //       onChange={handleOnChange}
    //       name='password'
    //       type='password'
    //     />

    //     Confirm Password
    //     <input className='border'
    //       onChange={handleOnChange}
    //       name='confirmPassword'
    //       type='password'
    //     />

    //     <button className='bg-blue-500 rounded-md'>
    //       Register
    //     </button>

    //   </form>
    // </div>
  )
}

export default Register