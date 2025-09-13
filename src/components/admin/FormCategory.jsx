//rafce
import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Trash, Plus, Save } from 'lucide-react';
import { confirmDelete } from '../../utils/sweetalert';

const FormCategory = () => {
    // Javascript

    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [getCategory, token])

    const handleSubmit = async (e) => {
        // Code
        e.preventDefault()
        if (!name) {
            return toast.warning('โปรดใส่ข้อมูล')
        }
        try {
            const res = await createCategory(token, { name })
            console.log(res.data.name)
            toast.success(`เพิ่มหมวดหมู่ ${res.data.name} สำเร็จ`)
            getCategory(token)
            setName('')
        } catch (err) {
            console.log(err)
        }
    }

    const handleRemove = async (id) => {
        // Code
        console.log(id)
        const result = await confirmDelete('ต้องการลบหมวดหมู่นี้?', 'หากลบแล้วจะไม่สามารถกู้คืนได้')
        if (result.isConfirmed) {
            try {
                // ลบสินค้า
                const res = await removeCategory(token, id)
                console.log(res)
                toast.success(`ลบหมวดหมู่ ${res.data.name} สำเร็จ`)
                getCategory(token)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <h1>การจัดการหมวดหมู่</h1>
            <form className='my-4' onSubmit={handleSubmit}>
                <input
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border shadow-sm mr-5'
                    type='text'
                />
                <button className='bg-green-500 rounded-xl p-2 text-white flex mt-5 gap-2 hover:scale-110 hover:duration-200 hover:bg-green-700'>
                    <Save />
                    เพิ่มหมวดหมู่
                </button>

            </form>
            <hr />
            <ul className='list-none'>
                {
                    categories.map((item, index) =>
                        <li
                            className='flex justify-between my-4'
                            key={index}>

                            <span>
                                {item.name}
                            </span>

                            <button
                                className='flex bg-red-500 rounded-md p-2 text-white gap-2 hover:scale-110 hover:duration-200 hover:bg-red-700'
                                onClick={() => handleRemove(item.id)}>
                                <Trash />
                                ลบ
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default FormCategory