"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { getNewsById, updateNews, addNews } from "@/actions/news/news";
import NewsHeader from "@/components/news/NewsHeader";
import RenderField from "@/components/shared/RenderField";
import { useRouter } from "next/navigation";

export default function CreateNotification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newsId = searchParams.get("id"); // Extract the `id` parameter from the URL
  const { quill, quillRef } = useQuill();
  const [newsDetail, setNewsDetail] = useState({
    title: "",
    content: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("タイトルは必須です"),
    content: Yup.string().required("本文は必須です"),
  });

  useEffect(() => {
    const fetchNewsDetails = async () => {
      if (newsId) {
        setIsEditMode(true);
        try {
          const news = await getNewsById(newsId);
          setNewsDetail({
            title: news?.data?.title || "",
            content: news?.data?.body || "",
          });
          if (quill) {
            quill.clipboard.dangerouslyPasteHTML(news?.data?.body || ""); // Prefill Quill editor
          }
        } catch (error) {
          console.error("Failed to fetch news details:", error);
        }
      }
    };

    fetchNewsDetails();
  }, [newsId, quill]);

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap bg-white p-4 sm:p-6 lg:p-8 mb-8 items-start justify-between">
        <NewsHeader
          title="お知らせ管理"
          description="このページからお知らせの新規作成や削除などができます"
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-[20px] border border-[#EAECF0]">
          <Formik
            initialValues={{
              title: newsDetail.title || "",
              content: newsDetail.body || "",
            }}
            enableReinitialize
            validationSchema={validationSchema}

            onSubmit={async (values) => {
              try {
                if (isEditMode) {
                  await updateNews(newsId, values); // Update existing news
               

                } else {
                  await addNews(values); // Add new news
                }
                router.push("/news"); // Redirect to /news after successful submission
               

              } catch (error) {
                console.error("Failed to submit form:", error);
              }
            }}
          >
            {({ errors, touched, setFieldValue }) => {
              // Sync Quill content with Formik
              useEffect(() => {
                if (quill) {
                  const handleTextChange = () => {
                    setFieldValue("content", quill.root.innerHTML);
                  };
                  quill.on("text-change", handleTextChange);
                  return () => {
                    quill.off("text-change", handleTextChange); // Cleanup listener
                  };
                }
              }, [quill, setFieldValue]);

              return (
                <Form className="space-y-6">
                  <div className="pb-5">
                    <h1 className="text-[26px] font-bold text-[#181A20]">
                      {isEditMode ? "お知らせの編集" : "お知らせの作成"}
                    </h1>
                  </div>

                  {/* Title Input */}
                  <RenderField
                    id="title"
                    label="お知らせタイトル"
                    name="title"
                    type="text"
                    placeholder="お知らせのタイトルをここに入力"
                    error={errors.title && touched.title ? errors.title : null}
                  />

                  {/* React Quill Editor */}
                  <div className="space-y-2">
                    <label
                      htmlFor="content"
                      className="block text-[18px] text-[#1D2026]"
                    >
                      お知らせの本文
                    </label>
                    <div
                      ref={quillRef}
                      style={{
                        height: "250px",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                      }}
                    ></div>
                    {errors.content && touched.content && (
                      <div className="text-red-500">{errors.content}</div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                    <Link
                      href="/news"
                      className="px-4 py-2 text-sm text-[#344054] bg-[#D3FFF2] rounded-[8px] hover:bg-[#a7f3dc] focus:outline-none"
                    >
                      キャンセル
                    </Link>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm text-white bg-[#199A8E] border border-transparent rounded-[8px] hover:bg-[#27756d] focus:outline-none"
                    >
                      {isEditMode ? "保存変更" : "保存"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}
