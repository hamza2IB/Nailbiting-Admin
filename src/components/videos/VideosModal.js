import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import RenderField from "@/components/shared/RenderField"; // Import RenderField

// Define validation schema
const validationSchema = Yup.object().shape({
  youtubeLink: Yup.string()
    .url("有効なURLを入力してください")
    .required("リンクは必須です"),
  title: Yup.string()
    .max(50, "タイトルは50文字以内で入力してください")
    .required("タイトルは必須です"),
  description: Yup.string()
    .max(150, "説明は150文字以内で入力してください")
    .required("説明は必須です"), // Ensure it's required
});

const VideosModal = ({
  isOpen,
  toggleModal,
  formData,
  handleChange,
  handleSubmit,
}) => {
  const handleOutsideClick = (event) => {
    const modalContent = document.getElementById("modal-content");
    if (modalContent && !modalContent.contains(event.target)) {
      toggleModal(); // Close the modal
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 p-10 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div id="modal-content" className="bg-white  w-full max-w-[1320px]">

        <h1 className="text-xl font-semibold text-center border-b py-6 ">
          動画追加
        </h1>
        <div className="bg-white p-10 ">
          <div className="mx-auto ">
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              validateOnBlur={true}
              validateOnChange={true}
              onSubmit={(values, { setSubmitting, setTouched }) => {
                setTouched({
                  youtubeLink: true,
                  title: true,
                  description: true,
                });
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ errors, touched }) => {
                return (
                  <Form className="space-y-6 ">
                    <RenderField
                      id="youtubeLink"
                      label="YouTubeリンク"
                      name="youtubeLink"
                      type="text"
                      placeholder="動画のリンクを貼り付け"
                      error={
                        errors.youtubeLink ||
                        (touched.youtubeLink && errors.youtubeLink)
                      }
                    />
                    <RenderField
                      id="title"
                      label="動画タイトル"
                      name="title"
                      type="text"
                      placeholder="動画のタイトルを入力"
                      maxLength={50}
                      error={errors.title || (touched.title && errors.title)}
                    />
                    <div>
                      <Field
                        id="description"
                        name="description"
                        as="textarea"
                        placeholder="動画の説明を入力"
                        rows={5}
                        className={`border  ${
                          errors.description ||
                          (touched.description && errors.description)
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md p-2 w-full`}
                      />
                      <div className="text-red-500 text-sm">
                        {errors.description ||
                          (touched.description && errors.description && (
                            <span>{errors.description}</span>
                          ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                      >
                        キャンセル
                      </button>
                      <button
                      data-testid="save-video-button" 
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:outline-none"
                      >
                        保存
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosModal;
