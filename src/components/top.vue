<template>
  <div class="top">
    <div class="top-left">
      <el-link><i class="el-icon-s-home"></i>商城首页</el-link>
      <el-link>喵，欢迎来到FBMall</el-link>
      <el-link>请登录</el-link>
      <el-link>免费注册</el-link>
    </div>
    <div class="top-right">
      <el-link>我的订单</el-link>
      <el-link>购物车0件</el-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'top',
  components: {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style scoped lang="scss">
  @import "../assets/scss/constant";
  .top {
    a {
      font-size: 12px;
    }
    &-left {

    }
  }
</style>
