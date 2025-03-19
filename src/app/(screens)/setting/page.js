"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { changeEmail, updatePassword } from "@/actions/auth/auth";
import Image from "next/image";
import DynamicButton from "@/components/shared/DynamicButton";
import RenderField from "@/components/shared/RenderField";
import NewsHeader from "@/components/news/NewsHeader";
import Toaster from "@/components/shared/Toaster";

const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("無効なメールアドレスです")
    .required("メールアドレスは必須です"),
});

const passwordValidationSchema = Yup.object({
  password: Yup.string().required("現在のパスワードは必須です"),
  newPassword: Yup.string()
    .min(8, "パスワードは8文字以上である必要があります")
    .matches(/[a-z]/, "少なくとも1つの小文字が含まれている必要があります")
    .matches(/[A-Z]/, "少なくとも1つの大文字が含まれている必要があります")
    .matches(/[0-9]/, "少なくとも1つの数字が含まれている必要があります")
    .matches(
      /[@$!%*?&#]/,
      "少なくとも1つの特殊文字が含まれている必要があります"
    )
    .required("新しいパスワードは必須です"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "パスワードが一致しません")
    .required("パスワードの確認は必須です"),
});

export default function Settings() {
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
  const [showPassword2, setShowPassword2] = useState(false); // Password visibility state
  const [showPassword3, setShowPassword3] = useState(false); // Password visibility state
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleEmailSubmit = async (values, { setSubmitting }) => {
    try {
      setEmailError("");
      await changeEmail(values.email);
      router.push(
        `/auth/register/confirm?email=${encodeURIComponent(values.email)}`
      );
    } catch (err) {
      setEmailError(
        err instanceof Error
          ? err?.response?.data?.message
          : "メール更新中にエラーが発生しました"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEmail = (resetForm) => {
    resetForm(); // Resets the form fields to their initial values
    setEmailError(""); // Clears any existing error messages
  };


  const handlePasswordSubmit = async (values, { setSubmitting }) => {
    try {
      setPasswordError("");
      await updatePassword(values.password, values.newPassword);
      setSuccess("パスワードが正常に更新されました"); // Set success message
      values.password = "";
      values.newPassword = "";
      values.confirmPassword = "";
    } catch (err) {
      setError(
        err instanceof Error
          ? err?.response?.data?.message
          : "パスワード更新中にエラーが発生しました"
      ); // Set error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="sm:px-8 p-4 pt-8 pb-0 sm:p-4 bg-white w-full">
        <NewsHeader
          title="お知らせ管理" // Pass title prop
          description="このページからお知らせの新規作成や削除などができます" // Pass description prop
        />
      </div>
      <div className=" p-4 pt-8 sm:p-6 lg:p-8 flex flex-col w-full">
        <div className="w-full">
          <h2 className="text-lg sm:text-[18px] font-semibold text-[#101828] leading-6 sm:leading-[38px] mb-1">
            基本情報
          </h2>
          <p className="text-sm text-[#667085] mb-6">
            下記より情報の更新ができます
          </p>

          {/* Email Form */}
          <div className="rounded-lg mb-4 sm:mb-8">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={emailValidationSchema}
              onSubmit={handleEmailSubmit}
            >
              {({ errors, touched, isSubmitting, resetForm }) => (
                <Form>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 sm:pt-[20px] border border-l-0 border-r-0 border-b-0 border-t-[#EAECF0]">
                      <p className="mb-2 sm:mb-0 text-sm text-[#344054] w-[170px]">
                        メールアドレス
                      </p>
                      <RenderField
                        className="w-full sm:w-[50%] rounded-[12px] bg-white ml-0"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="メールアドレスを入力してください"
                        error={
                          errors.email && touched.email ? errors.email : null
                        }
                      />
                      <p></p>
                    </div>
                    <div className="w-full flex justify-end pt-4  sm:pt-[26px] border border-l-0 border-r-0 border-t-[#EAECF0] border-b-0">
                      <div className="flex justify-end max-w-80 gap-3">
                        <button
                          onClick={() => handleCancelEmail(resetForm)}
                          type="button"
                          className="rounded-lg border min-w-[122px] border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          キャンセル
                        </button>
                        <DynamicButton isLoading={isSubmitting} type="submit">
                          保存
                        </DynamicButton>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          {/* Password Form */}
          <div className="rounded-lg">
            <Formik
              initialValues={{
                password: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={passwordValidationSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between py-4 sm:py-[26px] border border-l-0 border-r-0 border-t-[#EAECF0] border-b-[#EAECF0] items-start sm:items-center">
                      <p className="mb-2 sm:mb-0 text-sm text-[#344054] w-[170px]">
                        現在のパスワード
                      </p>
                      <div className="w-full sm:w-[50%] relative ">
                        <RenderField
                          className=" rounded-[12px] bg-white"
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"} // Toggle visibility
                          placeholder="••••••"
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
                            className="text-gray-600 mt-1"
                          />
                        </div>
                      </div>
                      <p></p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 sm:pb-[26px] border border-l-0 border-r-0 border-t-0 border-b-[#EAECF0]">
                      <p className="mb-2 sm:mb-0 text-sm text-[#344054] w-[170px]">
                        新しいパスワード
                      </p>
                      <div className="w-full sm:w-[50%] relative">
                        <RenderField
                          className=" rounded-[12px] bg-white"
                          id="newPassword"
                          name="newPassword"
                          type={showPassword2 ? "text" : "password"} // Toggle visibility
                          placeholder="••••••"
                          error={
                            errors.newPassword && touched.newPassword
                              ? errors.newPassword
                              : null
                          }
                        />
                        <div
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={() => setShowPassword2(!showPassword2)} // Toggle state
                        >
                          <Image
                            src={
                              showPassword2
                                ? "/svgs/videos/eye-open.svg"
                                : "/svgs/videos/eye-closed.svg"
                            }
                            alt="Toggle Password Visibility"
                            width={24}
                            height={24}
                            className="text-gray-600 mt-1"
                          />
                        </div>
                      </div>
                      <p></p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 sm:pb-[26px] border border-l-0 border-r-0 border-t-0 border-b-[#EAECF0]">
                      <p className="mb-2 sm:mb-0 text-sm text-[#344054] w-[170px]">
                        新しいパスワードの再確認
                      </p>
                      <div className="w-full sm:w-[50%] relative">
                        <RenderField
                          className="rounded-[12px] bg-white mr-0 "
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword3 ? "text" : "password"} // Toggle visibility
                          placeholder="••••••"
                          error={
                            errors.confirmPassword && touched.confirmPassword
                              ? errors.confirmPassword
                              : null
                          }
                        />
                        <div
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={() => setShowPassword3(!showPassword3)} // Toggle state
                        >
                          <Image
                            src={
                              showPassword3
                                ? "/svgs/videos/eye-open.svg"
                                : "/svgs/videos/eye-closed.svg"
                            }
                            alt="Toggle Password Visibility"
                            width={24}
                            height={24}
                            className="text-gray-600 mt-1"
                          />
                        </div>
                      </div>
                      <p></p>
                    </div>
                    {error && (
                      <Toaster
                        type="error"
                        message={error}
                        onClose={() => {
                          setError(""); // Clear the error when the toaster closes
                        }}
                      />
                    )}
                    {success && (
                      <Toaster
                        type="success"
                        message={success}
                        onClose={() => {
                          setSuccess(""); // Clear the success message when the toaster closes
                        }}
                      />
                    )}

                    <div className="w-full flex justify-end">
                      <div className="flex justify-end max-w-80 gap-3">
                        <button
                          type="button"
                          className="rounded-lg border min-w-[122px] border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          キャンセル
                        </button>
                        <DynamicButton isLoading={isSubmitting} type="submit">
                          パスワード更新
                        </DynamicButton>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
