<template>
  <div class="containerFluid">
    <div class="container">

      <div class="topNav">
        <div class="topNavContent topNavContent--left">
          <el-link :underline="false" @click="jmp('/main')">
            <i class="fa fa-home topNavContent__icon" aria-hidden="true"></i> 商城首页
          </el-link>
          <el-link
            :underline="false"
            @click="clear"
            class="topNavContent__text--disable">喵，欢迎来到FBMall</el-link>
          <el-link :underline="false" @click="jmp('/login')" v-text="username"></el-link>
          <el-link :underline="false" @click="jmp('/register')">免费注册</el-link>
        </div>

        <div class="topNavContent topNavContent--right">
          <el-link :underline="false" @click="jmp('/order')">我的订单</el-link>
          <el-link :underline="false" @click="jmp('/cart')">
            <i class="fa fa-shopping-cart topNavContent__icon" aria-hidden="true"></i> 购物车0件
          </el-link>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import SwitchRouter from '../assets/js/SwitchRouter';

export default {
  name: 'topNav',
  components: {},
  mounted() {
  },
  data() {
    return {};
  },
  methods: {
    jmp(val) {
      SwitchRouter(this.$route.path, val);
    },

    clear() {
      this.$store.commit('alterUsername', '');
      sessionStorage.clear();
      this.jmp('/login');
    },
  },
  computed: {
    username: {
      get() {
        const data = this.$store.state.username;
        if (!data && typeof (data) !== 'undefined' && data !== 0 && data !== '0') return '请登录';
        return data;
      },
    },
  },
  watch: {},
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // 变量定义
  $top--background-color: #F2F2F2;
  // Scss样式
  .containerFluid {
    @include containerFluid;
    background-color: $top--background-color;

    .container {
      @include container;

      .topNav {
        position: relative;
        height: 27px;
      }

      .topNavContent {
        a {
          font-size: 12px;
          line-height: 27px;
          color: $color-text-secondary;

          &:hover {
            color: $color-primary;
            text-decoration: none !important;
          }
        }

        a + a {
          margin-left: 20px;
        }

        &__icon {
          color: $color-primary;
          font-size: 14px;
        }

        &__text--disable {
          &:hover {
            color: $color-text-secondary !important;
            cursor: default;
          }
        }

        &--left {
          left: 0;
          position: absolute;
        }

        &--right {
          right: 0;
          position: absolute;
        }
      }

    }
  }
</style>
