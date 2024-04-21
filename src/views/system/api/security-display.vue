<template>
  <div>
    <template v-if="security.codes.length == 1">
      <el-tag v-if="security.codes[0]" size="mini" type="info">{{
        security.codes[0]
      }}</el-tag>
      <span v-else>-</span>
    </template>

    <el-popover v-else placement="right-end" width="180" trigger="click">
      <template #default>
        <div
          v-for="(code, index) in security.codes"
          :key="index"
          class="text item"
        >
          <span v-if="index > 0">{{ security.logic }}</span>
          <el-tag size="mini" type="info">{{ code }}</el-tag>
        </div>
      </template>
      <template #reference>
        <el-button type="text" size="mini" circle>{{
          security.codes.length
        }}</el-button>
      </template>
    </el-popover>
  </div>
</template>
<script>
function parseSecurityCodes(codes) {
  let logic = "与";
  codes = codes.split("&&");
  if (codes.length == 1) {
    codes = codes[0].split("||");
    if (codes.length == 1) {
      logic = "";
    } else {
      logic = "或";
    }
  }
  return {
    logic,
    codes,
  };
}

export default {
  name: "SecurityDisplay",
  props: {
    codes: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      security: parseSecurityCodes(this.codes || ""),
    };
  },
};
</script>
