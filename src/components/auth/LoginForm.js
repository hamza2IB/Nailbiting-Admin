"use client";
import { Field } from "formik";
import DynamicButton from "@/components/shared/DynamicButton";
import Link from "next/link";

const LoginForm = ({ errors, touched, isLoading }) => (
  <form className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="email" className="block text-sm text-[#344054]">Email</label>
      <Field
        id="email"
        name="email"
        type="email"
        placeholder="メールを入力"
        className={`w-full px-[14px] py-[10px] border rounded-[8px] placeholder:text-[#667085] ${
          errors.email && touched.email ? "border-red-500" : "border-[#D0D5DD]"
        } focus:outline-none focus:ring-2 focus:ring-teal-500`}
      />
      {errors.email && touched.email && <p className="text-sm text-red-500">{errors.email}</p>}
    </div>

    <div className="space-y-2">
      <label htmlFor="password" className="block text-sm text-[#344054]">Password</label>
      <Field
        id="password"
        name="password"
        type="password"
        placeholder="••••••"
        className={`w-full px-[14px] py-[10px] border rounded-[8px] placeholder:text-[#667085] ${
          errors.password && touched.password ? "border-red-500" : "border-[#D0D5DD]"
        } focus:outline-none focus:ring-2 focus:ring-teal-500`}
      />
      {errors.password && touched.password && <p className="text-sm text-red-500">{errors.password}</p>}
    </div>

    <div className="flex items-center justify-between">
      <Link href="/auth/forgot-password" className="text-sm text-teal-600 underline hover:text-teal-500">パスワードをお忘れの場合</Link>
    </div>

    <DynamicButton isLoading={isLoading} type="submit">ログイン</DynamicButton>
  </form>
);

export default LoginForm;