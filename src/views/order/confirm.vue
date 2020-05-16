<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">
        <div class="steps">
          <el-steps
            :space="200"
            :active="3"
            align-center
            finish-status="success">
            <el-step title="拍下商品" description="2020-05-15 10:41:04"></el-step>
            <el-step title="付款到支付宝" description="2020-05-15 10:41:04"></el-step>
            <el-step title="卖家发货"  description="2020-05-15 10:41:04"></el-step>
            <el-step title="确认收货"></el-step>
            <el-step title="评价"></el-step>
          </el-steps>
        </div>

        <div class="confirmOrder">
          <div class="confirmOrder__title">我已收到货，同意支付宝付款</div>
          <div class="confirmOrder__subTitle">订单信息</div>

          <template>
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
              label="宝贝">
                <template slot-scope="scope">
                  <div class="confirmOrder__nameParent">
                    <el-image
                      style="width: 50px; height: 50px"
                      class="confirmOrder__image"
                      :src=scope.row.imgUrl
                      fit="fill"
                    ></el-image>
                    <span class="confirmOrder__name">{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                label="单价"
                width="80">
                <template slot-scope="scope">
                  <span class="confirmOrder__price">{{ scope.row.price }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="数量"
                width="55">
                <template slot-scope="scope">
                  <span class="confirmOrder__number">{{ scope.row.number }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="小计"
                width="100">
                <template slot-scope="scope">
                  <span class="confirmOrder__total">{{ scope.row.total }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="运费"
                width="100">
                <div class="confirmOrder__postCost">快递：0.00</div>
              </el-table-column>

            </el-table>
          </template>

          <div class="confirmOrder__payMoney">
            实付款：<span class="confirmOrder__payMoney--number" v-text="payMoney"></span>
          </div>
        </div>

        <div class="orderInfo">
          <div class="orderInfo__item">
            <span class="orderInfo__item--key">订单编号：</span>
            <span class="orderInfo__item--value" v-text="orderSeries"></span>
          </div>
          <div class="orderInfo__item">
            <span class="orderInfo__item--key">卖家昵称：</span>
            <span class="orderInfo__item--value">天猫店铺</span>
          </div>
          <div class="orderInfo__item">
            <span class="orderInfo__item--key">收货地址：</span>
            <span class="orderInfo__item--value">
              <span v-text="recAddress"></span>，
              <span v-text="recName"></span>，
              <span v-text="recPhone"></span>，
              <span v-text="recPostcode"></span>，
            </span>
          </div>
          <div class="orderInfo__item">
            <span class="orderInfo__item--key">成交时间：</span>
            <span class="orderInfo__item--value" v-text="orderDatetime"></span>
          </div>
        </div>

        <div class="orderConfirm">
          <div class="orderConfirm__title">请收到货后，再确认收货！否则您可能钱货两空！</div>
          <el-button type="primary">确认收货</el-button>
        </div>
      </div>
    </div>

    <FooterNav></FooterNav>
  </div>
</template>
<script>
import TopNav from '../../components/topNav.vue';
import Logo from '../../components/logo.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, Logo, FooterNav,
  },
  mounted() {},
  data() {
    return {
      payMoney: '¥2293,60',
      orderDatetime: '2020-05-16 17:17:30',
      orderSeries: '202005161717302198358',
      recAddress: '测试地址',
      recName: '张三',
      recPhone: '12312341234',
      recPostcode: '123456',
      tableData: [
        {
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
          name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
          price: '¥ 900',
          number: '1',
          total: '¥ 900',
        },
        {
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
          name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
          price: '¥ 900',
          number: '1',
          total: '¥ 900',
        },
        {
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
          name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
          price: '¥ 900',
          number: '1',
          total: '¥ 900',
        },
        {
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
          name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
          price: '¥ 900',
          number: '1',
          total: '¥ 900',
        },
      ],
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
  $confirmOrder__title--borderColor: #E8F2FF;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .confirmOrder {
    &__title {
      font-size: 16px;
      font-weight: 700;
      color: $color-text-primary;
      padding: 30px 0 15px 0;
      border-bottom: 2px solid $confirmOrder__title--borderColor;
    }

    &__subTitle {
      font-size: 14px;
      margin: 20px 5px 10px 10px;
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

    &__total {
      font-size: 18px;
    }

    &__number {
      font-size: 12px;
    }

    &__postCost {
      font-size: 12px;
    }

    &__payMoney {
      text-align: right;
      font-size: 14px;
      padding: 20px 0;
      border-bottom: 2px solid $confirmOrder__title--borderColor;

      &--number {
        color: $color-primary;
      }
    }
  }

  .orderInfo {
    margin: 20px 10px;
    font-size: 14px;
    color: $color-text-primary;

    &__item {
      margin-bottom: 10px;

      &--key {
        width: 180px;
        display: inline-block;
      }
    }
  }

  .orderConfirm {
    border: 2px solid $color-primary;
    padding: 15px 60px;

    &__title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
      color: $color-primary;
    }
  }
</style>
