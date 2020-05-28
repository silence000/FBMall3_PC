<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>

    <div class="containerFluid">
      <div class="container">
        <div class="cart">
          <el-table
            ref="multipleTable"
            :data="cartLocalData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">

            <el-table-column
              type="selection"
              width="40">
            </el-table-column>

            <el-table-column
              prop="imgUrl"
              label="商品预览"
              width="105">
              <template slot-scope="scope">
                <el-image
                  style="width: 80px; height: 80px"
                  :src=scope.row.imgUrl
                  fit="fill"
                ></el-image>
              </template>
            </el-table-column>

            <el-table-column
              label="商品信息">
              <template slot-scope="scope">
                <span class="cart__productName">{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="单价"
              width="100">
              <template slot-scope="scope">
                <span class="cart__originalPrice">{{ scope.row.originalPrice }}</span>
                <br>
                <span class="cart__promotePrice">{{ scope.row.promotePrice }}</span>
              </template>
            </el-table-column>

            <el-table-column
              width="132"
              label="数量">
              <template slot-scope="scope">
                <el-input-number
                  size="small"
                  v-model="scope.row.number"
                  class="cart__number"
                  @change="handleStep(scope.row.id, $event)"
                ></el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              label="金额"
              width="120">
              <template slot-scope="scope">
                <span class="cart__total">{{ scope.row.total }}</span>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, cartLocalData, scope.row.id)"
                  type="text"
                  size="small">
                  <span class="cart__operate">删除</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="cart__buttonGroup">
            <!-- todo -->
            <el-button
              class="cart__buttonGroup--left"
              size="small"
              type="primary"
              plain
              @click="toggleSelection([cartData[1], cartData[2]])"
            >全选</el-button>
            <el-button
              class="cart__buttonGroup--left"
              size="small"
              @click="toggleSelection()"
            >取消选择</el-button>

            <div class="cart__buttonInfo">
              已选商品
              <span class="cart__buttonInfo--number">0</span>&nbsp;件 合计（不含运费）
              <span class="cart__buttonInfo--total">¥ 0.00</span>
              <el-button
                type="primary"
                class="cart__buttonInfo--button">结&nbsp;算</el-button>
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
  alterPageTitle, alterMyCartPage, alterCartLocalData,
} from '../../store/mutationsType';
import { pageMuteResProcess } from '../../assets/util/ResProcess';
import TopNav from '../../components/topNav.vue';
import HeaderNav from '../../components/headerNav.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, HeaderNav, FooterNav,
  },
  mounted() {
    this.$store.commit(`${[alterPageTitle]}`, '购物车');
    // 判断用户是否登录
    if (!this.$store.state.username) {
      this.$store.commit(`registerLogin/${[alterMyCartPage]}`, true);
      this.$router.push('/login');
      return;
    }
    this.$store.dispatch('cart/getProductInCart')
      .then((data) => {
        this.$store.commit(`cart/${[alterCartLocalData]}`, this.cartResData);
        pageMuteResProcess(data, '购物车加载失败，请重试');
      });
  },
  computed: {
    cartResData() {
      return this.$store.getters['cart/filterCartResData'];
    },

    cartLocalData: {
      get() {
        return this.$store.state.cart.cartLocalData;
      },
      set(val) {
        this.$store.commit(`cart/${[alterCartLocalData]}`, val);
      },
    },
  },
  watch: {},
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    handleStep(id, currentValue) {
      const param = {
        pid: id,
        num: currentValue,
      };
      this.$store.dispatch('cart/updateProductInCart', param)
        .then((data) => {
          pageMuteResProcess(data, '商品数量修改失败，请重试');
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    deleteRow(index, rows, id) {
      rows.splice(index, 1);
      this.$store.dispatch('cart/deleteProductInCart', id)
        .then((data) => {
          pageMuteResProcess(data, '商品删除失败，请重试');
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
  $cart__buttonGroup--color: #E5E5E5;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .cart {
    &__productName {
      font-size: 12px;
      color: $color-text-primary;
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
      width: 110px;
    }

    &__total {
      font-size: 14px;
      font-weight: 700;
      color: $color-primary;
    }

    &__operate {
      color: $color-text-regular;
    }

    &__buttonGroup {
      margin-top: 20px;
      background-color: $cart__buttonGroup--color;

      &--left {
        margin: 10px 0 10px 10px;
      }
    }

    &__buttonInfo {
      float: right;
      font-size: 12px;
      line-height: 52px;
      color: $color-text-primary;

      &--number {
        font-size: 16px;
        font-weight: 700;
        color: $color-primary;
      }

      &--total {
        font-size: 20px;
        font-weight: 700;
        color: $color-primary;
      }

      &--button {
        height: 52px;
        width: 120px;
        margin-left: 10px;
        border: none;
        font-size: 20px;
      }
    }
  }
</style>
