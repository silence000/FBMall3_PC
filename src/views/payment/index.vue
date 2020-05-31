<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">

        <div class="steps--parent">
          <div class="steps">
            <el-steps
              :space="120"
              :active="2"
              align-center
              finish-status="success">
              <el-step title="查看购物车"></el-step>
              <el-step title="拍下商品"></el-step>
              <el-step title="付款到支付宝"></el-step>
              <el-step title="确认收货"></el-step>
              <el-step title="评价"></el-step>
            </el-steps>
          </div>
        </div>

        <div class="payment">
          <div class="payment__title">扫一扫付款（元）</div>
          <div class="payment__money">￥ <span>{{ priceFix(cost) }}</span></div>
          <el-image
            style="width: 195px; height: 256px"
            :src="imgUrl"
            fit="fill"
          ></el-image>
          <br><br>
          <el-button class="payment__button" type="primary" @click="affirmPayment">确认支付</el-button>
        </div>
      </div>
    </div>

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import {
  alterPageTitle,
} from '../../store/mutationsType';
import { pageMuteResProcess } from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';
import TopNav from '../../components/topNav.vue';
import Logo from '../../components/logo.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, Logo, FooterNav,
  },
  created() {
    this.$store.commit(`${[alterPageTitle]}`, '支付订单');
  },
  mounted() {
    if (!this.$store.state.cart.multipleSelection) {
      this.$router.push('/home');
    }
  },
  computed: {
    cost() {
      return sessionStorage.getItem('cost');
    },
  },
  watch: {},
  data() {
    return {
      imgUrl: `${this.$store.state.ImagesServerURL}img/site/alipay2wei.png`,
    };
  },
  methods: {
    priceFix(val) {
      return PriceFix(val);
    },

    affirmPayment() {
      this.$store.dispatch('cart/payOrders', this.$store.state.cart.orderId)
        .then((data) => {
          pageMuteResProcess(data, '订单支付提交失败，请重试');
          if (data.code === 1) {
            this.$router.push('/payment/success');
          }
        });
    },
  },
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../../assets/scss/constant";
  @import "../../assets/scss/mixins";
  // 变量定义
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .steps--parent {
    position: relative;
    height: 57px;
  }

  .steps {
    position: absolute;
    right: 0;
    width: 600px;
    height: 57px;
  }

  .payment {
    text-align: center;
    padding-top: 20px;

    &__title {
      font-size: 12px;
      color: $color-text-regular;
      margin: 10px;
    }

    &__money {
      font-size: 20px;
      font-weight: 700;
      color: $color-primary;
      margin: 10px;
    }

    &__button {
      width: 110px;
    }
  }
</style>
