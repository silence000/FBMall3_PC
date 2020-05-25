<template>
  <div class="containerFluid">
    <div class="container">

      <div
        class="recommendList"
        v-for="item in listProductInfo"
        :key="item.categoryId">
        <p v-text="item.name"></p>

        <el-card
          class="recommendContent"
          :body-style="{ padding: '0px' }"
          shadow="hover"
          v-for="itemContent in item.content"
          :key="itemContent.id">
          <div @click="toProductPage(itemContent.id)">
            <el-image
              style="width: 190px; height: 190px"
              :src=itemContent.imgUrl
              fit="fill"
            ></el-image>
            <div class="recommendContent__title" v-text=itemContent.name></div>
            <div
              class="recommendContent__price"
              v-text="itemContent.promotePrice"></div>
          </div>
        </el-card>
      </div>

      <br>
    </div>
  </div>
</template>
<script>
import { pageResProcess } from '../assets/util/ResProcess';

export default {
  name: 'recommendList',
  components: {},
  created() {
    this.$store.dispatch('home/getListProductInfo')
      .then((data) => {
        pageResProcess(data);
      });
  },
  mounted() {},
  methods: {
    toProductPage(id) {
      this.$router.push({
        path: '/product',
        query: {
          id,
        },
      });
    },
  },
  computed: {
    listProductInfo() {
      return this.$store.getters['home/filterListProductInfo'];
    },
  },
  data() {
    return {};
  },
  watch: {},
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // 变量定义
  $recommend--background-color: #F5F5F5;
  $recommend__title-color: #646464;
  $price--color: #FF003A;
  // Scss样式
  .containerFluid {
    @include containerFluid;
    background-color: $recommend--background-color;
  }

  .container {
    @include container;
  }

  .recommendList {
    padding-top: 15px;
    height: 325px;

    p {
      margin: 0;
      padding-left: 15px;
      font-size: 16px;
      font-weight: 700;
      color: $recommend__title-color;
      border-left: 6px solid $color-primary;
    }
  }

  .recommendContent {
    width: 190px;
    float: left;
    margin: 15px 3px 0 3px;
    border: 2px solid $recommend--background-color;

    &:hover {
      cursor: pointer;
      border: 2px solid $color-primary;
    }

    &__title {
      margin: 10px;
      font-size: 12px;
      height: 34px;
      overflow: hidden;
    }

    &__price {
      padding: 0 0 10px 10px;
      font-size: 16px;
      color: $price--color;
    }
  }
</style>
