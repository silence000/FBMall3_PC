<template>
  <div class="containerFluid">
    <div class="container productFilter">

      <el-button-group class="priceButton">
        <el-button size="small">
          综合&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small">
          人气&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small">
          新品&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small">
          销量&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small">
          价格&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
      </el-button-group>

      <div class="priceLimit">
        <el-input
          size="small"
          class="priceLimit__input"
          v-model="priceLeft"
          placeholder="最低价格"></el-input>
        <span class="priceLimit__divide">~</span>
        <el-input
          size="small"
          class="priceLimit__input"
          v-model="priceRight"
          placeholder="最高价格"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mounted() {},
  data() {
    return {
      priceLeft: '',
      priceRight: '',
    };
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
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .productFilter {
    height: 35px;
  }

  .priceButton {
    float: left;
  }

  .priceLimit {
    float: left;
    margin-left: 20px;

    &__input {
      width: 100px;
    }

    &__divide {
      display: inline-block;
      width: 30px;
      text-align: center;
    }
  }
</style>
