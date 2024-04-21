<template>
  <yi-operation
    text="新增"
    icon="icon-plus"
    :api-config="({model}) => {
        if(model.password != model.passwordRepeat) {
            throw '密码不一致'
        }
        // else {
        //     delete data.passwordRepeat
        // }

        return {
            url: '/demo/user',
            method: 'post',
        }
    }"
    modal-title="新增用户"
    @on-validate-fail="(vali, error) => {
        if(error) {
            $message({
                type: 'error',
                message: error
            })
        }
    }"
  >
    <template #default="{ model }">
        <el-row>
            <el-col :span="12">
                <el-form-item label="用户名" prop="username" required label-width="110px">
                    <el-input
                        v-model="model.username"
                        placeholder="请输入用户名"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="用户昵称" prop="nickName" required label-width="110px">
                    <el-input
                        v-model="model.nickName"
                        placeholder="请输入用户昵称"
                    />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="密码" prop="password" label-width="110px">
                    <el-input
                        v-model="model.password"
                        placeholder="请输入密码"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="密码确认" prop="passwordRepeat" label-width="110px">
                    <el-input
                        v-model="model.passwordRepeat"
                        placeholder="请重复输入密码"
                    />
                </el-form-item>
            </el-col>
        </el-row>
    </template>
  </yi-operation>
</template>
<script>
