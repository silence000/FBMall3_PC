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
                label="实付款"
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

        <div v-for="tableData in tableDataList" :key="tableData.index">
          <div class="orderList">
          <template>
            <el-table
              :data="tableData"
              :span-method="objectSpanMethod"
              border
              style="width: 100%">
              <el-table-column>
                <template slot="header">
                  订单日期：
                  <span v-text="tableData[0].orderDate"></span>
                  &nbsp;订单号：
                  <span v-text="tableData[0].orderSeries"></span>
                </template>

                <template slot-scope="scope">
                  <div class="orderList__nameParent">
                    <el-image
                      style="width: 50px; height: 50px"
                      class="orderList__image"
                      :src=scope.row.imgUrl
                      fit="fill"
                    ></el-image>
                    <span class="orderList__name">{{ scope.row.name }}</span>
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
                label="元"
                width="120">
                <template slot-scope="scope">
                  <div class="orderList__totalParent">
                    <span class="orderList__total">{{ scope.row.promotePrice }}</span>
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
              </el-table-column>
            </el-table>
          </template>
          <br>
        </div>
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
      imgUrl: `${this.$store.state.ImagesServerURL}img/site/orderItemTmall.png`,
      activeIndex: '1',
      tableDataList: [
        [
          {
            orderDate: '2020-05-16 00:48:08',
            orderSeries: '20200516004808745737',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
        ],
        [
          {
            orderDate: '2020-05-16 00:48:08',
            orderSeries: '20200516004808745737',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
          {
            imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/1928.jpg`,
            name: '雅居汇欧式沙发组合实木雕花客厅高档奢华大户型住宅家具布艺沙发',
            originalPrice: '¥ 1200',
            promotePrice: '¥ 900',
            total: '¥ 2323',
            number: '2',
          },
        ],
      ],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    objectSpanMethod({
      row, column, rowIndex, columnIndex,
    }) {
      console.log(`row: ${row}`);
      console.log(`column: ${column}`);
      console.log(`rowIndex: ${rowIndex}`);
      console.log(`columnIndex: ${columnIndex}`);
      if (rowIndex === 0) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
      if (columnIndex === 2 || columnIndex === 3 || columnIndex === 4) {
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

  .navMenu {
    li {
      font-size: 14px;
      font-weight: 700;
    }
  }

  .orderList {
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
  }
</style>
