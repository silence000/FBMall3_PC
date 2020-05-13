<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>

    <div class="containerFluid">
      <div class="container">
        <div class="register">
          <div class="registerTitle">设置会员名</div>

          <div class="registerItem">
            <div class="registerItem__key">登录名</div>
            <el-input
              class="registerItem__value"
              size="small"
              v-model="username"
              placeholder="会员名一旦设置成功，无法修改"
            ></el-input>
          </div>

          <div class="registerTitle">设置登录密码</div>
          <div class="registerItem">
            <div class="registerItem__key">登录密码</div>
            <el-input
              class="registerItem__value"
              size="small"
              v-model="userpass"
              placeholder="设置你的登录密码"
              show-password
            ></el-input>
          </div>
          <div class="registerItem">
            <div class="registerItem__key">密码确认</div>
            <el-input
              class="registerItem__value"
              size="small"
              v-model="userpass2"
              placeholder="请再次输入你的密码"
              show-password
            ></el-input>
          </div>

          <br>
          <div class="buttonGroup">
            <el-button
              class="buttonGroup__button"
              type="primary"
            >提交</el-button>
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
import HeaderNav from '../../components/headerNav';
// eslint-disable-next-line import/extensions
import FooterNav from '../../components/footerNav';

export default {
  components: {
    TopNav, HeaderNav, FooterNav,
  },
  mounted() {},
  data() {
    return {
      username: '',
      userpass: '',
      userpass2: '',
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

  .register {
    width: 300px;
    margin: 20px auto;
    font-size: 12px;
    line-height: 32px;
  }

  .registerTitle {
    font-weight: 700;
    color: $color-text-primary;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .registerItem {
    margin-bottom: 10px;

    &__key {
      display: inline-block;
      width: 80px;
    }

    &__value {
      display: inline-block;
      width: 220px;
    }
  }

  .buttonGroup {
    text-align: center;

    &__button {
      width: 160px;
    }
  }
</style>
