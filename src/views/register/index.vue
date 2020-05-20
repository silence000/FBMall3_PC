<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>

    <div class="containerFluid">
      <div class="container">
        <div class="register" v-loading="loading">
          <div class="registerTitle">设置会员名</div>

          <div class="registerItem">
            <div class="registerItem__key">登录名</div>
            <el-tooltip class="item" effect="light" content="4-16位字母包括数字，汉字，下划线" placement="right">
              <el-input
                class="registerItem__value"
                size="small"
                v-model="username"
                placeholder="会员名一旦设置成功，无法修改"
                @change="usernameRegVerify"
              ></el-input>
            </el-tooltip>
          </div>

          <div class="registerTitle">设置登录密码</div>
          <div class="registerItem">
            <div class="registerItem__key">登录密码</div>
            <el-tooltip
              class="item" effect="light" content="以字母开头，长度在6~18之间，只能包含字符、数字和下划线" placement="right">
              <el-input
                class="registerItem__value"
                size="small"
                v-model="userpass"
                placeholder="设置你的登录密码"
                show-password
                @change="passwordRegVerify"
              ></el-input>
            </el-tooltip>
          </div>
          <div class="registerItem">
            <div class="registerItem__key">密码确认</div>
            <el-input
              class="registerItem__value"
              size="small"
              v-model="userpass2"
              placeholder="请再次输入你的密码"
              show-password
              @change="password2Verify"
            ></el-input>
          </div>

          <br>
          <div class="buttonGroup">
            <el-button
              class="buttonGroup__button"
              type="primary"
              @click="onSubmit"
            >提交</el-button>
          </div>
        </div>
      </div>
    </div>

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import RegxVerify from '../../assets/js/RegxVerify';
import TopNav from '../../components/topNav.vue';
import HeaderNav from '../../components/headerNav.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, HeaderNav, FooterNav,
  },
  mounted() {},
  data() {
    return {};
  },
  computed: {
    username: {
      get() {
        return this.$store.state.registerLogin.username;
      },
      set(val) {
        this.$store.commit('registerLogin/alterUsername', val);
      },
    },

    userpass: {
      get() {
        return this.$store.state.registerLogin.userpass;
      },
      set(val) {
        this.$store.commit('registerLogin/alterUserpass', val);
      },
    },

    userpass2: {
      get() {
        return this.$store.state.registerLogin.userpass2;
      },
      set(val) {
        this.$store.commit('registerLogin/alterUserpass2', val);
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

    onSubmit() {
      if (this.username === '' || this.userpass === '' || this.userpass2 === '') {
        this.$alert('请填写用户名或密码！', '错误', {
          confirmButtonText: '确定',
        });
        return;
      }

      this.$store.dispatch('registerLogin/onSubmit')
        .then((data) => {
          if (typeof (data) !== 'undefined') {
            if (data.code === 1) {
              this.$message.success(`${data.msg}`);
              setTimeout(() => {
                this.$router.push('/login');
              }, 1500);
            } else {
              this.username = '';
              this.$message.error(`注册失败：${data.msg}`);
            }
          } else {
            this.$message.error('注册失败：服务器内部错误或请求超时');
          }
        });
    },

    commit(val) { // 保留方法
      if (this.username !== '') {
        if (this.userpass !== '') {
          if (this.userpass2 !== '') {
            this.$store.dispatch('registerLogin/submit', val);
          }
        }
      }
      this.$alert('请填写用户名或密码！', '错误', {
        confirmButtonText: '确定',
      });
    },

    usernameRegVerify() {
      if (RegxVerify(this.username, 'username') === false) {
        this.$alert('请设置正确的登录名：4-16位字母包括数字，汉字，下划线', '错误', {
          confirmButtonText: '确定',
        });
        this.username = '';
      }
    },

    passwordRegVerify() {
      if (RegxVerify(this.userpass, 'password') === false) {
        this.$alert('请设置正确的密码：以字母开头，长度在6~18之间，只能包含字符、数字和下划线', '错误', {
          confirmButtonText: '确定',
        });
        this.userpass = '';
      }
    },

    password2Verify() {
      if (this.userpass !== this.userpass2) {
        this.$alert('两次输入的密码不一致！', '警告', {
          confirmButtonText: '确定',
        });
        this.userpass = '';
        this.userpass2 = '';
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
