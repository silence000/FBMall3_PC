<template>
  <div class="containerFluid">
    <div class="container">
      <div class="slideShow" @mouseleave="closeSlideMenu">

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
            <div
              class="slideMenuKey__content"
              v-for="item in slideMenuKey"
              :key="item.id"
              @mouseover="showSlideMenu(item.id)">
              <el-link :underline="false">
                <i class="fa fa-anchor" aria-hidden="true"></i>
                <span v-text="item.name" @click="toCategoryPage(item.id, item.name)"></span>
              </el-link>
            </div>
          </div>

          <div class="slideMenuContent" v-show="displayMenu">
            <div class="slideMenuContent__container">
              <div class="slideMenuContent__item" v-for="item in slideMenuContent" :key="item.id">
                <el-link :underline="false">
                  <span v-text="item.subTitle" @click="toProductPage(item.id)"></span>
                </el-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { pageResProcess } from '../assets/util/ResProcess';

export default {
  name: 'slideShow',
  components: {},
  created() {
    this.$store.dispatch('home/getSlideMenuKey')
      .then((data) => {
        pageResProcess(data);
      });
  },
  mounted() {},
  computed: {
    slideMenuKey() {
      return this.$store.state.home.slideMenuKey;
    },

    slideMenuContent() {
      return this.$store.getters['home/filterSlideMenuContent'];
    },
  },
  watch: {},
  data() {
    return {
      imgUrl: [
        `${this.$store.state.ImagesServerURL}img/lunbo/1.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/2.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/3.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/4.jpg`,
        `${this.$store.state.ImagesServerURL}img/lunbo/5.jpg`,
      ],
      displayMenu: false,
    };
  },
  methods: {
    showSlideMenu(val) {
      this.$store.dispatch('home/getSlideMenuContent', val)
        .then((data) => {
          pageResProcess(data);
          this.displayMenu = true;
        });
    },

    closeSlideMenu() {
      this.displayMenu = false;
    },

    toProductPage(id) {
      this.$router.push({
        path: '/product',
        query: {
          id,
        },
      });
    },

    toCategoryPage(id, title) {
      this.$store.commit('alterPageTitle', title);
      this.$router.push({
        path: '/category',
        query: {
          cid: id,
        },
      });
    },
  },
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
    height: 510px;
    background-color: $color-white;
    overflow: hidden;

    &__container {
      margin: 0 80px;
    }

    &__item {
      height: 60px;
      font-size: 14px;
      color: $color-text-regular;
      line-height: 60px;
      border-bottom: 1px dashed $color-text-placeholder;
    }
  }
</style>
