// rafce
import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, readProduct, listProduct, updateProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    title: "",
    description: "",
    price: "",
    categoryId: "",
    images: [],
    status: true
}

const FormEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    // console.log(products)

    const [form, setForm] = useState(initialState)

    useEffect(() => {
        // Code
        getCategory()
        fetchProduct(token, id, form)

    }, [])

    const fetchProduct = async (token) => {
        
        try {
            // Code
            const res = await readProduct(token, id, form)
            console.log('res from backend')
            setForm(res.data)
        } catch (err) {
            console.log('Err fetch data',err)
        }
    }
    console.log(form)

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProduct(token, id, form)
            console.log(res)
            navigate('/admin/product')
            toast.success(`แก้ไขสินค้า ${res.data.title} สำเร็จ`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container mx-auto p-4'>
            <form onSubmit={handleSubmit}>
                <h1 className='mb-5'>แก้ไขข้อมูลสินค้า</h1>
                <input
                    className='border shadow-sm'
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder='ชื่อ'
                    name="title"
                />
                <input
                    className='border shadow-sm'
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder='ลายละเอียด'
                    name='description'
                />
                <input
                    type='number'
                    className='border shadow-sm text-center'
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder='ราคา'
                    name='price'
                />
                <select
                    className='border shadow-sm text-center'
                    name='categoryId'
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>เลือกหมวดหมู่</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr className='mt-5' />
                {/* Upload File */}
                <Uploadfile form={form} setForm={setForm} />

                <div className="flex items-center gap-2 mt-4">
                    <input
                        type="checkbox"
                        id="status"
                        name="status"
                        checked={form.status}
                        onChange={handleOnChange}
                        className="w-4 h-4"
                    />
                    <label htmlFor="status">
                        มีสินค้า
                    </label>
                </div>

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                    บันทึก
                </button>
            </form>
        </div>
    )
}

export default FormEditProduct