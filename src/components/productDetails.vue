<template>
  <div class="containerFluid">
    <div class="container">

      <div class="imagePreview">
        <div class="imageBig">
          <el-image
            style="width: 358px; height: 358px"
            :src="imageBigUrl"
            fit="fill"
          ></el-image>
        </div>

        <div class="imageSmall">
          <el-image
            style="width: 60px; height: 60px"
            :src="imageBigUrl"
            fit="fill"
          ></el-image>
          <el-image
            style="width: 60px; height: 60px"
            :src="imageBigUrl"
            fit="fill"
          ></el-image>
          <el-image
            style="width: 60px; height: 60px"
            :src="imageBigUrl"
            fit="fill"
          ></el-image>
          <el-image
            style="width: 60px; height: 60px"
            :src="imageBigUrl"
            fit="fill"
          ></el-image>
          <el-image
            style="width: 60px; height: 60px"
            :src="imageBigUrl"
            fit="fill"
          ></el-image>
        </div>
      </div>

      <div class="productInfo">
        <div class="productInfo__title">Changhong/长虹 65S1安卓智能12核65英寸网络平板LED液晶电视机70</div>
        <div class="productInfo__subtitle">屏大影院 高配12核 安卓智能</div>
        <div class="productInfo__priceTitle"><span>聚划算&nbsp;</span>此商品即将参加聚划算！速速抢购！</div>

        <div class="productInfo__priceBlock">
          <div class="productInfo__ticket">全天猫实物商品通用</div>

          <div class="productInfo__oldPrice">
            <span class="productInfo__oldPrice--key">价格</span>
            <span class="productInfo__oldPrice--value">¥ 4499.01</span>
          </div>

          <div class="productInfo__nowPrice">
            <span class="productInfo__nowPrice--key">促销价</span>
            <span class="productInfo__nowPrice--value">
              <span>¥&nbsp;</span>3824.16
            </span>
          </div>
        </div>

        <div class="productInfo__salesBlock">
          <div class="productInfo__sales">销量&nbsp;<span>8846</span></div>
          <div class="productInfo__reviews">累计评价&nbsp;<span>337</span></div>
        </div>

        <div class="productInfo__numberBlock">
          <div class="productInfo__numberTitle">数量</div>
          <el-input-number
            class="productInfo__numberStep"
            v-model="num"
            @change="handleChange"
            size="small"
            :min="1"
            :max="10"
          ></el-input-number>
          <div class="productInfo__stock">库存<span>84</span>件</div>
        </div>

        <div class="productInfo__service">
          <div class="productInfo__service--key">服务承诺</div>
          <div class="productInfo__service--value">正品保证 极速退款 赠运费险 七天无理由退换</div>
        </div>

        <div class="productInfo__ButtonGroup">
          <el-button
            type="primary"
            plain
            class="productInfo__ButtonGroup--plain"
            @click="onClickBuy"
          >立即购买</el-button>
          <el-button type="primary" class="productInfo__ButtonGroup--normal">
            <i class="fa fa-shopping-cart topNavContent__icon" aria-hidden="true"></i> 加入购物车
          </el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'productDetails',
  components: {},
  mounted() {},
  data() {
    return {
      imageBigUrl: `${this.$store.state.ImagesServerURL}img/productSingle/665.jpg`,
      num: '1',
    };
  },
  methods: {
    onClickBuy() {
      console.log('点击了购买');
    },
  },
  computed: {},
  watch: {},
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // 变量定义
  $imageBig__border-color: #F2F2F2;
  $productInfo__subtitle-color: #DD2727;
  $productInfo__priceBlock-bg: #F6F5F5;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
    overflow: hidden;
  }

  .imagePreview {
    width: 400px;
    float: left;

    .imageBig {
      padding: 20px;
      border: 1px solid $imageBig__border-color;
    }

    .imageSmall {
      width: 320px;
      margin: 10px auto;

      .el-image + .el-image {
        margin-left: 2px;
      }

      .el-image {
        border: 1px solid $color-white;

        &:hover {
          border: 1px solid $color-primary;
        }
      }
    }
  }

  .productInfo {
    width: 580px;
    padding: 0 10px;
    float: left;

    &__title {
      font-size: 16px;
      font-weight: 700;
      color: $color-black;
      margin: 0 10px;
    }

    &__subtitle {
      font-size: 12px;
      color: $productInfo__subtitle_color;
      margin: 0 10px;
    }

    &__priceTitle {
      text-align: center;
      font-size: 12px;
      line-height: 42px;
      color: $color-white;
      background-color: $color-primary;
      margin: 10px 0 0 0;

      span {
        font-size: 18px;
        font-weight: 700;
      }
    }

    &__priceBlock {
      background-color: $productInfo__priceBlock-bg;
      padding: 10px;
    }

    &__ticket {
      font-size: 12px;
      color: $color-primary;
      margin-top: 5px;
    }

    &__oldPrice {
      font-size: 12px;
      margin-top: 5px;
      overflow: hidden;

      &--key {
        float: left;
        color: $color-text-secondary;
        width: 68px;
        height: 17px;
      }

      &--value {
        float: left;
        color: $color-text-primary;
        text-decoration-line: line-through;
      }
    }

    &__nowPrice {
      margin-top: 5px;
      overflow: hidden;

      &--key {
        float: left;
        color: $color-text-secondary;
        width: 68px;
        height: 17px;
        font-size: 12px;
        margin-top: 10px;
      }

      &--value {
        float: left;
        color: $color-primary;
        font-size: 30px;

        span {
          font-size: 18px;
        }
      }
    }

    &__salesBlock {
      border-top: 1px dashed $color-info;
      border-bottom: 1px dashed $color-info;
      text-align: center;
      margin: 20px 0;
      padding: 10px;
      font-size: 12px;
    }

    &__sales {
      width: 280px;
      display: inline-block;
      color: $color-info;

      span {
        font-weight: 700;
        color: $color-primary;
      }
    }

    &__reviews {
      width: 279px;
      display: inline-block;
      color: $color-info;
      border-left: 1px dashed $color-info;

      span {
        font-weight: 700;
        color: $color-primary;
      }
    }

    &__numberBlock {
      overflow: hidden;
      color: $color-info;
      font-size: 12px;
      line-height: 32px;
    }

    &__numberTitle {
      float: left;
      margin-right: 10px;
    }

    &__numberStep {
      float: left;
    }

    &__stock {
      float: left;
      margin-left: 10px;
    }

    &__service {
      margin: 20px 0;
      font-size: 12px;
      overflow: hidden;

      &--key {
        float: left;
        color: $color-info;
        margin-right: 10px;
      }

      &--value {
        float: left;
        color: $color-text-primary;
      }
    }

    &__ButtonGroup {
      text-align: center;

      &--plain {
        width: 180px;
      }

      &--normal {
        width: 180px;
        margin-left: 20px;
      }
    }
  }
</style>
