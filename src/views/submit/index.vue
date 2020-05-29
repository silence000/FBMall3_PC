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
              :active="1"
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

        <div class="recAddress">
          <div class="recAddress__title">输入收货地址</div>
          <div class="recAddress__content">
            <div class="recAddress__item">
              <span class="recAddress__item--tag recAddress__item--tagTop">
                详细地址<span class="recAddress__item--star">*</span>
              </span>
              <el-input
                type="textarea"
                size="small"
                class="recAddress__item--textarea"
                :rows="2"
                placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"
                v-model="recAddress">
              </el-input>
            </div>

            <div class="recAddress__item">
              <span class="recAddress__item--tag">
                邮政编码
              </span>
              <el-input
                class="recAddress__item--input"
                size="small"
                v-model="postcode"
                @change="postcodeRegxVerify"
                placeholder="如果您不清楚邮政区号，请填写000000"></el-input>
            </div>

            <div class="recAddress__item">
              <span class="recAddress__item--tag">
                收货人姓名<span class="recAddress__item--star">*</span>
              </span>
              <el-input
                class="recAddress__item--input"
                size="small"
                v-model="recName"
                placeholder="长度不超过25个字符"></el-input>
            </div>

            <div class="recAddress__item">
              <span class="recAddress__item--tag">
                手机号码<span class="recAddress__item--star">*</span>
              </span>
              <el-input
                class="recAddress__item--input"
                size="small"
                v-model="recPhone"
                @change="phoneRegxVerify"
                placeholder="请输入11位手机号码"></el-input>
            </div>

          </div>
        </div>

        <div class="ordersAffirm">
          <div class="ordersAffirm__title">输入收货地址</div>

          <template>
            <el-table
              :data="multipleSelection"
              :span-method="objectSpanMethod"
              style="width: 100%">
              <el-table-column>
                <template slot="header">
                  <el-image
                    style="width: 15px; height: 15px"
                    :src="smallLogo"
                    fit="fill"
                  ></el-image>
                  <span style="margin-left: 5px">店铺：天猫店铺</span>
                </template>
                <template slot-scope="scope">
                  <div class="ordersAffirm__nameParent">
                    <el-image
                      style="width: 50px; height: 50px"
                      class="ordersAffirm__image"
                      :src=scope.row.imgUrl
                      fit="fill"
                    ></el-image>
                    <span class="ordersAffirm__name">{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="单价"
                width="80">
                <template slot-scope="scope">
                  <span class="ordersAffirm__price">{{ scope.row.promotePrice }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="数量"
                width="55">
                <template slot-scope="scope">
                  <span class="ordersAffirm__number">{{ scope.row.number }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="小计"
                width="80">
                <template slot-scope="scope">
                  <span class="ordersAffirm__total">{{ scope.row.total }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="配送方式"
                width="220">
                <el-radio v-model="radio" label="1" class="ordersAffirm__radioParent">
                  <span class="ordersAffirm__radio">普通配送</span>
                </el-radio>
                <el-select v-model="selectValue" class="ordersAffirm__select" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-table-column>

            </el-table>
          </template>
        </div>

        <div class="remark">
          <div class="remark__content">
            <span class="remark__content--text">给卖家留言：</span>
            <el-input
              class="remark__content--input"
              type="textarea"
              size="mini"
              autosize
              placeholder="请输入要给卖家留言的内容"
              maxlength="200"
              show-word-limit
              v-model="remark">
            </el-input>
          </div>

          <div class="remark__total">
            店铺合计（含运费）：￥&nbsp;<span>{{ priceFix(cost) }}</span>
          </div>
        </div>

        <div class="settlement__parent">
          <div class="settlement">
            <div class="settlement__text">
              实付款：<span class="settlement__money">¥ {{ priceFix(cost) }}</span>
            </div>
            <div>
              <el-button
                class="settlement__button"
                type="primary"
                @click="submitOrder">提交订单</el-button>
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
  alterPageTitle, alterOrderId,
} from '../../store/mutationsType';
import { pageMuteResProcess } from '../../assets/util/ResProcess';
import PriceFix from '../../assets/util/PriceFix';
import RegxVerify from '../../assets/util/RegxVerify';
import TopNav from '../../components/topNav.vue';
import FooterNav from '../../components/footerNav.vue';
import Logo from '../../components/logo.vue';

export default {
  components: {
    TopNav, FooterNav, Logo,
  },
  created() {
    this.$store.commit(`${[alterPageTitle]}`, '确认订单');
  },
  mounted() {
    if (this.$store.state.cart.multipleSelection) {
      this.$router.push('/home');
    }
  },
  computed: {
    multipleSelection() {
      return this.$store.state.cart.multipleSelection;
    },

    cost() {
      return sessionStorage.getItem('cost');
    },
  },
  watch: {},
  data() {
    return {
      recAddress: '', // 收货人详细地址
      postcode: '', // 邮政编码
      recName: '', // 收货人姓名
      recPhone: '', // 收货人手机号码
      remark: '', // 卖家留言
      radio: '1', // 单选框
      selectValue: '1', // 单选框选中的值
      options: [{
        value: '1',
        label: '快递 免邮费',
      }],
      smallLogo: `${this.$store.state.ImagesServerURL}img/site/tmallbuy.png`,
    };
  },
  methods: {
    priceFix(val) {
      return PriceFix(val);
    },

    submitOrder() {
      if (this.recAddress === '' || this.recName === '' || this.recPhone === '') {
        this.$alert('请检查收货地址，收货人姓名或手机号码是否已填写！', '错误', {
          confirmButtonText: '确定',
        });
        return;
      }
      const recInfo = {
        recName: this.recName,
        recPhone: this.recPhone,
        postcode: this.postcode,
        recAddress: this.recAddress,
        remark: this.remark,
        productsId: this.$store.state.cart.selectedProductsId,
      };
      this.$store.dispatch('cart/insertOrder', recInfo)
        .then((data) => {
          // 此处返回订单号并存储进Vuex
          this.$store.commit(`cart/${[alterOrderId]}`, data.data);
          pageMuteResProcess(data, '订单提交失败，请重试');
        });
      if (this.$store.state.cart.orderId) { // 订单提交失败时不做跳转
        this.$router.push('/payment');
      }
    },

    postcodeRegxVerify() {
      if (RegxVerify(this.postcode, 'postcode') === false) {
        this.$alert('请填写正确的邮政编码', '错误', {
          confirmButtonText: '确定',
        });
        this.postcode = '';
      }
    },

    phoneRegxVerify() {
      if (RegxVerify(this.recPhone, 'mobile') === false) {
        this.$alert('请输入正确的手机号码', '错误', {
          confirmButtonText: '确定',
        });
        this.recPhone = '';
      }
    },

    objectSpanMethod({
      rowIndex, columnIndex,
    }) {
      if (columnIndex === 4) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1,
          };
        }
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
      return {
        rowspan: 1,
        colspan: 1,
      };
    },
  },
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../../assets/scss/constant";
  @import "../../assets/scss/mixins";
  // 变量定义
  $remark__bg-color: #F2F2F2;
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

  .recAddress {
    padding: 20px;

    &__title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      color: $color-text-primary;
    }

    &__item {
      margin-bottom: 10px;
      font-size: 12px;
      color: $color-text-primary;

      &--textarea {
        width: 400px;
      }

      &--input {
        width: 250px;
      }

      &--star {
        color: red;
        display: inline-block;
        width: 10px;
        text-align: center;
      }

      &--tag {
        width: 100px;
        display: inline-block;
      }

      &--tagTop {
        margin-bottom: 32px;
      }
    }
  }

  .ordersAffirm {
    padding: 20px 20px 0 20px;

    &__title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      color: $color-text-primary;
    }

    &__nameParent {
      overflow: hidden;
    }

    &__image {
      float: left;
    }

    &__name {
      float: left;
      margin-left: 10px;
      width: 400px;
      font-size: 12px;
    }

    &__price {
      font-size: 12px;
    }

    &__number {
      font-size: 12px;
    }

    &__total {
      font-size: 12px;
      font-weight: 700;
      color: $color-primary;
    }

    &__radioParent {
      margin-right: 5px;
    }

    &__radio {
      font-size: 12px;
    }

    &__select {
      width: 120px;

      .el-input__inner {
        padding-left: 5px !important;
      }
    }
  }

  .remark {
    overflow: hidden;
    margin: 0 20px 20px 20px;
    border-top: 2px solid $color-primary;
    padding: 10px;
    font-size: 12px;
    color: $color-text-regular;
    background-color: $remark__bg-color;

    &__content {
      float: left;
      width: 400px;

      &--text {
        float: left;
        margin-right: 10px;
        line-height: 30px;
      }

      &--input {
        width: 300px;
      }
    }

    &__total {
      float: right;
      line-height: 30px;
    }
  }
  .settlement__parent {
    overflow: hidden;
  }

  .settlement {
    float: right;
    margin-right: 20px;

    &__text {
      margin: 20px;
      font-size: 12px;
      color: $color-text-secondary;
    }

    &__money {
      font-size: 22px;
      font-weight: 700;
      color: $color-primary;
    }

    &__button {
      width: 180px;
      margin-bottom: 20px;
    }
  }
</style>
