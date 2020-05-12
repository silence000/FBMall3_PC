<template>
  <div class="containerFluid">
    <div class="container">
      <div class="slideShow">

        <el-carousel :interval="5000" arrow="never" height="510px">
          <el-carousel-item v-for="item in imgUrl" :key="item">
            <el-image
              style="width:1000px; height: 510px"
              :src="item"
              fit="fill"
            ></el-image>
          </el-carousel-item>
        </el-carousel>

        <div class="slideMenu">
          <div class="slideMenuKey">
            <div class="slideMenuKey__content" v-for="item in slideMenuKey" :key="item">
              <el-link :underline="false">
                <i class="fa fa-anchor" aria-hidden="true"></i>
                <span v-text="item"></span>
              </el-link>
            </div>
          </div>
          <div class="slideMenuContent">
<!--            菜单内容-->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'slideShow',
  components: {},
  mounted() {},
  data() {
    return {
      imgUrl: [
        `${this.$store.state.ImagesServerURL}img/lunbo/1.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/2.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/3.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/4.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/5.jpg`,
      ],
      slideMenuKey: [
        '平板电视',
        '马桶',
        '沙发',
        '电热水器',
        '平衡车',
        '扫地机器人',
        '原汁机',
        '冰箱',
        '女表',
        '男表',
        '男士手拿包',
        '男士西装',
        '时尚男鞋',
        '品牌女装',
        '太阳镜',
        '安全座椅',
        '哈哈哈哈',
      ],
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
  // 变量定义
  $slide--background-color: #E8E8E8;
  // Scss样式
  .containerFluid {
    @include containerFluid;
    background-color: $slide--background-color;
  }

  .container {
    @include container;
  }

  .slideShow {
    position: relative;
  }

  .slideMenu {
    left: 0;
    top: 0;
    position: absolute;
    z-index: 1000;
    font-size: 14px;
  }

  .slideMenuKey {
    float: left;
    width: 200px;
    background-color: rgba(0,0,0,0.5);

    a {
      color: $color-white;
      line-height: 30px;
      font-size: 14px;
    }

    &__content {
      height: 30px;
      padding-left: 15px;

      span {
        margin-left: 8px;
      }

      &:hover {
        background-color: $color-white;

        a {
          color: $color-primary;
        }
      }
    }
  }

  .slideMenuContent {
    float: left;
    width: 800px;
    background-color: $color-white;
  }
</style>
