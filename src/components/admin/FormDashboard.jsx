// rafce
import React, { useEffect, useState } from 'react'
import { getOverview, getSales, getTopProduct, getByCategory } from '../../api/stats'
import useEcomStore from '../../store/ecom-store'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts'
import numeral from 'numeral'
import dayjs from 'dayjs'

const FormDashboard = () => {
    const token = useEcomStore(s => s.token)
    const [overview, setOverview] = useState(null)
    const [sales, setSales] = useState([])
    const [top, setTop] = useState([])
    const [cats, setCats] = useState([])

    // เลือกช่วงเวลา (ค่าเริ่มต้น 7 วัน)
    const [range, setRange] = useState('7d')

    useEffect(() => {
        const params = { range }
        Promise.all([
            getOverview(token, params),
            getSales(token, params),
            getTopProduct(token, { ...params, limit: 5 }),
            getByCategory(token, params)
        ]).then(([ov, sa, tp, bc]) => {
            setOverview(ov.data)
            setSales(sa.data.data)
            setTop(tp.data.items)
            setCats(bc.data.data)
        }).catch(console.error)
    }, [token, range])

    return (
        <div className='p-6 space-y-6'>
            {/* ช่วงเวลา */}
            <div className='flex items-center gap-3'>
                <span className='font-semibold'>ช่วงเวลา:</span>
                {['7d', '30d', '90d'].map(r => (
                    <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`px-3 py-1 rounded border ${range === r ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            {/* การ์ดสรุป */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='bg-white rounded-xl p-4 shadow'>
                    <p className='text-gray-500'>ยอดสั่งซื้อ (จำนวน)</p>
                    <p className='text-3xl font-bold'>{overview?.totalOrders ?? 0}</p>
                </div>
                <div className='bg-white rounded-xl p-4 shadow'>
                    <p className='text-gray-500'>ยอดขายรวม (บาท)</p>
                    <p className='text-3xl font-bold'>{numeral(overview?.grossSales || 0).format('0,0')}</p>
                </div>
                <div className='bg-white rounded-xl p-4 shadow'>
                    <p className='text-gray-500'>จำนวนชิ้น (จำนวน)</p>
                    <p className='text-3xl font-bold'>{numeral(overview?.totalItems || 0).format('0,0')}</p>
                </div>
                <div className='bg-white rounded-xl p-4 shadow'>
                    <p className='text-gray-500'>ค่าเฉลี่ยนรายได้ต่อออเดอร์ (บาท)</p>
                    <p className='text-3xl font-bold'>{numeral(overview?.avgOrderValue || 0).format('0,0')}</p>
                </div>
            </div>

            {/* กราฟยอดขายรายวัน */}
            <div className='bg-white rounded-xl p-4 shadow'>
                <h3 className='font-semibold mb-3'>ยอดขายรายวัน (บาท)</h3>
                <div className='h-72'>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sales}>
                            <defs>
                                <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#FF65C3" stopOpacity={0.8} />
                                    <stop offset="100%" stopColor="#FF65C3" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={(d) => dayjs(d).format('MM/DD')} />
                            <YAxis tickFormatter={(v) => numeral(v).format('0a')} />
                            <Tooltip formatter={(v) => numeral(v).format('0,0')} />
                            <Area type="monotone" dataKey="total" stroke="#FF65C3" fill="url(#c1)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Products + Category */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-white rounded-xl p-4 shadow'>
                    <h3 className='font-semibold mb-3'>ยอดตามสินค้า</h3>
                    <div className='h-72'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={top}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="title" hide />
                                <YAxis tickFormatter={(v) => numeral(v).format('0a')} />
                                <Tooltip formatter={(v) => numeral(v).format('0,0')} />
                                <Legend />
                                <Bar dataKey="qty" name="จำนวน" fill="#9FC69F" />
                                <Bar dataKey="revenue" name="รายได้" fill="#FF65C3" />
                            </BarChart>
                        </ResponsiveContainer>
                        {/* <div className='mt-2 space-y-1'>
              {top.map(t=>(
                <div key={t.productId} className='flex justify-between text-sm'>
                  <span className='truncate max-w-[60%]'>{t.title}</span>
                  <span>{numeral(t.revenue).format('0,0')} • {t.qty} ชิ้น</span>
                </div>
              ))}
            </div> */}
                    </div>
                </div>

                <div className='bg-white rounded-xl p-4 shadow'>
                    <h3 className='font-semibold mb-3'>ยอดตามหมวดหมู่</h3>
                    <div className='h-72'>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={cats}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis tickFormatter={(v) => numeral(v).format('0a')} />
                                <Tooltip formatter={(v) => numeral(v).format('0,0')} />
                                <Legend />
                                <Bar dataKey="qty" name="จำนวน" fill="#9FC69F" />
                                <Bar dataKey="revenue" name="รายได้" fill="#FF65C3" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormDashboard