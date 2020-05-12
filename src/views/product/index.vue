<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>
    <BannerAd></BannerAd>
    <ProductDetails></ProductDetails>
    <ProductExtra></ProductExtra>
  </div>
</template>
<script>
// eslint-disable-next-line import/extensions
import TopNav from '../../components/topNav';
// eslint-disable-next-line import/extensions
import HeaderNav from '../../components/headerNav';
// eslint-disable-next-line import/extensions
import BannerAd from '../../components/bannerAd';
// eslint-disable-next-line import/extensions
import ProductDetails from '../../components/productDetails';
// eslint-disable-next-line import/extensions
import ProductExtra from '../../components/productExtra';

export default {
  components: {
    TopNav, HeaderNav, BannerAd, ProductDetails, ProductExtra,
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style scoped lang="scss"></style>
