'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			setIsAuthenticated(true)
		} else {
			setIsAuthenticated(false)
			router.replace('/auth/login')
		}
	}, [])

	const login = (token, refreshToken) => {
		localStorage.setItem('accessToken', token)
		localStorage.setItem('refreshToken', refreshToken)
		setIsAuthenticated(true)
		router.push('/')
	}

	const logout = () => {
		localStorage.removeItem('accessToken')
		setIsAuthenticated(false)
		router.push('/auth/login')
	}

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
