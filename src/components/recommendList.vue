<template>
  <div class="containerFluid">
    <div class="container">

      <div class="recommendList">
        <p v-text="listTitle[0]"></p>
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

      <div class="recommendList">
        <p v-text="listTitle[1]"></p>
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

      <div class="recommendList">
        <p v-text="listTitle[2]"></p>
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
  name: 'recommendList',
  components: {},
  mounted() {},
  data() {
    return {
      listTitle: [
        '平板电视',
        '马桶',
        '沙发',
        '电热水器',
        '平衡车',
        '扫地机器人',
        '原汁机',
        '空调',
        '女表',
        '男表',
        '男士手拿包',
        '男士西服',
        '时尚男鞋',
        '太阳镜',
        '安全座椅',
      ],
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
