<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="500"
      center
      @close="closeDialog"
    >
      <el-form
        :model="createNewUserFormData"
        :rules="createUserRules"
        label-position="right"
        label-width="100px"
        ref="createUserRef"
      >
        <el-form-item prop="name" label="用户名">
          <el-input
            v-model="createNewUserFormData.name"
            placeholder="请输入用户名"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="realname" label="真实姓名">
          <el-input
            v-model="createNewUserFormData.realname"
            placeholder="请输入真实姓名"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password" label="登录密码" v-if="!isEdit">
          <el-input
            v-model="createNewUserFormData.password"
            placeholder="请输入登录密码"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item prop="cellphone" label="电话号码">
          <el-input
            v-model="createNewUserFormData.cellphone"
            placeholder="请输入电话号码"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="roleId" label="选择角色">
          <el-select v-model="createNewUserFormData.roleId" size="large">
            <el-option
              v-for="role of entireRoles"
              :key="role.id"
              :value="role.id"
              :label="role.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="departmentId" label="选择部门">
          <el-select v-model="createNewUserFormData.departmentId" size="large">
            <el-option
              v-for="department of entireDepartments"
              :key="department.id"
              :value="department.id"
              :label="department.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" size="large">
            取消
          </el-button>
          <el-button type="primary" @click="handleConfrimClick" size="large">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { createUserRules } from "@/rules/index";
import useMainStore from "@/store/main/main";
import useSystemStore from "@/store/main/system/system";
import type { IUserInfo } from "./type";

interface ICreateNewUserFormData {
  name: string;
  realname: string;
  password: string;
  cellphone: number | string;
  roleId: number | string;
  departmentId: number | string;
}

const dialogVisible = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const userId = ref<number>();
const createNewUserFormData: {
  [key in string]: any;
} = reactive<ICreateNewUserFormData>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
});
const createUserRef = ref<InstanceType<typeof ElForm>>();
const mainStore = useMainStore();
const systemStore = useSystemStore();
const { entireDepartments, entireRoles } = storeToRefs(mainStore);

const setDialogVisible = ({
  action,
  visible,
  data
}: {
  action: string;
  visible: boolean;
  data?: IUserInfo;
}) => {
  dialogVisible.value = visible;
  // 判断是新增用户行为还是编辑用户行为
  const actionMethod: {
    [key in string]: any;
  } = {
    create: createNewUserAction(),
    edit: data && editUserAction(data)
  };
  actionMethod[action];
};

const createNewUserAction = () => {
  // 修改编辑行为状态
  isEdit.value = false;
  for (let key in createNewUserFormData) {
    createNewUserFormData[key] = "";
  }
};
const editUserAction = (userInfo: any) => {
  isEdit.value = true;
  if (userInfo.id) userId.value = userInfo.id;
  for (let key in createNewUserFormData) {
    createNewUserFormData[key] = userInfo[key];
  }
};

// 提交表单校验
const handleConfrimClick = () => {
  createUserRef?.value?.validate((valid) => {
    if (valid) {
      // 关闭弹框
      dialogVisible.value = false;
      const toRawedUserInfo = toRaw(createNewUserFormData);
      // 分辨操作的类型，调用不同的store行为
      if (!isEdit.value) {
        // 新建用户的行为
        systemStore.createNewUserDataAction(toRawedUserInfo);
      } else {
        // 编辑用户的行为
        userId.value &&
          systemStore.editUserDataAction(userId.value, toRawedUserInfo);
      }
    } else {
      ElMessage({
        type: "error",
        message: "请完整填写表单"
      });
    }
  });
};

const closeDialog = () => {
  createUserRef?.value?.clearValidate();
};

defineExpose({
  setDialogVisible
});
</script>

<style scoped lang="less"></style>
