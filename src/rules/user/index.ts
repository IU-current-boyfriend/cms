import type { FormRules } from "element-plus";
// 设置新建用户表单的校验规则
export const createUserRules: FormRules = {
  name: [
    {
      required: true,
      message: "请填写用户名",
      trigger: "blur"
    }
  ],
  realname: [
    {
      required: true,
      message: "请填写真实姓名",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请填写密码",
      trigger: "blur"
    }
  ],
  cellphone: [
    {
      required: true,
      message: "请填写电话号码",
      trigger: "blur"
    }
  ],
  roleId: [
    {
      required: true,
      message: "请选择角色",
      trigger: "blur"
    }
  ],
  departmentId: [
    {
      required: true,
      message: "请选择部门",
      trigger: "blur"
    }
  ]
};
