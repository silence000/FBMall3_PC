<template>
  <div>
    <div class="containerFluid ensure">
      <div class="container ensureContent">
        <br>
        <br>
        <el-image
          style="width: 982px; height: 90px"
          :src="ensureImg"
          fit="fill"
          class="ensureImg"
        ></el-image>
        <el-divider></el-divider>
      </div>
    </div>

    <div class="containerFluid footerLinkGroup1">
      <div class="container">
        <el-image
          style="width: 943px; height: 173px"
          :src="footerLinkGroup1"
          fit="fill"
        ></el-image>
      </div>
    </div>

    <div class="containerFluid footerLinkGroup2">
      <div class="container">
        <br>
        <el-image
          style="width: 1000px; height: 194px"
          :src="footerLinkGroup2"
          fit="fill"
        ></el-image>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'footerNav',
  components: {},
  mounted() {},
  data() {
    return {
      ensureImg: `${this.$store.state.ImagesServerURL}img/site/ensure.png`,
      footerLinkGroup1: `${this.$store.state.ImagesServerURL}img/site/footerLinkGroup1.jpg`,
      footerLinkGroup2: `${this.$store.state.ImagesServerURL}img/site/footerLinkGroup2.jpg`,
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

  .ensureContent {
    text-align: center;

    .ensureImg {
      margin: 0 auto;
    }
  }

  .footerLinkGroup2 {
    background-color: $color-black;
    border-top: 3px solid $color-primary;
  }
</style>
