<template>
  <div class="containerFluid">
    <div class="container">
      <el-row>
        <el-col :span="5">
          <div class="grid-content">
            官方旗舰店
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content">
            商品详情
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'productExtra',
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
  // 导入Scss
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // 变量定义
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }
</style>
