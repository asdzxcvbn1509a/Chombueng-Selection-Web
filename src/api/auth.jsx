import axios from 'axios'

export const currentUser = async (token) => await axios.post('https://chombueng-selection.vercel.app/api/current-user', {}, {
    headers: {
        Authorization: `bearer ${token}`
    }
})

export const currentAdmin = async (token) => {
    return await axios.post('https://chombueng-selection.vercel.app/api/current-admin', {}, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
}

export const loginLine = async (data) => {
    try {
        const response = await axios.post('https://chombueng-selection.vercel.app/api/login-line', { data })
        console.log('Login Response:', response.data)
        return response.data
    } catch (error) {
        console.error('API Error:', error.response?.data || error)
        throw error
    }
}