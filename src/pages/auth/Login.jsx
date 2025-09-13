// rafce
import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import useEcomStore from '../../store/ecom-store'
import { NavLink, useNavigate } from 'react-router-dom'
import liff from '@line/liff'

const Login = () => {
  // Javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)

  useEffect(() => {
    liff.init({ liffId: '2008047825-Ka9M3qpd' })
  }, [])

  const handleLoginLine = () => {
    try {
      // code
      liff.login()
    }
    catch (err) {
      console.log(err)
    }
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
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
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirect(role)
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role == 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  return (

    <div className='bg-gradient-to-b from-[#F6C2CF] to-[#F9F6F3] flex items-center justify-center md:h-[720px] h-[890px]'>
      <form
        onSubmit={handleSubmit}
        className='bg-white md:px-11 px-6 pt-20 pb-24 rounded-lg max-w-[420px] md:max-w-[480px] md:h-[75%] h-[60%] scale-90 md:scale-100'>
        <p className='text-center font-kanit md:text-3xl text-2xl font-semibold'>
          เข้าสู่ระบบ
        </p>
        <input
          onChange={handleOnChange}
          name='email'
          type='text'
          placeholder='ชื่อผู้ใช้งาน'
          className='border-2 md:text-2xl text-lg py-2 px-3 pr-28 w-full mt-16 rounded-xl border-[#F499A0] font-kanit font-light' />
        <br />
        <input
          onChange={handleOnChange}
          name='password'
          type='password'
          placeholder='รหัสผ่าน'
          className='border-2 md:text-2xl text-lg py-2 px-3 pr-28 w-full mt-8 rounded-xl border-[#F499A0] font-kanit font-light' />
        <br />
        <div className='mt-6'>
          <NavLink className='md:text-xl text-lg font-kanit font-semibold text-[#FF0004] pl-4'>
            ลืมรหัสผ่าน?
          </NavLink>
        </div>
        <br />
        <button className='md:text-2xl text-xl font-kanit bg-[#F499A0] text-white block mx-auto py-2 w-full font-light rounded-xl'>
          เข้าสู่ระบบ
        </button>
        {/* <button className='md:text-2xl text-xl font-kanit bg-[#06c755] text-white block mx-auto py-2 w-full font-light rounded-xl mt-6'
          onClick={handleLoginLine}>
          เข้าสู่ระบบด้วยไลน์
        </button> */}
        <div className='mt-12 flex justify-center gap-2'>
          <p className='md:text-xl text-lg font-light font-kanit'>
            ยังไม่มีบัญชี
          </p>
          <NavLink
            to={'/register'}
            className='md:text-xl text-lg font-semibold text-[#FF0004] font-kanit'>
            สมัครบัญชี
          </NavLink>
        </div>
      </form>
    </div>


    // <div>
    //   login
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

    //     <button className='bg-blue-500 rounded-md'>
    //       Login
    //     </button>

    //   </form>
    // </div>
  )
}

export default Login