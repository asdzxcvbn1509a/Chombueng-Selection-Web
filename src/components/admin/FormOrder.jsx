// rafce
import React, { useEffect, useState } from 'react'
import { listOrders, deleteOrder, updateOrderItemQty, deleteOrderItem } from '../../api/order'
import useEcomStore from '../../store/ecom-store'
import numeral from 'numeral'
import { Trash2, Save, Minus, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import { confirmDelete } from '../../utils/sweetalert'

const Order = () => {
  const token = useEcomStore((s) => s.token)
  const [orders, setOrders] = useState([])
  const [editing, setEditing] = useState({}) // { [itemId]: qty }
  const actionRemoveProduct = useEcomStore((s) => s.actionRemoveProduct)

  const load = async () => {
    try {
      const res = await listOrders(token)
      setOrders(res.data || [])
    } catch (err) {
      console.error(err)
      toast.error('โหลดรายการสั่งซื้อไม่สำเร็จ')
    }
  }

  useEffect(() => { load() }, [])

  const handleDeleteOrder = async (orderId) => {
    const result = await confirmDelete('ต้องการลบออเดอร์นี้?', 'หากลบแล้วจะไม่สามารถกู้คืนได้')
    if (result.isConfirmed) {
      try {
        const res = await deleteOrder(orderId, token)
        toast.success(`ลบออเดอร์ #${orderId} สำเร็จ`)
        setOrders((prev) => prev.filter((o) => o.id !== orderId))
      } catch (err) {
        console.error(err)
        toast.error('ลบออเดอร์ไม่สำเร็จ')
      }
    }
  }

  const handleDeleteOrderItem = async (orderId, itemId) => {
    const result = await confirmDelete('ต้องการลบสินค้านี้?', 'หากลบแล้วจะไม่สามารถกู้คืนได้')
    if (!result.isConfirmed) return
    try {
      const res = await deleteOrderItem(orderId, itemId, token)
      toast.success('ลบสินค้าในออเดอร์สำเร็จ')

      const { deletedOrder, total } = res.data

      setOrders(prev => {
        // ถ้าลบแล้วออเดอร์ว่าง → ลบทั้งออเดอร์ออกจาก state
        if (deletedOrder) {
          return prev.filter(o => o.id !== orderId)
        }
        // ถ้ายังมี item เหลือ → ลบเฉพาะ item และอัปเดต total ที่ฝั่ง server ส่งกลับมา
        return prev.map(o => {
          if (o.id !== orderId) return o
          const newItems = o.items.filter(it => it.id !== itemId)
          return { ...o, items: newItems, total: total ?? o.total }
        })
      })
    } catch (err) {
      console.error(err)
      toast.error('ลบสินค้าไม่สำเร็จ')
    }
  }

  const handleQtyChange = (itemId, nextQty) => {
    if (nextQty <= 0) return
    setEditing((prev) => ({ ...prev, [itemId]: nextQty }))
  }

  const handleSaveQty = async (orderId, itemId) => {
    const qty = Number(editing[itemId])
    if (!Number.isInteger(qty) || qty <= 0) {
      toast.warning('จำนวนต้องเป็นเลขจำนวนเต็มบวก')
      return
    }
    try {
      await updateOrderItemQty(orderId, itemId, qty, token)
      toast.success('อัปเดตจำนวนสำเร็จ')
      // refresh เฉพาะ order ที่แก้ หรือโหลดใหม่ทั้งชุดง่ายสุด
      await load()
      setEditing((prev) => {
        const cp = { ...prev }
        delete cp[itemId]
        return cp
      })
    } catch (err) {
      console.error(err)
      toast.error('อัปเดตจำนวนไม่สำเร็จ')
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1 className="text-2xl font-semibold mb-4">รายการสั่งซื้อ</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">ยังไม่มีคำสั่งซื้อ</p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg">
            <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-t-lg">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">ออเดอร์ #{order.id}</span>
                <span className="text-sm text-gray-600">
                  รหัสผู้ใช้: {order.user?.id ?? 'guest'} • รวมทั้งสิ้น: {numeral(order.total).format('0,0.00')}
                </span>
              </div>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
              >
                <Trash2 size={18} /> ลบออเดอร์นี้
              </button>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">#</th>
                    <th className="py-2">รหัสสินค้า</th>
                    <th className="py-2">ชื่อ</th>
                    <th className="py-2">จำนวน</th>
                    <th className="py-2">ราคา</th>
                    <th className="py-2">ราคารวม</th>
                    <th className="py-2 text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it, idx) => {
                    const current = editing[it.id] ?? it.qty
                    return (
                      <tr key={it.id} className="border-b">
                        <td className="py-2">{idx + 1}</td>
                        <td className="py-2">{it.productId}</td>
                        <td className="py-2">{it.title}</td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 border rounded"
                              onClick={() => handleQtyChange(it.id, Number(current) - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              className="w-20 border rounded px-2 py-1 text-center"
                              type="number"
                              min={1}
                              value={current}
                              onChange={(e) => handleQtyChange(it.id, Number(e.target.value))}
                            />
                            <button
                              className="px-2 py-1 border rounded"
                              onClick={() => handleQtyChange(it.id, Number(current) + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="py-2">{numeral(it.price).format('0,0.00')}</td>
                        <td className="py-2">{numeral(it.price * it.qty).format('0,0.00')}</td>
                        <td className="py-2 flex justify-center gap-2">
                          <button
                            className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            onClick={() => handleSaveQty(order.id, it.id)}
                          >
                            <Save size={16} /> บันทึก
                          </button>
                          <button
                            className='inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded'
                            onClick={() => handleDeleteOrderItem(order.id, it.id)}>
                            <Trash2 size={16} /> ลบสินค้า
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order