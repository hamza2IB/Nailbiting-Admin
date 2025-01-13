// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Formik, Form, Field } from 'formik'
// import * as Yup from 'yup'
// import axios from 'axios'
// import Link from 'next/link'
// import Image from 'next/image'
// import DynamicButton from '@/components/shared/DynamicButton'
// const validationSchema = Yup.object().shape({
//   name: Yup.string()
//     .required('名前は必須です'),
//   email: Yup.string()
//     .email('無効なメールアドレスです')
//     .required('メールアドレスは必須です'),
//   password: Yup.string()
//     .min(8, 'パスワードは8文字以上である必要があります')
//     .required('パスワードは必須です'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'パスワードが一致しません')
//     .required('パスワードの確認は必須です')
// })

// export default function Register() {
//   const router = useRouter()
//   const [error, setError] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const handleSubmit = async (values) => {
//     try {
//       setIsLoading(true)
//       setError('')
      
//       const response = await axios.post(
//         'http://localhost:5000/api/v1/auth/register',
//         values,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       if (response.data) {
//         router.push(`/auth/register/confirm?email=${values.email}`)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : '登録中にエラーが発生しました')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center  p-4">
//       <div className="w-full max-w-md space-y-8">
//       <Image
//               src="/svgs/auth/background.svg"
//               alt="Logo"
//               width={768}
//               height={768}
//               className="text-white absolute left-1/2 transform -translate-x-1/2 -top-[199px] z-10"
//             />
//         {/* Icon and Title */}
//         <div className="flex flex-col items-center">
//           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//             <svg
//               className="w-6 h-6 text-gray-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-semibold text-gray-900">新規パスワード作成</h1>
//           <p className="mt-2 text-sm text-gray-600">
//             新しいパスワードとその確認を入力ください
//           </p>
//         </div>

//         {/* Form */}
//         <div className=" p-8 rounded-lg z-20 relative">
//           <Formik
//             initialValues={{
//               name: '',
//               email: '',
//               password: '',
//               confirmPassword: ''
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ errors, touched }) => (
//               <Form className="space-y-6">
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     名前
//                   </label>
//                   <Field
//                     id="name"
//                     name="name"
//                     type="text"
//                     placeholder="名前を入力"
//                     className={`w-full px-3 py-2 border rounded-md ${
//                       errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                   />
//                   {errors.name && touched.name && (
//                     <p className="text-sm text-red-500">{errors.name}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     メールアドレス
//                   </label>
//                   <Field
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="メールアドレスを入力"
//                     className={`w-full px-3 py-2 border rounded-md ${
//                       errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
//                     } focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                   />
//                   {errors.email && touched.email && (
//                     <p className="text-sm text-red-500">{errors.email}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     新しいパスワード
//                   </label>
//                   <div className="relative">
//                     <Field
//                       id="password"
//                       name="password"
//                       type={showPassword ? 'text' : 'password'}
//                       placeholder="パスワードを入力"
//                       className={`w-full px-3 py-2 border rounded-md ${
//                         errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
//                       } focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
//                     >
//                       {showPassword ? '非表示' : '表示'}
//                     </button>
//                   </div>
//                   {errors.password && touched.password && (
//                     <p className="text-sm text-red-500">{errors.password}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                     パスワードの確認
//                   </label>
//                   <div className="relative">
//                     <Field
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type={showConfirmPassword ? 'text' : 'password'}
//                       placeholder="パスワードを再度入力"
//                       className={`w-full px-3 py-2 border rounded-md ${
//                         errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                       } focus:outline-none focus:ring-2 focus:ring-teal-500`}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600"
//                     >
//                       {showConfirmPassword ? '非表示' : '表示'}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && touched.confirmPassword && (
//                     <p className="text-sm text-red-500">{errors.confirmPassword}</p>
//                   )}
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border-l-4 border-red-400 p-4">
//                     <p className="text-sm text-red-700">{error}</p>
//                   </div>
//                 )}

//                 {/* <button
//                   type="submit"
//                   className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
//                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? '送信中...' : '送信'}
//                 </button> */}
//                 <DynamicButton
//                   isLoading={isLoading}
//                   type = "submit"
//                 >
//                   送信
//                 </DynamicButton>

//                 <div className="text-center">
//                   <Link
//                     href="/auth/login"
//                     className="text-sm text-gray-600 hover:text-teal-500"
//                   >
//                     ← ログインページに戻る
//                   </Link>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   )
// }

