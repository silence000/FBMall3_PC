<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">
        <br>
        <div class="successDiv">
          <span class="successDiv__title--icon">
            <i class="fa fa-check-circle-o" aria-hidden="true"></i>
          </span>
          <span class="successDiv__title--text">交易已经成功，卖家将收到您的货款。</span>
          <p @click="toOrders" class="successDiv__title--link"> 返回我的订单 </p>
        </div>
        <br><br><br><br><br>
      </div>
    </div>

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import { alterPageTitle } from '../../store/mutationsType';
import TopNav from '../../components/topNav.vue';
import Logo from '../../components/logo.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, Logo, FooterNav,
  },
  mounted() {
    this.$store.commit(`${[alterPageTitle]}`, '交易成功');
    // 调整页面位置到页面的最上方
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  computed: {},
  watch: {},
  data() {
    return {};
  },
  methods: {
    toOrders() {
      this.$router.push('/order');
    },
  },
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../../assets/scss/constant";
  @import "../../assets/scss/mixins";
  // 变量定义
  $successDiv__borderColor: #e5e5e5;
  $successDiv__icon--color: #228800;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .successDiv {
    margin: 10px;
    padding: 40px;
    border: 1px solid $successDiv__borderColor;

    &__title--icon {
      font-size: 40px;
      height: 60px;
      display: inline-block;
      float: left;
      color: $successDiv__icon--color;
    }

    &__title--text {
      line-height: 60px;
      margin-left: 20px;
      font-size: 14px;
      font-weight: 700;
      color: $color-text-primary;
    }

    &__title--link {
      font-size: 14px;
      &:hover {
        cursor: pointer;
        color: $color-primary;
      }
    }
  }
</style>
