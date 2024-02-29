const departmentConfig = {
  pageName: "department",
  formItems: [
    {
      type: "normal",
      span: 8,
      label: "部门名称",
      prop: "name",
      placeholder: "请输入部门名称",
      initialValue: "默认部门名称"
    },
    {
      type: "normal",
      span: 8,
      label: "部门领导",
      prop: "leader",
      placeholder: "请输入部门领导"
    },
    {
      type: "datePicker",
      span: 8,
      label: "创建时间",
      prop: "createAt",
      separator: "-",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    }
  ]
};

export default departmentConfig;
