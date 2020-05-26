<template>
  <div class="containerFluid">
    <div class="container">

      <div class="headerNav">
        <el-row>
          <el-col :span="7">
            <el-image
              style="width: 290px; height: 130px"
              :src="imgUrl"
              fit="fill"
              class="headerNav__image"
            ></el-image>
          </el-col>

          <el-col :span="17" class="headerNavSearch">
            <el-input
              v-model="searchContent"
              placeholder="时尚男鞋, 太阳镜"
              class="headerNavSearch__input"
            >
              <el-button slot="append" @click="searchProduct">搜 索</el-button>
            </el-input>

            <div class="recommendsNavSearch">
              <div
                v-for="item in recommends"
                :key="item.id"
                class="headerNavSearch__recommends"
                @click="toCategoryPage(item.id, item.name)">
                <el-link
                  :underline="false"
                  v-text="item.name">
                </el-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>
<script>
import { alterPageTitle } from '../store/mutationsType';
import { pageResProcess } from '../assets/util/ResProcess';

export default {
  inject: ['reload'],
  name: 'headerNav',
  components: {},
  created() {
    this.$store.dispatch('home/getRecommends')
      .then((data) => {
        pageResProcess(data);
      });
  },
  mounted() {},
  data() {
    return {
      imgUrl: `${this.$store.state.ImagesServerURL}img/site/logo.gif`,
      searchContent: '',
    };
  },
  computed: {
    recommends() {
      return this.$store.state.home.recommends;
    },
  },
  watch: {},
  methods: {
    searchProduct() {
      this.$store.commit(`${[alterPageTitle]}`, this.searchContent);
      if (this.$route.path !== '/search') {
        this.$router.push({
          path: '/search',
          query: {
            name: this.searchContent,
          },
        });
      } else {
        this.$route.query.name = this.searchContent;
        this.reload();
      }
    },

    toCategoryPage(id, title) {
      this.$store.commit(`${[alterPageTitle]}`, title);
      if (this.$route.path !== '/category') {
        this.$router.push({
          path: '/category',
          query: {
            cid: id,
          },
        });
      } else {
        // todo 浏览器地址栏地址不会随之修改
        this.$route.query.cid = id;
        this.reload();
      }
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

  .headerNav {
    height: 135px;

    &__image {
      left: -38px;
    }
  }

  .headerNavSearch {
    $input-width: 600px;
    $margin-left: (708px - $input-width)/2 - 50px;
    $margin-right: 708px - $margin-left - $input-width;

    &__input {
      margin: 50px $margin-right 5px $margin-left;
      width: $input-width;
      border: 2px solid $color-primary;
      border-right: none;
      border-radius: 4px;

      .el-button {
        width: 100px;
        font-size: 18px;
        font-weight: 700;
        color: $color-white;
        background-color: $color-primary;
      }
    }

    &__recommends {
      display: inline-block;

      a {
        color: $color-text-secondary;

        &:hover {
          color: $color-primary;;
        }
      }
    }

    &__recommends + .headerNavSearch__recommends {
      margin-left: 10px;
    }

    .recommendsNavSearch {
      margin-left: $margin-left;
    }
  }
</style>
