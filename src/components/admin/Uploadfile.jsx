//rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'
import { Link } from 'react-router-dom'
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {

    const token = useEcomStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)
    // Javascript
    const handleOnChange = (e) => {
        //Code
        setIsLoading(true)
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images // [] empty array
            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])
                // Validate
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`)
                    continue
                }
                // Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPG",
                    100,
                    0,
                    (data) => {
                        // Endpoint Backed
                        //console.log('data', data)
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                setIsLoading(false)
                                toast.success('อัปโหลดรูปภาพสำเร็จ')
                            })
                            .catch((err) => {
                                console.log(err)
                                setIsLoading(false)
                            })

                    },
                    "base64"

                )

            }
        }


    }
    console.log(form)

    const handleDelete = (public_id) => {
        const images = form.images
        removeFiles(token, public_id)
            .then((res) => {
                console.log(res)
                const filterImages = images.filter((item) => {
                    return item.public_id !== public_id
                })

                console.log('FilterImages', filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.success(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-4 my-4'>
                {/* Image */}
                {
                    isLoading && <Loader className='w-10 h-10 animate-spin'/>
                }
                
                {form.images.map((item, index) =>
                    <div className='relative' key={index}>
                        <img
                            className='w-24 h-24 hover:scale-105'
                            src={item.url}
                        />
                        <Link>
                            <span
                                onClick={() => handleDelete(item.public_id)}
                                className='absolute top-1 right-1 bg-red-500 text-white rounded-sm p-1'
                            >
                                X

                            </span>
                        </Link>
                    </div>
                )
                }
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                />
            </div>
        </div>
    )
}

export default Uploadfile