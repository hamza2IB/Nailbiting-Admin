import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    otp: Yup.array()
      .of(
        Yup.string()
          .matches(/^[0-9]$/, "数字を入力してください")
          .required("必須です")
      )
      .length(5, "5桁の数字を入力してください"),
    password: Yup.string()
      .min(8, "パスワードは8文字以上である必要があります")
      .required("パスワードは必須です"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "パスワードが一致しません")
      .required("パスワードの確認は必須です"),
  });