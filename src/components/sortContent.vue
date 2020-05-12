<template>
  <div class="containerFluid">
    <div class="container">
      <div class="recommendList">
        <el-card
          class="recommendContent"
          :body-style="{ padding: '0px' }"
          shadow="hover"
          v-for="item in list1ProductInfo"
          :key="item.id"
        >
          <el-image
            style="width: 190px; height: 190px"
            :src=item.imgUrl
            fit="fill"
          ></el-image>
          <div class="recommendContent__title" v-text=item.title></div>
          <div class="recommendContent__price" v-text="item.price"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sortContent',
  components: {},
  mounted() {},
  data() {
    return {
      list1ProductInfo: [
        {
          id: '1',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
        },
        {
          id: '2',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
        },
        {
          id: '3',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
        },
        {
          id: '4',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
        },
        {
          id: '5',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
        },
        {
          id: '6',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
        },
        {
          id: '7',
          imgUrl: `${this.$store.state.ImagesServerURL}img/productSingle_middle/9.jpg`,
          title: '[热销]夏普屏PANDA/熊猫LE39D71S',
          price: '¥ 1234.56',
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
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // 变量定义
  $recommend__title-color: #646464;
  $price--color: #FF003A;
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .recommendList {
    overflow: hidden;

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
    margin: 15px 4px 0 4px;

    &__title {
      padding: 10px;
      font-size: 12px;
    }

    &__price {
      padding: 0 0 10px 10px;
      font-size: 16px;
      color: $price--color;
    }
  }
</style>
