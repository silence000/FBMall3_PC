<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">

        <div class="containerFluid">
          <div class="container login">
            <el-image
              class="loginBg"
              :src=loginImageUrl
            ></el-image>

            <div class="loginMain--position"></div>
            <div class="loginMain" v-loading="loading">
              <div class="loginMain__title">账户登录</div>
              <el-input
                class="loginMain__input"
                size="middle"
                placeholder="手机/会员名/邮箱"
                v-model="username">
                <template slot="prepend">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </template>
              </el-input>
              <el-input
                class="loginMain__input"
                size="middle"
                placeholder="密码"
                show-password
                v-model="userpass">
                <template slot="prepend">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </template>
              </el-input>

              <div class="loginMain__note">不要输入真实的天猫账号密码</div>

              <div class="loginExtra">
                <div class="loginExtra__left">
                  <el-link :underline="false" @click="test()">忘记登录密码</el-link>
                </div>
                <div class="loginExtra__right">
                  <el-link :underline="false" @click="jmp('/register')">免费注册</el-link>
                </div>
              </div>
              <div class="loginButton">
                <el-button type="primary" @click="onLogin">登录</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import {
  alterProductPage,
  alterMyOrdersPage,
  alterMyCartPage,
  alterPageTitle,
  alterUsername,
  alterUserpass,
} from '../../store/mutationsType';
import SwitchRouter from '../../assets/util/SwitchRouter';
import TopNav from '../../components/topNav.vue';
import FooterNav from '../../components/footerNav.vue';
import Logo from '../../components/logo.vue';

export default {
  components: {
    TopNav, FooterNav, Logo,
  },
  mounted() {
    this.$store.commit(`${[alterPageTitle]}`, '用户登录');
  },
  data() {
    return {
      loginImageUrl: `${this.$store.state.ImagesServerURL}img/site/6702.png`,
    };
  },
  computed: {
    username: {
      get() {
        return this.$store.state.registerLogin.username;
      },
      set(val) {
        this.$store.commit(`registerLogin/${[alterUsername]}`, val);
      },
    },

    userpass: {
      get() {
        return this.$store.state.registerLogin.userpass;
      },
      set(val) {
        this.$store.commit(`registerLogin/${[alterUserpass]}`, val);
      },
    },

    loading: {
      get() {
        return this.$store.state.registerLogin.loading;
      },
    },
  },
  watch: {},
  methods: {
    test() {
      this.$message('该功能没有做QAQ');
    },

    jmp(val) {
      SwitchRouter(this.$route.path, val);
    },

    onLogin() {
      if (this.username === '' || this.userpass === '') {
        this.$alert('请填写用户名或密码！', '错误', {
          confirmButtonText: '确定',
        });
        return;
      }

      this.$store.dispatch('registerLogin/onLogin')
        .then((data) => {
          if (data === 'success') {
            this.$message.success('登录成功');
            // 判断登录时上下文状态
            // 从商品页跳转
            if (this.$store.state.registerLogin.productPage !== false) {
              setTimeout(() => {
                this.$store.commit(`registerLogin/${[alterProductPage]}`, false); // 初始化标记变量
              }, 500);
              this.$router.push({
                path: '/product',
                query: {
                  id: this.$store.state.registerLogin.productPage,
                },
              });
              return;
            }
            // 从我的订单跳转
            if (this.$store.state.registerLogin.myOrdersPage === true) {
              setTimeout(() => {
                this.$store.commit(`registerLogin/${[alterMyOrdersPage]}`, false); // 初始化标记变量
              }, 500);
              this.$router.push('/order');
              return;
            }
            // 从购物车中跳转
            if (this.$store.state.registerLogin.myCartPage === true) {
              setTimeout(() => {
                this.$store.commit(`registerLogin/${[alterMyCartPage]}`, false); // 初始化标记变量
              }, 500);
              this.$router.push('/cart');
              return;
            }
            // 普通注册成功跳转逻辑
            setTimeout(() => {
              this.$router.push('/home');
            }, 1500);
          } else {
            if (data === 'unauthorized') {
              this.$message.error('登录失败：账号不存在');
              this.username = '';
              this.userpass = '';
            }
            if (data === 'invalid_grant') {
              this.$message.error('登录失败：密码错误');
              this.userpass = '';
            }
            if (data === 'no_response') {
              this.$message.error('登录失败：服务器内部错误或请求超时');
            }
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

  .login {
    position: relative;
    height: 530px;
  }

  .loginBg {
    position: absolute;
    z-index: -1;
  }

  .loginMain {
    background-color: $color-white;
    border-radius: 4px;
    float: right;
    margin: 55px 40px 0 0;
    padding: 60px 25px;
    width: 270px;
    height: 280px;

    &__title {
      font-size: 16px;
      font-weight: 700;
      color: $color-text-primary;
      margin-bottom: 20px;
    }

    &__input {
      margin-bottom: 20px;

      .fa-user {
        font-size: 19px;
        color: $color-text-primary;
      }

      .fa-lock {
        font-size: 21px;
        color: $color-text-primary;
      }
    }

    &__note {
      font-size: 12px;
      color: $color-primary;
    }
  }

  .loginExtra {
    overflow: hidden;
    margin: 10px 0;

    a {
      font-size: 12px;
      color: $color-text-regular;
    }

    &__left {
      float: left;
      display: inline-block;
    }

    &__right {
      float: right;
      display: inline-block;
    }
  }

  .loginButton {
    margin-top: 30px;
    text-align: center;

    button {
      width: 270px;
    }
  }
</style>
