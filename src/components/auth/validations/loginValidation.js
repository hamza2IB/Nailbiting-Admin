import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("無効なメールアドレスです")
    .required("メールアドレスは必須です"),
  password: Yup.string()
    .min(6, "パスワードは6文字以上である必要があります")
    .required("パスワードは必須です"),
});