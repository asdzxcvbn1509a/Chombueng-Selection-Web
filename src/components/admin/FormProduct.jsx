// rafce
import React, { useEffect, useState } from 'react'
import useEcomStore from '../../store/ecom-store'
import { createProduct, deleteProduct } from '../../api/product'
import { toast } from 'react-toastify'
import Uploadfile from './Uploadfile'
import { Link } from 'react-router-dom'
import { Pen, Plus, Delete, Save } from 'lucide-react';
import { confirmDelete } from '../../utils/sweetalert'
import numeral from 'numeral'
import moment from 'moment/min/moment-with-locales'
// import { changeStatusProduct } from '../../../../server/controllers/product'
import { changeStatusProduct } from '../../api/product'

const initialState = {

    title: "",
    description: "",
    price: "",
    categoryId: '',
    images: [],
    status: true

}

const FormProduct = () => {
    const token = useEcomStore((state) => state.token)
    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)
    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState({

        title: "",
        description: "",
        price: "",
        categoryId: '',
        images: []

    })

    useEffect(() => {
        // Code
        getCategory()
        getProduct(1000)
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            console.log(res)
            setForm(initialState)
            getProduct(token)
            toast.success(`เพิ่มสินค้า ${res.data.title} สำเร็จ`)
            getProduct(100)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        const result = await confirmDelete('ต้องการลบสินค้านี้?', 'หากลบแล้วจะไม่สามารถกู้คืนได้')
        if (result.isConfirmed) {
            try {
                // Code
                const res = await deleteProduct(token, id)
                console.log(res)
                toast.success('ลบสินค้าสำเร็จ')
                getProduct()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className='container mx-auto p-4 bg-white shadow-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='mb-5'>เพิ่มข้อมูลสินค้า</h1>
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
                {/* Upload File */}
                <Uploadfile key={form.images.length} form={form} setForm={setForm} />

                <button className='bg-green-500 p-2 rounded-xl mt-5 text-white flex hover:scale-110 hover:duration-200 gap-2 hover:bg-green-700'>
                    <Save />
                    เพิ่มสินค้า
                </button>
            </form>
            <hr className='mt-5' />
            <br />
            <table className="table-auto w-full">
                <thead className=''>
                    <tr>
                        <th scope="col" className='py-5'>ลำดับ</th>
                        <th scope='col'>รูปภาพ</th>
                        <th scope="col">ชื่อ</th>
                        <th scope="col">ลายละเอียด</th>
                        <th scope="col">ราคา</th>
                        <th scope="col">สถานะ</th>
                        <th scope='col'>จัดการ</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        products.map((item, index) => {
                            return (
                                <tr key={index} className='even:bg-white border-b odd:bg-gray-100'>
                                    <th>{index + 1}</th>
                                    <td className='py-2 flex justify-center'>
                                        {
                                            item.images.length > 0
                                                ? <img
                                                    className='w-24 h-24 rounder-lg shadow-md hover:scale-110'
                                                    src={item.images[0].url}
                                                />
                                                : <div className='w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-md'>
                                                    ไม่มีรูปภาพ
                                                </div>
                                        }
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{numeral(item.price).format('0,0')}</td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full ${
                                            !item.status 
                                            ? 'bg-red-100 text-red-600' 
                                            : 'bg-green-100 text-green-600'
                                        }`}>
                                            {!item.status ? 'สินค้าหมด' : 'มีสินค้า'}
                                        </span>
                                    </td>

                                    <td className='flex justify-center items-center gap-5'>
                                        <p className='hover:scale-110 hover:duration-200'>
                                            <Link
                                                to={'/admin/product/' + item.id}
                                                className='bg-yellow-500 rounded-md p-2 shadow-sm flex text-white gap-1 hover:bg-yellow-700 hover:duration-150'
                                            >
                                                <Pen />
                                                แก้ไข
                                            </Link>
                                        </p>
                                        <p
                                            className='hover:scale-110 hover:duration-200'
                                            onClick={(id) => handleDelete(item.id)}
                                        >
                                            <Link className=' bg-red-500 rounded-md p-2 shadow-sm flex text-white gap-2 hover:bg-red-700 hover:duration-150'>
                                                <Delete />
                                                ลบ
                                            </Link>
                                        </p>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FormProduct