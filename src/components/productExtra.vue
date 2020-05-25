<template>
  <div class="containerFluid">
    <div class="container">

      <el-row>
        <el-col :span="5">
          <div class="grid-content">
            <div class="shopInfo">
              <div class="shopInfo__title">天猫官方旗舰店</div>
              <div class="shopInfo__subTitle">天猫12年店</div>
              <div class="shopInfo__desc">
                <span>描述</span>
                <span>服务</span>
                <span>物流</span>
              </div>

              <div class="shopInfo__descContent">
                <span>4.8&nbsp;<i class="fa fa-long-arrow-up" aria-hidden="true"></i></span>
                <span>4.8&nbsp;<i class="fa fa-long-arrow-up" aria-hidden="true"></i></span>
                <span>4.8&nbsp;<i class="fa fa-long-arrow-up" aria-hidden="true"></i></span
              ></div>

              <div class="shopInfo__buttonGroup">
                <el-button type="primary" plain size="mini">进店逛逛</el-button>
                <el-button type="primary" size="mini">收藏店铺</el-button>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="19">
          <div class="grid-content">
            <div class="productExtra">
              <el-menu
                :default-active="activeIndex"
                class="productExtra__nav"
                mode="horizontal"
                @select="handleSelect">
                <el-menu-item index="1">商品详情</el-menu-item>
                <el-menu-item index="2">累计评价</el-menu-item>
              </el-menu>

              <div class="productDetails" v-show="productDetails">
                <div class="productDetails__title">产品参数</div>
                <div class="productDetails__content">
                  <span v-for="item in filterProductExtra" :key="item.descKey">
                    <span class="productDetails__item">
                      <span class="productDetails__item--key" v-text="item.descKey"></span>
                      <span class="productDetails__item--value" v-text="item.descValue"></span>
                    </span>
                  </span>
                </div>

                <br>
                <div class="productDetails__images">
                  <div v-for="item in filterImageExtraUrl" :key="item.id">
                    <el-image :src="item.link"></el-image>
                  </div>
                </div>
              </div>

              <div class="productReviews" v-show="productReviews">
                <div v-for="item in filterProductReviews" :key="item.id">
                  <div class="reviewsItem">
                    <div class="reviewsContent">
                      <div class="reviewsContent__main" v-text="item.content"></div>
                      <div class="reviewsContent__datetime" v-text="item.datetime"></div>
                    </div>

                    <div class="reviewsPublisher">
                      <span><span v-text="item.user"></span>（匿名）</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
import { pageResProcess } from '../assets/util/ResProcess';

export default {
  name: 'productExtra',
  components: {},
  created() {
    const that = this;
    // 请求页面数据
    this.$store.dispatch('product/getProductExtra', that.$route.query.id)
      .then((data) => {
        pageResProcess(data);
      });

    this.$store.dispatch('product/getImageExtraUrl', that.$route.query.id)
      .then((data) => {
        pageResProcess(data);
      });

    this.$store.dispatch('product/getProductReviews', that.$route.query.id)
      .then((data) => {
        pageResProcess(data);
      });
  },
  mounted() {},
  computed: {
    filterProductExtra() {
      return this.$store.getters['product/filterProductExtra'];
    },

    filterImageExtraUrl() {
      return this.$store.getters['product/filterImageExtraUrl'];
    },

    filterProductReviews() {
      return this.$store.getters['product/filterProductReviews'];
    },
  },
  watch: {},
  data() {
    return {
      productDetails: true,
      productReviews: false,
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key) {
      if (key === '1') {
        this.activeIndex = '1';
        this.productDetails = true;
        this.productReviews = false;
      }
      if (key === '2') {
        this.activeIndex = '2';
        this.productDetails = false;
        this.productReviews = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // 变量定义
  $shopInfo__title-color: #FAFAFA;
  $shopInfo__border-color: #F2F2F2;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .shopInfo {
    border: 1px solid $shopInfo__border-color;
    font-size: 12px;

    &__title {
      background-color: $shopInfo__title-color;
      border-bottom: 1px solid $shopInfo__border-color;
      color: $color-text-primary;
      font-weight: 700;
      padding: 15px;
    }

    &__subTitle {
      text-align: center;
      font-weight: 700;
      color: $color-text-regular;
      line-height: 40px;
    }

    &__desc {
      text-align: center;
      color: $color-text-secondary;
      line-height: 25px;

      span {
        display: inline-block;
        width: 50px;
      }
    }

    &__descContent {
      text-align: center;
      color: $color-primary;
      line-height: 25px;

      span {
        display: inline-block;
        width: 50px;
      }
    }

    &__buttonGroup {
      margin: 10px 0;
      text-align: center;
    }
  }

  .productExtra {
    margin-left: 10px;

    &__nav {
      border: 1px solid $shopInfo__border-color;
      height: 47px;

      .el-menu-item {
        height: 47px;
        line-height: 47px;
      }

      .is-active {
        height: 47px;
        border: 1px solid $shopInfo__border-color;
        border-bottom: 2px solid $color-primary;
      }
    }
  }

  .productDetails {
    padding: 40px;
    border: 1px solid $shopInfo__border-color;
    border-top: none;
    color: $color-text-secondary;
    font-size: 12px;

    &__title {
      font-weight: 700;
      margin-bottom: 20px;
    }

    &__content {
      border-bottom: 1px solid $shopInfo__border-color;
      padding-bottom: 40px;
    }

    &__item {
      display: inline-block;
      width: 220px;
      padding: 10px 0;

      &--key {
        display: inline-block;
        width: 60px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }

      &--value {
        display: inline-block;
        width: 145px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
  }

  .reviewsItem {
    margin: 10px;
    overflow: hidden;
    border-bottom: 1px solid $shopInfo__border-color;
    font-size: 12px;
    color: $color-text-primary;
  }

  .reviewsContent {
    float: left;
    width: 660px;

    &__main {
      height: 65px;
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__datetime {
      margin: 10px 0;
      color: $color-text-secondary;
    }
  }

  .reviewsPublisher {
    float: left;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
