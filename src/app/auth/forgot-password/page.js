"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import DynamicButton from "@/components/shared/DynamicButton";
import { validationSchema } from "../../../components/auth/validations/forgotPasswordValidation";
import RenderField from "@/components/shared/RenderField";
import { forgotPassword } from "@/actions/auth/auth";
import Toaster from "@/components/shared/Toaster";
export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError("");
    try {
      await forgotPassword(values);
      setIsSuccess(true);
      router.push(
        `/auth/reset-password?email=${encodeURIComponent(values.email)}`
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "パスワードリセットの処理中にエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Image
          src="/svgs/auth/background.svg"
          alt="Background"
          width={768}
          height={768}
          className="absolute left-1/2 transform -translate-x-1/2 -top-[199px] z-10"
        />

        {/* Icon and Title */}
        <div className="flex flex-col items-center">
          <div className=" rounded-full flex items-center justify-center mb-6">
            <Image
              src="/svgs/auth/key.svg"
              alt="Logo"
              width={56}
              height={56}
              className="text-white"
            />
          </div>
          <h1 className="text-[30px] font-semibold text-gray-900">
            パスワード忘れ
          </h1>
          <p className="mt-2  text-[#475467] text-center">
            下記よりパスワード変更の手続きを行えます
          </p>
        </div>

        {/* Form */}
        <div className="px-0 sm:px-8 rounded-lg relative z-20">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6">
                <div className="space-y-2 forgot-email">
                  <RenderField
                    id="email"
                    label="メールアドレス"
                    name="email"
                    type="email"
                    placeholder="メールを入力"
                    error={errors.email && touched.email ? errors.email : null}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-700 toasty-msg">{error}</p>
                  </div>
                )}

                {isSuccess && (
                  <Toaster
                    type="success"
                    message="パスワードリセットのメールを送信しました。メールをご確認ください。"
                    onClose={() => {
                      // Clear the error when the toaster closes
                    }}
                  />
                )}
                <DynamicButton isLoading={isLoading} type="submit">
                  パスワードをリセット
                </DynamicButton>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="icon-link flex gap-[8px] justify-center items-center text-sm text-[#475467] hover:text-[#199A8E]"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8327 10.0003H4.16602M4.16602 10.0003L9.99935 15.8337M4.16602 10.0003L9.99935 4.16699"
                        stroke="#475467"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    ログインページに戻る
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
