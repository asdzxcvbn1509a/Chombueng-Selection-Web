//rafce
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginLine } from '../../api/auth'
import { useDispatch } from 'react-redux'
// import { login } from '../../store/slices/userSlice'
import { login } from '../../store/slices/userSlice'
import liff from '@line/liff'

const Line = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const initLine = async () => {
      try {
        await liff.init({ liffId: '2008047825-Ka9M3qpd' })
        if (liff.isLoggedIn()) {
          handleLogin()
        } else {
          liff.login()
        }
      } catch (err) {
        console.error('LIFF Init Error:', err)
        navigate('/login')
      }
    }

    // โหลด LIFF SDK
    const loadLiffSDK = () => {
      const script = document.createElement('script')
      script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js'
      script.onload = () => initLine()
      document.head.appendChild(script)
    }

    loadLiffSDK()
  }, [])

  const handleLogin = async () => {
    try {
        const profile = await liff.getProfile()
        console.log('ข้อมูล Line Profile:', profile)

        const response = await loginLine({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            email: liff.getDecodedIDToken()?.email
        })

        console.log('ผลตอบรับจากเซิร์ฟเวอร์:', response)

        if (response?.token) {
            // เก็บข้อมูลใน Redux
            dispatch(login({
                token: response.token,
                user: response.payload
            }))
            
            // เก็บ token
            localStorage.setItem('token', response.token)

            // เด้งไปหน้าที่เหมาะสม
            if (response.payload.role === 'admin') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        }
    } catch (err) {
        console.error('เกิดข้อผิดพลาด:', err)
        alert('ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง')
        navigate('/login')
    }
}

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">กำลังเข้าสู่ระบบด้วย LINE...</p>
      </div>
    </div>
  )
}

export default Line