import axios from 'axios'

export const createProduct = async (token, form) => {
    // Code Body
    return axios.post('https://chombueng-selection.vercel.app/api/product', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listProduct = async (count = 1000) => {
    // Code Body
    return axios.get('https://chombueng-selection.vercel.app/api/products/' + count)
}

export const readProduct = async (token, id) => {
    return axios.get('https://chombueng-selection.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = async (token, id, form) => {
    return axios.put('https://chombueng-selection.vercel.app/api/product/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    // Code body
    //console.log('form api fontent', form)
    return axios.post('https://chombueng-selection.vercel.app/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeFiles = async (token, public_id) => {
    return axios.post('https://chombueng-selection.vercel.app/api/removeimages', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, id) => {
    return axios.delete('https://chombueng-selection.vercel.app/api/product/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
    return axios.post('https://chombueng-selection.vercel.app/api/search/filters', arg)
};

export const productBy = async (sort, order, limit) => {
    // Code body
    return axios.post('https://chombueng-selection.vercel.app/api/productby', {
        sort,
        order,
        limit,
    });
};

export const changeStatusProduct = (token, value) => {
    return axios.put('https://chombueng-selection.vercel.app/api/product/status', value, {
        headers: { Authorization: `Bearer ${token}` }
    })
}