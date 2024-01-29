import type { FormRules } from "element-plus";

// 设置帐号表单登录的校验规则
export const accountPaneRule: FormRules = {
  name: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur"
    },
    {
      required: true,
      message: "用户名长度必须是3-10位",
      pattern: /^[a-zA-Z0-9]{3,10}$/,
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur"
    },
    {
      required: true,
      message: "密码长度必须是3-10位",
      pattern: /^[a-zA-Z0-9]{3,10}$/,
      trigger: "blur"
    }
  ]
};
