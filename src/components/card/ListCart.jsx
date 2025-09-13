// rafce
import React from 'react'
import { List, Minus, Plus } from 'lucide-react'
import useEcomStore from '../../store/ecom-store'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import { toast } from 'react-toastify'
import { createOrder } from '../../api/order'

const ListCart = () => {
  const actionRemoveProduct = useEcomStore((s) => s.actionRemoveProduct)
  const actionUpdateQuantity = useEcomStore((s) => s.actionUpdateQuantity)
  const clearCart = useEcomStore((s) => s.clearCart)     // ✅ เคลียร์ตะกร้าหลังสั่งซื้อ
  const carts = useEcomStore((s) => s.carts)
  const getTotalPrice = useEcomStore((s) => s.getTotalPrice)
  const token = useEcomStore((s) => s.token)         // ✅ มี/ไม่มี ก็สั่งได้ (API รองรับ guest)

  // ✅ รวมข้อความไป LINE (ถ้ามี orderId จะโชว์)
  const generateOrderMessage = (orderId) => {
    let message = orderId ? `🧾 ใบสั่งซื้อ #${orderId}\n\n` : '🛒 สรุปรายการสั่งซื้อ\n\n'
    carts.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - ${item.price} x ${item.count} = ${item.price * item.count} บาท\n`
    })
    message += `\n💰 รวมทั้งหมด: ${getTotalPrice()} บาท`
    return message
  }

  // ✅ สั่งซื้อ: บันทึก DB ก่อน แล้วค่อยเปิด LINE จากนั้นเคลียร์ตะกร้า
  const handleOrder = async () => {
    if (!carts.length) {
      toast.warning('ไม่มีสินค้าในตะกร้า')
      return
    }

    const items = carts.map((c) => ({
      productId: c.id,
      title: c.title,
      price: c.price,
      qty: c.count,
    }))
    const total = getTotalPrice()

    try {
      // 👉 บันทึกคำสั่งซื้อเข้าฐานข้อมูล (guest ก็ได้ userId จะเป็น null)
      const res = await createOrder({ items, total }, token)
      const orderId = res?.data?.orderId
      toast.success(`สร้างออเดอร์ #${orderId ?? '-'} สำเร็จ`)

      // 👉 เปิด LINE พร้อมสรุปรายการ (แนบเลขออเดอร์ถ้ามี)
      const msg = encodeURIComponent(generateOrderMessage(orderId))
      window.open(`https://line.me/R/msg/text/?${msg}`, '_blank')

      // 👉 เคลียร์ตะกร้า
      clearCart()
    } catch (err) {
      console.error('Order error:', err?.response?.data || err)
      toast.error(err?.response?.data?.message || 'บันทึกออเดอร์ไม่สำเร็จ')
    }
  }

  return (
    <div className='bg-[#F9F6F3] rounded-sm md:p-4 md:pt-10 pt-8 min-h-[875px] md:min-h-[725px]'>
      {/* Header */}
      <div className='flex gap-4 md:mb-4 md:pl-16 pl-4'>
        <List size={32} />
        <p className='text-2xl font-medium mb-4 font-kanit'>
          รายการสินค้า {carts.length} รายการ
        </p>
      </div>

      {/* List */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 scale-95 md:scale-100 md:pl-16'>
        {/* Left */}
        <div className='order-2 md:order-1 col-span-2'>
          {carts.map((item, index) => (
            <div key={index} className='bg-[#ECECEC] px-2 py-4 rounded-md shadow-md md:mb-8 mb-6'>
              <div className='flex justify-between mb-2 mr-2'>
                <div className='flex gap-2 items-center'>
                  {item.images && item.images.length > 0 ? (
                    <img
                      className='md:h-32 h-24 rounded-md shadow-md object-cover border-2 border-[#CBCBCB]'
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div className='md:h-32 md:w-48 w-36 h-24 bg-[#D9D9D9] rounded-md flex text-center items-center justify-center'>
                      ไม่มีรูป
                    </div>
                  )}
                  <div className='md:m-4 m-1'>
                    <p className='font-semibold font-sarabun md:text-2xl text-lg text-[#3E3E3E]'>{item.title}</p>
                    <p className=' text-[#6E6E6E] font-sarabun md:text-xl md:mt-2 mt-1 text-base'>
                      {/* {numeral(item.price).format('0,0')}.- */}
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className='flex items-center'>
                  <button
                    onClick={() => {
                      if (item.count === 1) {
                        actionRemoveProduct(item.id)
                      } else {
                        actionUpdateQuantity(item.id, item.count - 1)
                      }
                    }}
                    aria-label='ลดจำนวน'
                  >
                    <div className='hidden md:block'>
                      <Minus size={24} strokeWidth={4} />
                    </div>
                    <div className='md:hidden'>
                      <Minus size={20} strokeWidth={3.5} />
                    </div>
                  </button>

                  <p className='md:text-4xl text-3xl font-semibold bg-[#D9D9D9] md:p-3 p-1 md:px-4 rounded-lg font-sarabun mx-2'>
                    {item.count}
                  </p>

                  <button
                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                    aria-label='เพิ่มจำนวน'
                  >
                    <div className='hidden md:block'>
                      <Plus size={24} strokeWidth={4} />
                    </div>
                    <div className='md:hidden'>
                      <Plus size={20} strokeWidth={3.5} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right (สรุป) */}
        <div className='order-1 md:order-2 bg-[#F9F6F3] p-2 rounded-xl md:m-12 ml-4 border-2 md:h-96 mb-4'>
          <div className='flex justify-between m-8'>
            <p className='text-4xl font-semibold font-kanit md:mt-16 mt-4'>ยอดรวม</p>
            <div className='flex justify-between'>
              <span className='text-4xl mr-2 font-kanit font-semibold md:mt-16 mt-4'>
                {numeral(getTotalPrice()).format('0,0')}
              </span>
            </div>
          </div>

          <div className='flex flex-col md:gap-6 gap-5 mt-4 md:m-8 m-4'>
            <button
              onClick={handleOrder}
              type='button' /* ✅ กันกรณีเผลออยู่ใน form */
              className='bg-[#06C755] w-full md:py-2 py-1 rounded-md shadow-md hover:bg-green-700 md:text-2xl text-xl font-kanit font-medium'
            >
              สั่งซื้อผ่านไลน์
            </button>

            <Link to={'/shop'}>
              <button
                type='button'
                className='bg-[#FFCC00] w-full md:py-2 py-1 rounded-md shadow-md hover:bg-yellow-700 font-kanit font-medium md:text-2xl text-xl'
              >
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCart
