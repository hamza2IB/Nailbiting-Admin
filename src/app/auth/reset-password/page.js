"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import Link from "next/link";
import Image from "next/image";
import { resetPassword, resendOTP } from "@/actions/auth/auth";
import DynamicButton from "@/components/shared/DynamicButton";
import RenderField from "@/components/shared/RenderField";
import { validationSchema } from "../../../components/auth/validations/resetPasswordValidation"; // Import the new validation schema
import OtpInput from "@/components/auth/OTPinput";
export default function NewPassword() {
  const router = useRouter();
  const query = useSearchParams();
  const email = query.get("email");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOTPExpired, setIsOTPExpired] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [showCPassword, setShowCPassword] = useState(false); // Password visibility state

  const otpRefs = useRef([]); // Initialize as an empty array

  useEffect(() => {
    otpRefs.current = otpRefs.current.slice(0, 5);
    setTimeout(() => {
      setIsOTPExpired(false);
    }, 60000);
  }, []);

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError("");

      if (values.otp.some((o) => o === "")) {
        setError("OTPは必須です");
        return;
      }

      const otpString = values.otp.join("");

      // Use the new resetPassword API service
      await resetPassword(email, otpString, values.password);
      values.otp = ["", "", "", "", ""];
      values.password = "";
      values.confirmPassword = "";
      

      router.push("/auth/register/success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err?.response?.data?.message
          : "パスワードの更新中にエラーが発生しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);
      setError("");
      await resendOTP(email);
      setIsSuccess(true);
      setIsOTPExpired(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
      setTimeout(() => {
        setIsOTPExpired(false);
      }, 60000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err?.response?.data?.message
          : "メールの再送信に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Icon and Title */}
        <div className="flex flex-col items-center justify-center">
          <div className=" rounded-full flex items-center justify-center">
            <Image
              src="/svgs/auth/key.svg"
              alt="Logo"
              width={56}
              height={56}
              className="text-white"
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-[30px] text-center font-semibold text-[#101828]">
            新規パスワード作成
          </h1>
          <p className="mt-2 text-center text-[#475467]">
            新しいパスワードとその確認を入力ください
          </p>
        </div>
        {/* Form */}
        <div className="space-y-6">
          <Formik
            initialValues={{
              otp: ["", "", "", "", ""],
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="space-y-6">
                {/* OTP Input */}
                <OtpInput
                  values={values}
                  setFieldValue={setFieldValue}
                  error={errors}
                />

                <div className="space-y-2 relative">
                  <RenderField
                    id="password"
                    label="新しいパスワード" // Added label argument
                    name="password"
					type={showPassword ? "text" : "password"} // Toggle visibility
                    placeholder="パスワードを入力"
                    error={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)} // Toggle state
                  >
                    <Image
                      src={
                        showPassword
                          ? "/svgs/videos/eye-open.svg"
                          : "/svgs/videos/eye-closed.svg"
                      }
                      alt="Toggle Password Visibility"
                      width={24}
                      height={24}
                      className="text-gray-600 mt-5"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <RenderField
                    id="confirmPassword"
                    label="パスワードの確認" // Added label argument
                    name="confirmPassword"
					type={showCPassword ? "text" : "password"} // Toggle visibility
                    placeholder="パスワードを再度入力"
                    error={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : null
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowCPassword(!showCPassword)} // Toggle state
                  >
                    <Image
                      src={
                        showCPassword
                          ? "/svgs/videos/eye-open.svg"
                          : "/svgs/videos/eye-closed.svg"
                      }
                      alt="Toggle Password Visibility"
                      width={24}
                      height={24}
                      className="text-gray-600 mt-5"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}
                {isSuccess && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <p className="text-sm text-green-700">
                      パスワードリセットのメールを送信しました。メールをご確認ください。
                    </p>
                  </div>
                )}
                <DynamicButton isLoading={isLoading} type="submit">
                  送信
                </DynamicButton>

                <div className="text-center">
                  <div className="text-sm text-[#475467] mb-8">
                    メールが届いていない場合{" "}
                    <button
                      onClick={handleResend}
                      disabled={isOTPExpired}
                      className={`text-sm text-teal-600 hover:text-teal-500  ${
                        isOTPExpired ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      こちらより再送する
                    </button>
                  </div>

                  <Link
                    href="/auth/forgot-password"
                    className="icon-link flex gap-[8px] justify-center items-center text-sm text-gray-600 hover:text-teal-500"
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
                    忘れたページへ戻る
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
