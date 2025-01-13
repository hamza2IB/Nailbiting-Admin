import { Formik, Form } from "formik";
import * as Yup from "yup";
import RenderField from "@/components/shared/RenderField";
import DynamicButton from "@/components/shared/DynamicButton";
import Toaster from "@/components/shared/Toaster";

const passwordValidationSchema = Yup.object({
  password: Yup.string().required("現在のパスワードは必須です"),
  newPassword: Yup.string()
    .min(8, "パスワードは8文字以上である必要があります")
    .matches(/[a-z]/, "少なくとも1つの小文字が含まれている必要があります")
    .matches(/[A-Z]/, "少なくとも1つの大文字が含まれている必要があります")
    .matches(/[0-9]/, "少なくとも1つの数字が含まれている必要があります")
    .matches(/[@$!%*?&#]/, "少なくとも1つの特殊文字が含まれている必要があります")
    .required("新しいパスワードは必須です"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "パスワードが一致しません")
    .required("パスワードの確認は必須です"),
});

const PasswordForm = ({ handlePasswordSubmit, error, success, isLoading }) => {
  return (
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
              {/* Current Password Field */}
              <RenderField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                error={errors.password && touched.password ? errors.password : null}
              />
              {/* New Password Field */}
              <RenderField
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="••••••"
                error={errors.newPassword && touched.newPassword ? errors.newPassword : null}
              />
              {/* Confirm Password Field */}
              <RenderField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••"
                error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
              />
              {error && <Toaster type="error" message={error} />}
              {success && <Toaster type="success" message={success} />}
              <div className="w-full flex justify-end">
                <DynamicButton isLoading={isSubmitting} type="submit">
                  パスワード更新
                </DynamicButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordForm;