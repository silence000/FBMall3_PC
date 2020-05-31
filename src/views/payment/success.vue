<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">
        <div class="successDiv">
          <div class="successDiv__Title">
            <span class="successDiv__Title--icon">
              <i class="fa fa-check-circle-o" aria-hidden="true"></i>
            </span>
            <span class="successDiv__Title--text">您已成功付款</span>
          </div>

          <div class="successDiv__Content">
            <div class="successDiv__Content--item">● 收货地址：
              <span v-text="recAddress"></span>
            </div>
            <div class="successDiv__Content--item">● 实付款：
              <span class="successDiv__Content--money" v-text="total"></span>
            </div>
            <div class="successDiv__Content--item">●&nbsp;
              <span v-text="etaTime"></span></div>
            <div class="successDiv__Content--item">
              <span class="successDiv__Content--text">您可以</span>
              <span class="successDiv__Content--linkParent">
                <el-link class="successDiv__Content--link" type="success">查看已买到的宝贝</el-link>
                <el-link class="successDiv__Content--link" type="success">查看交易详情</el-link>
              </span>
            </div>
            <el-divider></el-divider>
            <div class="successDiv__extra">
              <i class="fa fa-info-circle successDiv__extra--icon" aria-hidden="true"></i>
              <span class="successDiv__extra--bold">安全提醒：</span>
              <span class="successDiv__extra--normal">下单后，</span>
              <span class="successDiv__extra--red">用QQ给您发送链接办理退款的都是骗子！</span>
              <span class="successDiv__extra--normal">天猫不存在系统升级，订单异常等问题，谨防假冒客服电话诈骗！</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import { alterMultipleSelection, alterPageTitle } from '../../store/mutationsType';
import TopNav from '../../components/topNav.vue';
import Logo from '../../components/logo.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, Logo, FooterNav,
  },
  mounted() {
    this.$store.commit(`${[alterPageTitle]}`, '订单支付成功');
    if (!this.$store.state.cart.orderId) {
      this.$router.push('/home');
    }
    this.$store.commit(`cart/${[alterMultipleSelection]}`, '');
  },
  data() {
    return {
      recAddress: '测试用的收货地址',
      total: '￥2293.60',
      etaTime: '预计08月08日送达',
    };
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../../assets/scss/constant";
  @import "../../assets/scss/mixins";
  // 变量定义
  $successDiv__title--bgColor: #ECFFDC;
  $successDiv__icon--color: #228800;
  $successDiv__extra--iconColor: #378BE7;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .successDiv {
    border: 1px solid $color-text-placeholder;

    &__Title {
      background-color: $successDiv__title--bgColor;
      height: 60px;
      overflow: hidden;
      padding-left: 30px;

      &--icon {
        font-size: 40px;
        height: 60px;
        display: inline-block;
        float: left;
        color: $successDiv__icon--color;
      }

      &--text {
        display: inline-block;
        float: left;
        font-size: 14px;
        font-weight: 700;
        line-height: 60px;
        margin-left: 15px;
        color: $color-text-primary;
      }
    }

    &__Content {
      padding: 25px 35px;

      &--item {
        font-size: 12px;
        width: 214px;
        color: $color-text-primary;
        margin-bottom: 10px;
      }

      &--money {
        font-size: 14px;
        font-weight: 700;
        color: $color-primary;
      }

      &--linkParent {
        overflow: hidden;
      }

      &--link {
        float: right;
        font-size: 12px;
        margin-left: 5px;
      }
    }

    &__extra {
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;

      span {
        float: left;
      }

      &--icon {
        float: left;
        color: $successDiv__extra--iconColor;
        font-size: 20px;
      }

      &--bold {
        font-weight: 700;
        margin-left: 5px;
      }

      &--red {
        font-weight: 700;
        color: $color-primary;
      }
    }
  }
</style>
