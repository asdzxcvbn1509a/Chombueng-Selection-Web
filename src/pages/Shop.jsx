// rafce
import React, { useEffect } from 'react'
import ProductCard from '../components/card/ProductCard'
import useEcomStore from '../store/ecom-store'
import SearchCard from '../components/card/SearchCard'
import CartCard from '../components/card/CartCard'
import Footer from '../components/Footer'

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)
  const getcategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)

  // เรียงลำดับ category ตาม id
  const sortedCategories = [...categories].sort((a, b) => a.id - b.id);

  // จัดกลุ่มสินค้าตาม category และเรียงตามลำดับ
  const groupedProducts = sortedCategories.reduce((acc, category) => {
    const productsInCategory = products.filter(
      product => product.category?.id === category.id
    );
    if (productsInCategory.length > 0) {
      acc[category.name] = productsInCategory;
    }
    return acc;
  }, {});

  useEffect(() => {
    getProduct()
    getcategory()  // เพิ่มการดึงข้อมูล category
  }, [])

  return (
    <div className=''>
      <div className='pt-4 bg-gradient-to-b from-[#F6C2CF] to-[#F9F6F3]'>
        <SearchCard />
      </div>

      {/* Product */}
      <div className='min-h-screen md:pt-4 flex flex-col bg-[#F9F6F3]'>
        {sortedCategories.map((category) => {
          const items = groupedProducts[category.name];
          if (!items) return null;

          return (
            <div key={category.id}>
              <h1 className='text-[#6E6E6E] font-kanit md:text-2xl text-lg md:mx-24 mx-6 pt-4'>
                {category.name}
              </h1>
              <br />
              <div className='grid grid-cols-2 md:grid-cols-4 max-w-[1400px] md:mx-auto md:gap-x-32 scale-95 md:scale-100 gap-2 md:-mt-2 -mt-8'>
                {items.map((item, index) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  )
}

export default Shop