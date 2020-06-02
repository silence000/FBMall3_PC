<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">
        <div class="productInfo">
          <div class="productInfo__image">
            <el-image
              style="width: 400px; height: 400px"
              :src="imgUrl"
              fit="fill"
              v-loading="loadingImg"
            ></el-image>
          </div>

          <div class="productInfo__text">
            <div class="productInfo__text--title">
              <span v-text="productInfo.name"></span>
            </div>

            <div class="productInfo__item">
              <span class="productInfo__item--key">价格</span>
              <span class="productInfo__item--price">
                <span v-text="priceFix(productInfo.promotePrice)"></span>
              </span>
              元
            </div>

            <div class="productInfo__item">
              <span class="productInfo__item--key">配送</span>
              <span class="productInfo__item--post">快递 0.00</span>
            </div>

            <div class="productInfo__item">
              <span class="productInfo__item--key">月销量</span>
              <span class="productInfo__item--sales">
                <span v-text="productInfo.sales"></span>
              </span>
              件
            </div>
          </div>
        </div>

        <br>
        <el-row>
          <el-col :span="5">
            <div class="grid-content">
              <div class="shopInfo">
                <div class="shopInfo__title">天猫官方旗舰店</div>
                <div class="shopInfo__subTitle">天猫12年店</div>
                <div class="shopInfo__desc">
                  <span>描述</span>
                  <span>服务</span>
                  <span>物流</span
                  ></div>

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
                  <el-menu-item index="1" :disabled="disableMenu">我的评价</el-menu-item>
                  <el-menu-item index="2">累计评价</el-menu-item>
                </el-menu>

                <div class="myReviews" v-show="myReviews">
                  <div class="myReviews__title">其他买家，需要你的建议哦！</div>
                  <el-input
                    type="textarea"
                    class="myReviews__input"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="review">
                  </el-input>
                  <el-button
                    class="myReviews__button"
                    size="medium"
                    type="primary"
                    @click="submitReview"
                  >提交评价</el-button>
                </div>

                <div class="productReviews" v-show="productReviews">
                  <div v-for="item in productReviewsData" :key="item.id">
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

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import {
  alterPageTitle, alterLoadingImg,
} from '../../store/mutationsType';
import { pageResProcess, pageNoticeResProcess, pageMuteResProcess } from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';
import TopNav from '../../components/topNav.vue';
import Logo from '../../components/logo.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, Logo, FooterNav,
  },
  created() {
    sessionStorage.setItem('showEditReview', false);
    this.$store.commit(`${[alterPageTitle]}`, '评价商品');
    // 判断用户是否登录
    if (!this.$store.state.username) {
      this.$router.push('/login');
      return;
    }
    // 调整页面位置到页面的最上方
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // 请求数据
    this.$store.dispatch('review/getProductInfo', this.$route.query.id)
      .then((data) => {
        pageResProcess(data);
      });

    this.$store.dispatch('review/getProductReviews', this.$route.query.id)
      .then((data) => {
        pageResProcess(data);
      });

    this.$store.dispatch('review/getProductImgUrl', this.$route.query.id)
      .then((data) => {
        pageResProcess(data);
      });
  },
  mounted() {
    setTimeout(() => { // todo 此处使用watch属性更好
      this.imgUrl = this.productImgUrl.link;
      this.$store.commit(`review/${[alterLoadingImg]}`, false);
    }, 200);
    if (this.disableMenu === true) {
      this.activeIndex = '2';
      this.myReviews = false;
      this.productReviews = true;
    }
  },
  computed: {
    loadingImg() {
      return this.$store.state.review.loadingImg;
    },

    productInfo() {
      return this.$store.state.review.productInfo;
    },

    productReviewsData() {
      return this.$store.getters['review/filterProductReviews'];
    },

    productImgUrl() {
      return this.$store.getters['review/filterProductImgUrl'];
    },
  },
  watch: {},
  data() {
    return {
      imgUrl: '',
      myReviews: true,
      productReviews: false,
      activeIndex: '1',
      review: '',
      // eslint-disable-next-line no-eval
      disableMenu: eval(sessionStorage.getItem('showEditReview')),
    };
  },
  methods: {
    submitReview() {
      const payload = {
        id: this.$route.query.id,
        review: this.review,
      };

      this.$store.dispatch('review/insertReview', payload)
        .then((data) => {
          pageNoticeResProcess(data, this.$route.query.id, '添加评论成功', '添加评论失败，请重试');
          if (data.code) {
            if (data.code === 1) {
              this.$store.dispatch('review/getProductReviews', this.$route.query.id) // 重新请求数据
                .then((data2) => {
                  pageResProcess(data2);
                });
              sessionStorage.setItem('showEditReview', true);
              sessionStorage.setItem('completeOrderIDOK', 1); // 确认订单已评价
              this.disableMenu = true;
              this.activeIndex = '2';
              this.myReviews = false;
              this.productReviews = true;
            }
          }
        });
      if (sessionStorage.getItem('completeOrderIDOK') === '1') {
        this.$store.dispatch('review/completeOrder', sessionStorage.getItem('completeOrderID'))
          .then((data) => {
            pageMuteResProcess(data, '订单评论失败！');
          });
      }
    },

    priceFix(val) {
      return PriceFix(val);
    },

    handleSelect(key) {
      if (key === '1') {
        this.activeIndex = '1';
        this.myReviews = true;
        this.productReviews = false;
      }
      if (key === '2') {
        this.activeIndex = '2';
        this.myReviews = false;
        this.productReviews = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../../assets/scss/constant";
  @import "../../assets/scss/mixins";
  // 变量定义
  $productInfo__borderColor: #e7e7e7;
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

  .productInfo {
    overflow: hidden;
    border: 1px solid $productInfo__borderColor;
    padding: 20px;

    &__image {
      float: left;
    }

    &__text {
      float: left;
      height: 360px;
      margin-left: 20px;
      padding: 20px;
      border-left: 1px solid $productInfo__borderColor;

      &--title {
        font-size: 16px;
        font-weight: 700;
        color: $color-text-primary;
        margin-bottom: 20px;
      }
    }

    &__item {
      margin-bottom: 10px;
      font-size: 12px;
      color: $color-text-secondary;

      &--key {
        display: inline-block;
        width: 75px;
      }

      &--price {
        font-size: 20px;
        font-weight: 700;
        color: $color-primary;
      }

      &--sales {
        font-size: 14px;
        font-weight: 700;
        color: $color-primary;
      }
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

  .myReviews {
    background-color: $shopInfo__title-color;

    &__title {
      font-size: 16px;
      font-weight: 700;
      color: $color-text-primary;
      padding: 20px;
    }

    &__input {
      width: 420px;
      margin-left: 20px;
      display: block;
    }

    &__button {
      margin: 20px;
    }
  }
</style>
