'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form } from 'formik'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import DynamicButton from '@/components/shared/DynamicButton'
import { loginUser, resendOTP } from '@/actions/auth/auth'
import { validationSchema } from '../../../components/auth/validations/loginValidation' // Import the new validation schema
import RenderField from '@/components/shared/RenderField'
import Link from 'next/link'
import Toaster from '@/components/shared/Toaster'

export default function Login() {
	const { login } = useAuth()
	const router = useRouter()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false) // Password visibility state

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true)
      setError('')
      const user = await loginUser(values)
      // const { accessToken, refreshToken } = response.user
      if (user?.accessToken && user?.refreshToken) {

				console.log(user?.email, 'user got')
				localStorage.setItem("emailLocal", JSON.stringify(user?.email));
        login(user.accessToken, user.refreshToken);
      } else {
        throw new Error("Invalid login response. Tokens are missing.");
      };
    } catch (err) {
      console.log(err)
      if (err?.response?.data?.message === "Access denied: User is not an admin.") {
        setError("You are not authorized to login.");
      } else {
        setError(err?.response?.data?.message || 'ログイン中にエラーが発生しました');
      }
      if (err?.response?.data?.message == 'Your account is not verified. Please verify your email.') {
        setTimeout(async () => {
          await resendOTP(values.email)
          router.push(`/auth/register/confirm?email=${encodeURIComponent(values.email)}`)
        }, 1000)
      }
    } finally {
      setIsLoading(false)
    }
  }

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<Image
					src='/svgs/auth/background.svg'
					alt='Logo'
					width={768}
					height={768}
					className='text-white absolute left-1/2 transform -translate-x-1/2 -top-[199px] z-10'
				/>
				{/* Logo and Title */}
				<div className='flex flex-col items-center'>
					<div className='rounded-full flex items-center justify-center'>
						<Image src='/svgs/logo.svg' alt='Logo' width={205} height={126} className='text-white' />
					</div>
					<h1 className='text-[15px] leading-[17.73px] font-normal text-[#101828] my-6'>抜毛・爪噛み・皮膚むしり症改善アプリ</h1>
					<h1 className='text-[30px] font-semibold text-[#101828] leading-[38px] mb-3'>ログインページ</h1>
					<p className='mt-2 text-[#475467] text-center'>下記よりログイン情報をご入力ください</p>
				</div>

				{/* Form */}
				<div className='px-0 py-8 sm:p-8 rounded-lg relative z-20'>
					<Formik
						initialValues={{ email: '', password: '' }}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						{({ errors, touched, setFieldValue }) => (
							<Form>
								<div className='flex flex-col space-y-6 mb-6'>
									{/* Email Input */}
									<RenderField
										id='email'
										label='メールアドレス'
										name='email'
										type='email'
										placeholder='メールを入力'
										error={errors.email && touched.email ? errors.email : null}
									/>

									{/* Password Input with Toggle */}
									<div className='relative'>
										<RenderField
											id='password'
											label='パスワード'
											name='password'
											type={showPassword ? 'text' : 'password'} // Toggle visibility
											placeholder='••••••'
											error={errors.password && touched.password ? errors.password : null}
										/>
										<div
											className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
											onClick={() => setShowPassword(!showPassword)} // Toggle state
										>
											<Image
												src={showPassword ? '/svgs/videos/eye-open.svg' : '/svgs/videos/eye-closed.svg'}
												alt='Toggle Password Visibility'
												width={24}
												height={24}
												className='text-gray-600 mt-7'
											/>
										</div>
									</div>
								</div>

								<div className='flex items-center justify-between'>
									<Link
										href='/auth/forgot-password'
										className='text-sm text-teal-600 mb-6 underline hover:text-teal-500'>
										パスワードをお忘れの場合
									</Link>
								</div>

								{error && (
									<Toaster
										type='error'
										message={error}
										onClose={() => {
											setError('') // Clear the error when the toaster closes
										}}
									/>
								)}

								<DynamicButton isLoading={isLoading} type='submit'>
									ログイン
								</DynamicButton>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}
