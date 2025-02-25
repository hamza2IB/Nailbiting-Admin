import { api } from '@/services/api'
export const loginUser = async (values) => {
  try {
    const response = await api.post('/auth/login', values)
    console.log('Login response:', response)

    const { user } = response.data

    // Check if the user is an admin
    if (user.role !== 'admin') {
      return Promise.reject({ response: { data: { message: 'Access denied: User is not an admin.' } } })
    }

    return user
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
export const forgotPassword = async (values) => {
  const response = await api.post('/auth/forgot-password', values)
  return response.data
}
export const resetPassword = async (email, otp, password) => {
  const response = await api.post('/auth/reset-password', { email, otp, password })
  return response.data
}
export const resendOTP = async (email) => {
  const response = await api.post('/auth/resend-otp', { email })
  return response.data
}
export const changeEmail = async (email) => {
  console.log('Email:', email)
  const response = await api.put('/user/change-email', { email })
  return response.data
}
export const verifyEmail = async (email,newEmail, otp) => {
  const response = await api.post('/auth/change-email-verify', { email,newEmail, otp })
  console.log('Verify Email response:', response.data)
  const { accessToken } = response.data
  localStorage.setItem(`accessToken`, accessToken)

  return response.data
}
export const updatePassword = async (password, newPassword) => {
  const response = await api.put('/user/change-password', { password, newPassword })
  return response.data
}
