<template>
  <div class="containerFluid">
    <div class="container">
      <div class="headerNav">
        <el-row>
          <el-col :span="7">
            <br>
            <el-image
              style="width: 190px; height: 27px"
              :src="logoUrl"
              fit="fill"
              class="headerNav__image"
            ></el-image>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'logo',
  components: {},
  mounted() {},
  data() {
    return {
      logoUrl: `${this.$store.state.ImagesServerURL}img/site/simpleLogo.png`,
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

  .headerNav {
    height: 70px;
  }
</style>
