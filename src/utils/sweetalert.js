import Swal from 'sweetalert2'

// ยืนยันการลบ
export const confirmDelete = async (title = "ยืนยันการลบ", text = "คุณแน่ใจหรือไม่?") => {
    return await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ใช่, ลบเลย',
        cancelButtonText: 'ยกเลิก'
    })
}