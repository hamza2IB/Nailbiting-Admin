import { Formik, Form } from "formik";
import * as Yup from "yup";
import RenderField from "@/components/shared/RenderField";
import DynamicButton from "@/components/shared/DynamicButton";

const emailValidationSchema = Yup.object({
  email: Yup.string()
    .email("無効なメールアドレスです")
    .required("メールアドレスは必須です"),
});

const EmailForm = ({ handleEmailSubmit, emailError, isLoading }) => {
  return (
    <div className="rounded-lg mb-4 sm:mb-8">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailValidationSchema}
        onSubmit={handleEmailSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
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
                  error={errors.email && touched.email ? errors.email : null}
                />
              </div>
              <div className="w-full flex justify-end pt-4 sm:pt-[26px] border border-l-0 border-r-0 border-t-[#EAECF0] border-b-0">
                <div className="flex justify-end max-w-80 gap-3">
                  <button
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
      {emailError && <p className="text-red-500">{emailError}</p>}
    </div>
  );
};

export default EmailForm;
