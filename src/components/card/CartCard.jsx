//rafce
import React from 'react'
import { Trash, Plus, Minus } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { get } from 'lodash';
import { Link } from 'react-router-dom'

const CartCard = () => {
    // javascript
    const carts = useEcomStore((state) => state.carts)
    const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
    const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
    const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>ตะกร้าสินค้า</h1>
            {/* Border */}
            <div className='border'>
                {/* Card */}
                {carts.map((item, index) =>

                    <div key={index} className='bg-white p-2 rounded-md shadow-md mb-4'>
                        {/* Row 1 */}
                        <div className='flex justify-between mb-2 mr-2'>
                            {/* Left */}
                            <div className='flex gap-2 items-center'>

                                {
                                    item.images && item.images.length > 0
                                        ? <img
                                            className='w-16 h16 rounded-md shadow-md'
                                            src={item.images[0].url} />
                                        : <div
                                            className='w-16 h-16 bg-gray-200 rounded-md flex text-center items-center'
                                        >
                                            ไม่มีรูปภาพ
                                        </div>
                                }

                                <div>
                                    <p className='font-bold'>{item.title}</p>
                                    <p className='text-sm'>{item.description}</p>
                                </div>
                            </div>
                            {/* Right */}
                            <button
                                onClick={() => actionRemoveProduct(item.id)}
                                className='text-red-500'>
                                <Trash />
                            </button>
                        </div>
                        {/* Row 2 */}
                        <div className='flex justify-between mt-4 mr-2'>
                            {/* Left */}
                            <div className='border rounded-sm'>
                                <button
                                    onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                    className='px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300'>
                                    <Minus size={16} />
                                </button>
                                <span className='px-2 py-1'>{item.count}</span>
                                <button
                                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                    className='px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300'>
                                    <Plus size={16} />
                                </button>
                            </div>
                            {/* Right */}
                            <div className='font-bold text-blue-500'>
                                {item.price * item.count}
                            </div>
                        </div>
                    </div>
                )
                }
                {/* Total */}
                <div className='flex justify-between px-2 py-2 mx-2'>
                    <span>รวม</span>
                    <span>{getTotalPrice()} บาท</span>
                </div>
                {/* Button */}
                <Link to={'/cart'}>
                    <button
                        className='mt-4 bg-green-500 w-full text-white py-2 rounded-md shadow-md hover:bg-green-700'>
                        สั่งซื้อ
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CartCard