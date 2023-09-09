<template>
  <div>
    <el-row>
      <el-col :span="2">
        <yi-operation
          text="有弹窗"
          :api-config="{
            url: '/demo/sayhello',
            method: 'post',
            data: {
              word: 'hello',
            },
            params: {
              say: 'hi',
            },
          }"
        >
          <template #default="{ model }">
            <h1>Hello!</h1>
            <el-form-item prop="abc" required>
              <el-input v-model="model.abc" />
            </el-form-item>
          </template>
        </yi-operation>
      </el-col>
      <el-col :span="2">
        <yi-operation
          :api-config="{
            url: '/demo/sayhello',
            method: 'post',
            data: {
              word: 'hello',
            },
            params: {
              say: 'hi',
            },
          }"
          circle
          icon="el-icon-download"
        />
      </el-col>
      <el-col :span="2">
        <yi-operation
          :api-config="{
            url: '/demo/sayhello',
            method: 'post',
            data: {
              word: 'hello',
            },
            params: {
              say: 'hi',
            },
          }"
          text="确认信息"
          confirm-text="打招呼"
        />
      </el-col>
      <el-col :span="2">
        <yi-operation
          :api-config="{
            url: '/demo/sayhello',
            method: 'post',
            data: {
              word: 'hello',
            },
            params: {
              say: 'hi',
            },
          }"
          :form-data="formData"
          text="确认信息"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <yi-operation
          text="新增"
          :api-config="{
            url: '/demo/sayhello',
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            data: {
              word: 'hello',
            },
            params: {
              say: 'hi',
            },
          }"
          :form-data="formData"
          modal-type="drawer"
          modal-title="新增用户"
        >
          <template #default="{ model }">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="name" label="姓名" required>
                  <el-input v-model="model.name" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="sex" label="性别" required>
                  <el-input v-model="model.sex" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="age" label="年龄" required>
                  <el-input v-model="model.age" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="phone" label="电话" required>
                  <el-input v-model="model.phone" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- <el-form-item ref="fileItem" prop="file" required>
              <input
                type="file"
                @change="
                  (e) => {
                    console.info('on file select', e);
                    $set(data, 'file', e.target.files[0])
                    $nextTick(() => {
                        clearValidate
                    })
                  }
                "
              />
            </el-form-item> -->
          </template>
        </yi-operation>
      </el-col>
      <el-col :span="2">
        <yi-downloader :api-config="{
          url: '/user/export'
        }" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    let formData = new FormData();
    formData.append("name", "hui");
    formData.append("age", "37");
    formData.append(
      "json",
      new Blob(
        [
          JSON.stringify({
            times: 0,
            success: "ok",
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    return {
      formData: formData,
    };
  },
  methods: {
    chooseFile(e) {
      e.target.files[0];
    },
  },
};
</script>
<style scoped></style>
