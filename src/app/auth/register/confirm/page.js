'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import DynamicButton from '@/components/shared/DynamicButton'
import { resendOTP, verifyEmail } from '@/actions/auth/auth'

export default function EmailVerification() {
	const router = useRouter()
	const query = useSearchParams()
	const email = query.get('email')
	const [otp, setOtp] = useState(['', '', '', '', ''])
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isOTPExpired, setIsOTPExpired] = useState(true)
	const inputRefs = useRef([])
	const emailLocal = JSON.parse(localStorage.getItem("emailLocal"));
  console.log("Logged-in Email:", emailLocal);

	// Initialize refs array
	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, 5)
		setTimeout(() => {
			setIsOTPExpired(false)
		}, 60000)
	}, [])

	const handleChange = (element, index) => {
		const value = element.value
		const newOtp = [...otp]

		// Only allow numbers
		newOtp[index] = value.replace(/[^0-9]/g, '')
		setOtp(newOtp)

		// Auto focus next input
		if (value && index < 4) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (e, index) => {
		// On backspace, clear current input and focus previous
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			const newOtp = [...otp]
			newOtp[index - 1] = ''
			setOtp(newOtp)
			inputRefs.current[index - 1]?.focus()
		}
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			setIsLoading(true)
			setError('')
			const otpString = otp.join('')
			await verifyEmail(emailLocal,email, otpString)
			router.push(`/setting`)
		} catch (err) {
			setError(err instanceof Error ? err?.response?.data?.message : '認証に失敗しました')
		} finally {
			setIsLoading(false)
		}
	}

	const handleResend = async () => {
		try {
			setIsLoading(true)
			setError('')
			await resendOTP(email)
			setIsSuccess(true)
			setIsOTPExpired(true)
			setTimeout(() => {
				setIsSuccess(false)
			}, 6000)
			setTimeout(() => {
				setIsOTPExpired(false)
			}, 60000)
			setOtp(['', '', '', '', ''])
		} catch (err) {
			setError(err instanceof Error ? err?.response?.data?.message : 'メールの再送信に失敗しました')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-4'>
			<div className='w-full max-w-md '>
				<Image
					src='/svgs/auth/background.svg'
					alt='Background'
					width={768}
					height={768}
					className='absolute left-1/2 transform -translate-x-1/2 -top-[199px] z-10'
				/>

				{/* Icon and Title */}
				<div className='flex flex-col items-center'>
					<div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6'>
						<svg className='w-8 h-8 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
							/>
						</svg>
					</div>
					<h1 className='text-2xl font-semibold text-gray-900 mb-3'>メールを確認</h1>
					<p className='mt-2 text-sm text-gray-600 text-center'>認証メールを{email}に送付しました</p>
				</div>

				{/* Form */}
				<div className='p-8 rounded-lg relative z-20'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='flex justify-center gap-2'>
						{otp.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(e.target, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								id={`otp-${index}`} 
								className='w-20 h-20 text-center text-[48px] border-2 text-[#199A8E] rounded-[8px] border-teal-500 focus:outline-none'
							/>
						))}

						</div>

						{error && (
							<div className='bg-red-50 border-l-4 border-red-400 p-4'>
								<p className='text-sm text-red-700'>{error}</p>
							</div>
						)}
						{isSuccess && (
							<div className='bg-green-50 border-l-4 border-green-400 p-4'>
								<p className='text-sm text-green-700'>
									パスワードリセットのメールを送信しました。メールをご確認ください。
								</p>
							</div>
						)}

						<DynamicButton
							disabled={isLoading || otp.some((digit) => !digit)} // Existing line
							isLoading={isLoading}
							type='submit'>
							メール認証
						</DynamicButton>

						<div className='text-center space-y-4'>
							<div className='text-sm text-[#475467] mb-8'>
								メールが届いていない場合{' '}
								<button
									onClick={handleResend} disabled={isOTPExpired}
									className={`text-sm text-teal-600 hover:text-teal-500  ${
										isOTPExpired ? 'opacity-50 cursor-not-allowed' : ''
									}`}>
									こちらより再送する
								</button>
							</div>

							<div>
								<Link
									href='/auth/login'
									className='icon-link flex gap-[8px] justify-center items-center text-sm text-gray-600 hover:text-teal-500'>
									<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M15.8327 10.0003H4.16602M4.16602 10.0003L9.99935 15.8337M4.16602 10.0003L9.99935 4.16699'
											stroke='#475467'
											strokeWidth='1.66667'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
									ログインページに戻る
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
