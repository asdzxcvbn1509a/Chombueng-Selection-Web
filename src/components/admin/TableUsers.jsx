//rafce
import React, { useState, useEffect } from 'react'
import { changeRoleUser, getListAllUser } from '../../api/admin'
import useEcomStore from '../../store/ecom-store'
import { changeStatusUser } from '../../api/admin'
import { ToastContainer, toast } from 'react-toastify'

const TableUsers = () => {
  const token = useEcomStore((state) => state.token)
  const [users, setUsers] = useState([])

  useEffect(() => {
    handleGetUsers(token)
  }, [])

  const handleGetUsers = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus
    }
    changeStatusUser(token, value)
      .then((res) => {
        handleGetUsers(token)
        toast.success(`เปลี่ยนสถานะของผู้ใช้เป็น ${value.enabled ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`)
      })
      .catch(err => console.log(err))
  }

  const handleChangeRoleUser = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole
    }
    changeRoleUser(token, value)
      .then((res) => {
        handleChangeRoleUser(token)
        handleGetUsers(token)
        toast.success('เปลี่ยนสิทธ์สำเร็จ')
      })
      .catch(err => console.log(err))
  }

  // ⬇️ ย้าย return เข้ามาในฟังก์ชันตรงนี้
  return (
    <div className='container mx-auto p-4 bg-white shadow-md'>
      <table className='w-full'>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>Username</th>
            <th>สิทธ์</th>
            <th>สถานะ</th>
            {/* <th>จัดการ</th> */}
          </tr>
        </thead>
        <tbody className='text-center'>
          {
            users?.map((item, index) =>
              <tr key={index} className='even:bg-white border-b odd:bg-gray-100'>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>
                  <select
                    value={item.role}
                    onChange={(e) => handleChangeRoleUser(item.id, e.target.value)}
                    className='px-2 py-1'>
                    <option>admin</option>
                    <option>user</option>
                  </select>
                </td>
                {/* <td>{item.enabled ? 'Active' : 'Inactive'}</td> */}
                <td>
                  <button
                    onClick={() => handleChangeUserStatus(item.id, item.enabled)}
                    className='bg-yellow-500 p-2 text-white rounded-md m-4 hover:bg-yellow-700 hover:scale-110 hover:duration-150'
                  >
                    {item.enabled ? "เปิดใช้งาน" : "ปิดการใช้งาน"}
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableUsers