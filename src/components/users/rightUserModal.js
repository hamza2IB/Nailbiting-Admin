"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import UserRightShimmer from '@/components/shimmer/userRightShimmer';


export default function RightUserModal({ isOpen, onClose, user }) {
  const [severityRating, setSeverityRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [exerciseRating, setExerciseRating] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (user) {
      setIsLoading(false);
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose,user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
     {isLoading ? (
        <UserRightShimmer /> // Show shimmer when loading
      ) : (
      <div
        ref={modalRef}
        className="bg-white  h-full w-full max-w-[660px] overflow-hidden overflow-y-auto relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-[30px]">質問内容</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              width="52"
              height="54"
              viewBox="0 0 52 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="52"
                height="53"
                transform="translate(0 0.5)"
                fill="#ECFDF3"
              />
              <path
                d="M39 13.75L13 40.25M13 13.75L39 40.25"
                stroke="#101010"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* First Question */}
          {user?.responses.filter((res) => res.type == "point")?.length > 0 && (
            <div className="space-y-4">
              <p className=" font-bold text-[18px] text-[#000000] ">
                {
                  user?.responses.filter((res) => res.type == "point")[0]
                    .question
                }
              </p>
              <div className=" text-[18px] text-[#3C3C43D9] ">
                <p>0：ほとんどない</p>
                <p>2-3：少し（軽度）</p>
                <p>5：中程度</p>
                <p>7-8：比較的重い</p>
                <p>10：とてもひどい（最重度）</p>
              </div>
              <div className="flex items-center gap-2 border-b pb-[18px]">
                <span className="text-sm text-gray-600">→評価</span>
                <p>
                  {
                    user?.responses.filter((res) => res.type == "point")[0]
                      .answer
                  }
                </p>
              </div>
            </div>
          )}

          {/* Second Question */}
          {user?.responses.filter((res) => res.type == "star")?.length > 0 && (
            <div className="space-y-4">
              <p className=" font-bold text-[18px] text-[#000000]">
                {
                  user?.responses.filter((res) => res.type == "star")[0]
                    .question
                }
              </p>
              <div className=" text-[18px] text-[#3C3C43D9]">
                <p>0：全くできなかった</p>
                <p>1：あまりできなかった（☆）</p>
                <p>2：まあまあできた（☆☆）</p>
                <p>3：目標通りにできた（☆☆☆）</p>
              </div>
              <div className="flex items-center gap-2  border-b pb-[18px]">
                <span className="text-sm text-gray-600">→評価</span>
                <div className="flex gap-2 ml-3">
                  {Array.from(
                    {
                      length: user?.responses.filter(
                        (res) => res.type == "star"
                      )[0].answer,
                    },
                    (_, index) => index + 1
                  ).map((star) => (
                    <span
                      key={star}
                      className={`text-md ${
                        star <= exerciseRating
                          ? "text-yellow-400"
                          : "text-yellow-400"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Image */}
          <div className="rounded-lg flex gap-4 overflow-hidden overflow-x-auto">
            {user?.nailPhotos.map((photo, index) => (
              <img
                key={index}
                src={photo.key}
                alt={`Nail photo ${index + 1}`}
                className="w-full min-w-[300px]  max-h-[400px] rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
