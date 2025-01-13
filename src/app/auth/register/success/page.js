"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import DynamicButton from "@/components/shared/DynamicButton";
export default function PasswordResetSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 flex justify-center items-center">
        <Image
          src="/svgs/auth/background.svg"
          alt="Background"
          width={768}
          height={768}
          className="absolute left-1/2 transform -translate-x-1/2 -top-[199px] z-10"
        />
      <div className="max-w-[360px]">
      <div className="flex flex-col items-center">
          <div className="w-16 h-16rounded-full flex items-center justify-center mb-6">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_285_13378)">
                <rect x="2" y="1" width="56" height="56" rx="12" fill="white" />
                <rect
                  x="2.5"
                  y="1.5"
                  width="55"
                  height="55"
                  rx="11.5"
                  stroke="#EAECF0"
                />
                <path
                  d="M24.7507 28.9997L28.2507 32.4997L35.2507 25.4997M41.6673 28.9997C41.6673 35.443 36.444 40.6663 30.0007 40.6663C23.5573 40.6663 18.334 35.443 18.334 28.9997C18.334 22.5564 23.5573 17.333 30.0007 17.333C36.444 17.333 41.6673 22.5564 41.6673 28.9997Z"
                  stroke="#344054"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_285_13378"
                  x="0"
                  y="0"
                  width="60"
                  height="60"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_285_13378"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_285_13378"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            パスワードリセット
          </h1>
          <p className="mt-2 text-sm text-center text-gray-600">
            パスワードの再設定を完了しました。下記からログインして頂けます。
          </p>
        </div>

        {/* Login Button */}
        <div className="rounded-lg relative z-20 mt-8">
          <DynamicButton  onClick={() => router.push("/auth/login")}>
            ログイン
          </DynamicButton>
          
        </div>
      </div>
      </div>
    </div>
  );
}
