import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("無効なメールアドレスです")
      .required("メールアドレスは必須です"),
  });
  