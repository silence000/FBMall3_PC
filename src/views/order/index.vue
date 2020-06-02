<template>
  <div>
    <TopNav></TopNav>
    <Logo></Logo>

    <div class="containerFluid">
      <div class="container">
        <div class="navMenu">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect">
            <el-menu-item index="1">所有订单</el-menu-item>
            <el-menu-item index="2">待付款</el-menu-item>
            <el-menu-item index="3">待发货</el-menu-item>
            <el-menu-item index="4">待收货</el-menu-item>
            <el-menu-item index="5">待评价</el-menu-item>
          </el-menu>
        </div>

        <br>
        <div class="orderTitle">
          <template>
            <el-table
              :data="null"
              border
              style="width: 100%">
              <el-table-column
                label="宝贝">
              </el-table-column>
              <el-table-column
                label="单价"
                width="100">
              </el-table-column>
              <el-table-column
                label="数量"
                width="55">
              </el-table-column>
              <el-table-column
                label="订单总价（元）"
                width="120">
              </el-table-column>
              <el-table-column
                label="交易操作"
                width="120">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <br>

        <div v-for="tableData in ordersResData" :key="tableData[0].id" v-loading="loadingOrders">
          <div class="orderList">
          <template>
            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              border
              style="width: 100%">
              <el-table-column>
                <template slot="header">
                  <div class="orderList__header">
                    <span class="orderList__header--bold" v-text="tableData[0].createDate"></span>
                    <span class="orderList__header--indent">订单号：</span>
                    <span v-text="tableData[0].orderCode"></span>
                  </div>
                </template>

                <template slot-scope="scope">
                  <div class="orderList__nameParent">
                    <el-image
                      style="width: 80px; height: 80px"
                      class="orderList__image"
                      :src=scope.row.imgUrl
                      fit="fill"
                    ></el-image>
                    <span
                      class="orderList__name"
                      @click="toProductPage(scope.row.id)">{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                width="100">
                <template slot="header">
                  <el-image
                    style="width: 13px; height: 13px"
                    :src="imgUrl"
                    fit="fill"></el-image>
                  <span>&nbsp;天猫商场</span>
                </template>
                <template slot-scope="scope">
                  <span class="orderList__originalPrice">{{ scope.row.originalPrice }}</span>
                  <br>
                  <span class="orderList__promotePrice">{{ scope.row.promotePrice }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="件"
                width="55">
                <template slot-scope="scope">
                  <span class="orderList__number">{{ scope.row.number }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="实付款"
                width="120">
                <template>
                  <div class="orderList__totalParent">
                    <span class="orderList__total" v-text="tableData[0].sumPrice"></span>
                    <br>
                    <span class="orderList__postCost">(含运费：￥ 0.00)</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                width="120">
                <template slot="header">
                  <el-link type="info">删除该订单</el-link>
                </template>
                <template>
                  <span class="orderList__operation" v-text="tableData[0].statusDesc"></span>
                  <br>
                  <div class="orderList__buttonGroup">
                    <el-button
                      type="primary"
                      size="mini"
                      v-if="switchOperateButtons(tableData[0].statusCode, 1)"
                      @click="payment(tableData[0].id, tableData[0].sumPrice)"
                    >付款</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      v-if="switchOperateButtons(tableData[0].statusCode, 2)"
                      @click="pressOrder(tableData[0].id)"
                    >催卖家发货</el-button>
                    <el-button
                      type="success"
                      size="mini"
                      v-if="switchOperateButtons(tableData[0].statusCode, 3)"
                      @click="confirmReceiving(tableData[0].id)"
                    >确认收货</el-button>
                    <el-button
                      size="mini"
                      v-if="switchOperateButtons(tableData[0].statusCode, 4)"
                      @click="commentOrder(tableData[0].id)"
                    >评价</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <br>

            <div class="reviewsSelect" v-loading="loadingTables">
              <el-dialog title="请选择要评价的商品" width="600px" :visible.sync="dialogTableVisible">
                <el-table :data="orderItemData">
                  <el-table-column label="我的宝贝">
                    <template slot-scope="scope">
                      <span
                        class="reviewsSelect__item"
                        @click="toReviewPage(scope.row.id)"
                        v-text="scope.row.name"></span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
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
  alterPageTitle,
  alterOrderId,
  alterLoadingTables,
} from '../../store/mutationsType';
import { pageMuteResProcess } from '../../assets/util/ResProcess';
import TopNav from '../../components/topNav.vue';
import Logo from '../../components/logo.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  inject: ['reload'],
  components: {
    TopNav, Logo, FooterNav,
  },
  created() {
    this.$store.commit(`${[alterPageTitle]}`, '我的订单');
    this.$store.dispatch('orders/getOrders', 0)
      .then((data) => {
        pageMuteResProcess(data, '订单信息获取失败，请重试');
      });
  },
  mounted() {},
  computed: {
    ordersResData() {
      return this.$store.getters['orders/filterOrdersResData'];
    },

    orderItemData() {
      return this.$store.getters['orders/filterOrderItemData'];
    },

    loadingOrders() {
      return this.$store.state.orders.loadingOrders;
    },

    loadingTables() {
      return this.$store.state.orders.loadingTables;
    },
  },
  watch: {},
  data() {
    return {
      imgUrl: `${this.$store.state.ImagesServerURL}img/site/orderItemTmall.png`,
      activeIndex: '1',
      dialogTableVisible: false,
    };
  },
  methods: {
    toReviewPage(id) {
      this.$router.push({
        path: '/review',
        query: {
          id,
        },
      });
    },

    commentOrder(id) {
      sessionStorage.setItem('completeOrderID', id); // 放置即将完成评价的订单号
      this.dialogTableVisible = true;
      this.$store.commit(`orders/${[alterLoadingTables]}`, true);
      this.$store.dispatch('orders/getOneOrder', id)
        .then((data) => {
          pageMuteResProcess(data, '订单信息获取失败，请重试');
          this.$store.commit(`orders/${[alterLoadingTables]}`, false);
        });
    },

    payment(id, sum) {
      sessionStorage.setItem('cost', sum.replace('¥ ', ''));
      this.$store.commit(`cart/${[alterOrderId]}`, id);
      this.$router.push('/payment');
    },

    pressOrder(id) {
      this.$store.dispatch('orders/pressOrder', id)
        .then((data) => {
          pageMuteResProcess(data, '催卖家发货失败，请重试');
          if (data.code) {
            if (data.code === 1) {
              this.reload();
              this.$message.success('卖家已极速发货');
            }
          }
        });
    },

    confirmReceiving(id) {
      this.$router.push({
        path: '/order/confirm',
        query: {
          id,
        },
      });
    },

    handleSelect(key) {
      if (this.activeIndex !== key) {
        this.activeIndex = key;
        if (key === '1') {
          this.$store.dispatch('orders/getOrders', 0)
            .then((data) => {
              pageMuteResProcess(data, '订单信息获取失败，请重试');
            });
        }
        if (key === '2') {
          this.$store.dispatch('orders/getOrders', 1)
            .then((data) => {
              pageMuteResProcess(data, '订单信息获取失败，请重试');
            });
        }
        if (key === '3') {
          this.$store.dispatch('orders/getOrders', 2)
            .then((data) => {
              pageMuteResProcess(data, '订单信息获取失败，请重试');
            });
        }
        if (key === '4') {
          this.$store.dispatch('orders/getOrders', 3)
            .then((data) => {
              pageMuteResProcess(data, '订单信息获取失败，请重试');
            });
        }
        if (key === '5') {
          this.$store.dispatch('orders/getOrders', 4)
            .then((data) => {
              pageMuteResProcess(data, '订单信息获取失败，请重试');
            });
        }
      }
    },

    toProductPage(id) {
      this.$router.push({
        path: '/product',
        query: {
          id,
        },
      });
    },

    switchOperateButtons(status, type) {
      if (status === '1' && type === 1) {
        return true;
      }
      if (status === '2' && type === 2) {
        return true;
      }
      if (status === '3' && type === 3) {
        return true;
      }
      return status === '4' && type === 4;
    },

    objectSpanMethod({ rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
      if (columnIndex === 3 || columnIndex === 4) {
        if (rowIndex === 1) {
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
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .navMenu {
    li {
      font-size: 14px;
      font-weight: 700;
    }
  }

  .orderList {
    border: 2px solid $color-white;

    &:hover {
      border: 2px solid $color-primary;
    }

    &__header {
      font-size: 12px;
      font-weight: 500;

      &--bold {
        font-weight: 700;
        color: $color-text-primary;
      }

      &--indent {
        display: inline-block;
        margin-left: 15px;
      }
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

      &:hover {
        cursor: pointer;
        color: $color-primary;
      }
    }

    &__originalPrice {
      font-size: 14px;
      font-weight: 700;
      color: $color-text-regular;
      text-decoration-line: line-through;
    }

    &__promotePrice {
      font-size: 14px;
      font-weight: 700;
      color: $color-primary;
    }

    &__number {
      font-size: 12px;
    }

    &__totalParent {
      text-align: center;
    }

    &__total {
      font-size: 14px;
      font-weight: 700;
    }

    &__postCost {
      font-size: 12px;
      color: $color-text-secondary;
    }

    &__operation {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }

    &__buttonGroup {
      text-align: center;
    }
  }

  .reviewsSelect {
    &__item {
      &:hover {
        cursor: pointer;
        color: $color-primary;
      }
    }
  }
</style>
