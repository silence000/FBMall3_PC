<template>
  <div class="containerFluid">
    <div class="container">
      <el-image
        :src="imgUrl"
        fit="fill"
      ></el-image>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bannerAd',
  components: {},
  mounted() {},
  data() {
    return {
      imgUrl: `${this.$store.state.ImagesServerURL}img/category/83.jpg`,
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

    .container {
      @include container;
      height: 140px;
    }
  }
</style>
