<template>
  <el-button
    v-if="authorized"
    class="tip-wizard-button"
    :type="type"
    :size="size"
    :circle="circle"
    :icon="icon"
    :title="title"
    @click="popUp"
  >
    {{ btText }}
    <el-dialog
      append-to-body
      class="wizard-dialog"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      v-bind="$attrs"
      @open="open"
      v-on="$listeners"
    >
      <template slot="title">
        <el-steps :active="activeStepIndex" finish-status="success">
          <el-step v-for="(step, index) in steps" :key="index" :title="step.title" :icon="step.icon" />
        </el-steps>
      </template>

      <el-row>
        <el-col :span="leftSpan" style="padding: 5px">
          <el-carousel
            ref="carousel"
            v-loading="loading"
            :interval="1000"
            :autoplay="false"
            indicator-position="none"
            :height="height"
            :loop="false"
            arrow="never"
          >
            <el-carousel-item
              v-for="(step, index) in steps"
              :key="index"
              :name="index + ''"
            >
              <template v-if="activeStepIndex >= index">
                <el-form
                  v-if="!step.useDefaultForm"
                  :ref="'step_form_' + index"
                  :model="context"
                  class="tip-wizard-panel"
                  label-width="100px"
                >
                  <slot
                    :name="step.name || index"
                    v-bind="{
                      index: index,
                      step: step,
                      context: context,
                    }"
                  >
                    第{{ index + 1 }}步
                  </slot>
                </el-form>
                <slot
                  v-else
                  :name="step.name || index"
                  v-bind="{
                    index: index,
                    step: step,
                    context: context,
                  }"
                />
              </template>
            </el-carousel-item>

            <el-carousel-item>
              <slot
                v-bind="{
                  context: context,
                }"
              >
                <div style="text-align: center; font-size: 18px">操作完成</div>
              </slot>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="24 - leftSpan" style="padding: 5px">
          <slot
            name="overview"
            :context="context"
            :contextChangeTimes="contextChangeTimes"
            :currentIndex="activeStepIndex"
            :fullscreen="fullScreenOverview"
          >
          </slot>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-row type="flex" class="wizard-footer" justify="space-between">
          <el-col class="left" :span="8">
            <el-button
              v-show="!isFinishedStep"
              size="small"
              type="info"
              @click="onCancel"
              >取 消</el-button
            >
          </el-col>
          <el-col class="right" :span="16">
            <el-button
              v-show="!isFinishedStep"
              size="small"
              :disabled="canNotGoBack || loading"
              @click="toPrevStep()"
              >上一步</el-button
            >
            <el-button
              v-show="!isFinishedStep"
              size="small"
              :disabled="loading"
              :type="nextStepBtnType"
              @click="toNextStep()"
              >{{ nextStepBtnText }}</el-button
            >
            <el-button
              v-show="isFinishedStep"
              size="small"
              type="success"
              @click="onFinish"
              >完 成</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </el-button>
</template>
<script>
export default {
  name: "YiTipWizard",
  automount: true,
  inject: {
    apiAuthVerify: {
      from: "yimi-api-auth-verify",
      default() {
        return (config) => {
          // 相当于未做权限拦截
          return typeof config != "undefined";
        };
      },
    },
  },
  props: {
    title: {
      type: String,
      default: "操作向导",
    },
    btText: {
      type: String,
      default: undefined,
    },
    // title: {
    //   type: String,
    //   default: undefined,
    // },
    circle: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: undefined,
    },
    api: {
      type: [Object, Function],
      default: undefined,
    },
    // data: {
    //     type: Object,
    //     default: function(){
    //         return {}
    //     }
    // },
    height: {
      type: String,
      default: undefined,
    },
    confirmText: {
      type: String,
      default: undefined,
    },
    steps: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    onOpen: {
      type: Function,
      default: function (resolve) {
        resolve({});
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      prevStepIndex: undefined,
      activeStepIndex: 0,
      context: {},
      contextChangeTimes: 0,
      loading: false,
      stepStack: [],
      leftSpanValue: 13,
    };
  },

  computed: {
    authorized: function () {
      let config = this.getConfig();
      return this.apiAuthVerify(config);
    },
    leftSpan: function () {
      if (this.$slots["overview"] || this.$scopedSlots["overview"]) {
        return this.leftSpanValue;
      } else {
        return 24;
      }
    },
    canNotGoBack: function () {
      var currentStep = this.steps[this.activeStepIndex];
      if (currentStep && currentStep.canNotGoBack) {
        return true;
      } else {
        return this.activeStepIndex == 0;
      }
    },
    isFinishedStep: function () {
      return this.activeStepIndex == this.steps.length;
    },
    nextStepBtnText: function () {
      if (this.activeStepIndex == this.steps.length - 1) {
        return this.confirmText || "确认";
      } else {
        return "下一步";
      }
    },
    nextStepBtnType: function () {
      if (this.activeStepIndex == this.steps.length - 1) {
        return "warning";
      } else {
        return "primary";
      }
    },
  },
  watch: {
    context(v) {
      this.$emit("change", v);
      this.contextChangeTimes++;
    },
  },
  methods: {
    getConfig() {
      return typeof this.api == "function" ? this.api() : this.api;
    },
    popUp() {
      this.dialogVisible = true;
      this.activeStepIndex = 0;
    },
    open() {
      this.loading = true;
      this.onOpen((context) => {
        this.leftSpanValue = 13;
        if (typeof context == "string") {
          this.$alert(context, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        } else if (typeof context == "object") {
          Object.keys(context).forEach((prop) => {
            this.$set(this.context, prop, context[prop]);
          });
        }

        this.loading = false;
      });
    },
    toNextStep() {
      if (!this.isFinishedStep) {
        var currentForm = this.$refs["step_form_" + this.activeStepIndex];
        if (currentForm && currentForm[0]) {
          currentForm[0].validate((pass, validateObj) => {
            if (pass) {
              this.stepNext();
            } else {
              this.$emit("on-validate-form-fail", validateObj);
            }
          });
        } else {
          // console.info('next null')
          this.stepNext();
        }
      }
    },
    validateForm() {
      if (!this.isFinishedStep) {
        var currentForm = this.$refs["step_form_" + this.activeStepIndex];
        if (currentForm && currentForm[0]) {
          currentForm[0].validate((pass, validateObj) => {
            if (!pass) {
              this.$emit("on-validate-form-fail", validateObj);
            }
          });
        }
      }
    },
    resetValidate() {
      if (!this.isFinishedStep) {
        var currentForm = this.$refs["step_form_" + this.activeStepIndex];
        if (currentForm && currentForm[0]) {
          currentForm[0].clearValidate();
        }
      }
    },
    stepNext() {
      var currentStep = this.steps[this.activeStepIndex];
      if (currentStep) {
        if (currentStep.step) {
          this.loading = true;
          currentStep.step(this.context, this.next, this.stopLoading);
        } else {
          this.next();
        }
      }
    },
    stopLoading() {
      this.loading = false;
    },
    next(name) {
      if (name) {
        let targetStepIndex = this.steps.findIndex((step, index) => {
          if (index > this.activeStepIndex && step.name == name) {
            return true;
          } else {
            return false;
          }
        });

        if (!targetStepIndex && !isNaN(name)) {
          let theIndex = parseInt(name);
          if (theIndex > this.activeStepIndex) {
            targetStepIndex = theIndex;
          }
        }

        if (targetStepIndex) {
          this.prevStepIndex = this.activeStepIndex;
          this.stepStack.push(this.activeStepIndex);

          this.activeStepIndex = targetStepIndex;
          this.$refs.carousel.setActiveItem(targetStepIndex);
          this.$nextTick(() => {
            this.loading = false;
          });
        } else {
          console.error("找不到目标步骤", name);
          this.loading = false;
        }
      } else {
        this.prevStepIndex = this.activeStepIndex;
        this.stepStack.push(this.activeStepIndex);

        this.activeStepIndex++;
        this.$refs.carousel.next();
        this.$nextTick(() => {
          this.loading = false;
        });
      }
    },
    toPrevStep() {
      // console.info('toPrevStep', this.activeStepIndex, this.steps.length)
      if (this.activeStepIndex > 0) {
        // this.activeStepIndex = this.prevStepIndex;
        let prev = this.activeStepIndex;
        this.activeStepIndex = this.stepStack.pop();
        // console.info('this.activeStepIndex', this.activeStepIndex)
        this.$refs.carousel.setActiveItem(this.activeStepIndex);

        // this.activeStepIndex --
        // this.$refs.carousel.prev()
        let cur = this.activeStepIndex;
        this.$emit("on-prev-step", [cur, prev, this.context]);
      }
    },
    submit() {
      let reqConfig = typeof this.api == "function" ? this.api() : this.api;
      this.$axios.request(reqConfig).then(() => {
        this.onFinish();
      });
    },
    onCancel() {
      this.reset();
      this.$emit("on-cancel");
    },
    onFinish() {
      this.$emit("on-finish", this.context);
      this.reset();
    },
    reset() {
      this.dialogVisible = false;
      this.steps.forEach((step, index) => {
        var formArray = this.$refs["step_form_" + index];
        if (formArray && formArray[0]) {
          formArray[0].resetFields();
        }
      });
      this.context = {};
      this.activeStepIndex = -1;
      this.$refs.carousel.setActiveItem(0);
      this.$nextTick(() => {
        this.activeStepIndex = 0;
      });
    },
    fullScreenOverview(fullscreen) {
      if (fullscreen) {
        this.leftSpanValue = 0;
      } else {
        this.leftSpanValue = 13;
      }
    },
  },
};
</script>
<style lang="scss">
.el-button.tip-wizard-button [class*="el-icon-"] + span {
  margin-left: 0 !important;
}

.el-dialog__wrapper.wizard-dialog.scroll {
  .el-dialog {
    .el-dialog__body {
      overflow-y: scroll;
    }
  }
}

.el-dialog__wrapper.wizard-dialog {
  .el-dialog {
    border-radius: 6px;
    background-clip: padding-box;

    .el-dialog__header {
      padding: 12px 10px;
      font-weight: 550;
      border-bottom: 1px solid #e6ebf5;

      .el-dialog__headerbtn {
        top: 12px;
        right: 15px;
        // border: 1px solid #e6ebf5;
      }
    }
    .el-dialog__body {
      padding: 10px 10px;

      .tip-wizard-panel {
        .el-form-item__label {
          padding-left: 2px;
        }

        .el-radio {
          width: 90px;
        }
      }
    }

    .el-dialog__footer {
      padding: 10px;
      border-top: 1px solid #e6ebf5;

      .wizard-footer {
        .left {
          padding-left: 5px;
          text-align: left;
        }
        .right {
          padding-right: 5px;
          text-align: right;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
