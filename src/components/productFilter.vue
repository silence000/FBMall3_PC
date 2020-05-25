<template>
  <div class="containerFluid">
    <div class="container productFilter">

      <el-button-group class="priceButton">
        <el-button size="small" @click="sortProduct('none')">
          综合&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small" @click="sortProduct('popularity')">
          人气&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small" @click="sortProduct('date')">
          新品&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small" @click="sortProduct('sales')">
          销量&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
        <el-button size="small" @click="sortProduct('price')">
          价格&nbsp;<i class="fa fa-arrows-v" aria-hidden="true"></i></el-button>
      </el-button-group>

      <div class="priceLimit">
        <el-input
          size="small"
          class="priceLimit__input"
          v-model="priceLeft"
          placeholder="最低价格"></el-input>
        <span class="priceLimit__divide">~</span>
        <el-input
          size="small"
          class="priceLimit__input"
          v-model="priceRight"
          @change="betweenPrice"
          placeholder="最高价格"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
import { pageResProcess } from '../assets/util/ResProcess';

export default {
  components: {},
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  data() {
    return {
      priceLeft: '',
      priceRight: '',
      sortType: 'none',
    };
  },
  methods: {
    sortProduct(val) {
      this.sortType = val;
      let payload = {};
      // todo 此处代码有待优化
      if (this.$route.query.cid) {
        payload = {
          payloadParam: val,
          cid: this.$route.query.cid,
        };
      }
      if (this.$route.query.name) {
        payload = {
          payloadParam: val,
          name: this.$route.query.name,
        };
      }
      this.$store.dispatch('category/getProductByCategory', payload)
        .then((data) => {
          pageResProcess(data);
        });
    },

    betweenPrice() {
      if (this.priceLeft === '' || this.priceRight === '') {
        // todo 此处应添加正则判断
        this.$message.error('请填写最低和最高价格');
        return;
      }
      // todo 此处代码有待优化
      let payload = {};
      if (this.$route.query.cid) {
        payload = {
          payloadParam: this.sortType,
          cid: this.$route.query.cid,
          lowPrice: this.priceLeft,
          heiPrice: this.priceRight,
        };
      }
      if (this.$route.query.name) {
        payload = {
          payloadParam: this.sortType,
          name: this.$route.query.name,
          lowPrice: this.priceLeft,
          heiPrice: this.priceRight,
        };
      }
      this.$store.dispatch('category/getProductByCategory', payload)
        .then((data) => {
          pageResProcess(data);
        });
    },
  },
};
</script>
<style scoped lang="scss">
  // 导入Scss
  @import "../assets/scss/constant";
  @import "../assets/scss/mixins";
  // Scss样式
  .containerFluid {
    @include containerFluid;
  }

  .container {
    @include container;
  }

  .productFilter {
    height: 35px;
  }

  .priceButton {
    float: left;
  }

  .priceLimit {
    float: left;
    margin-left: 20px;

    &__input {
      width: 100px;
    }

    &__divide {
      display: inline-block;
      width: 30px;
      text-align: center;
    }
  }
</style>
