<template>
  <div>
    <TopNav></TopNav>

    <div class="containerFluid">
      <div class="container">
        <div class="headerNav">
          <el-row>
            <el-col :span="7">
              <br>
              <el-image
                style="width: 190px; height: 27px"
                :src="logoUrl"
                fit="fill"
                class="headerNav__image"
              ></el-image>
            </el-col>
          </el-row>
        </div>

        <div class="containerFluid">
          <div class="container login">
            <el-image
              class="loginBg"
              :src="loginImageUrl"
            ></el-image>

            <div class="loginMain--position"></div>
            <div class="loginMain">
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
                  <el-link :underline="false">忘记登录密码</el-link>
                </div>
                <div class="loginExtra__right">
                  <el-link :underline="false">免费注册</el-link>
                </div>
              </div>
              <div class="loginButton">
                <el-button type="primary">登录</el-button>
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
// eslint-disable-next-line import/extensions
import TopNav from '../../components/topNav';
// eslint-disable-next-line import/extensions
import FooterNav from '../../components/footerNav';

export default {
  components: {
    TopNav, FooterNav,
  },
  mounted() {},
  data() {
    return {
      logoUrl: `${this.$store.state.ImagesServerURL}img/site/simpleLogo.png`,
      loginImageUrl: `${this.$store.state.ImagesServerURL}img/site/6702.png`,
      username: '',
      userpass: '',
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
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .headerNav {
    height: 70px;
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
