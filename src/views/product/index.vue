<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>
    <BannerAd></BannerAd>
    <ProductDetails></ProductDetails>
    <ProductExtra></ProductExtra>
    <FooterNav></FooterNav>
  </div>
</template>
<script>
import TopNav from '../../components/topNav.vue';
import HeaderNav from '../../components/headerNav.vue';
import BannerAd from '../../components/bannerAd.vue';
import ProductDetails from '../../components/productDetails.vue';
import ProductExtra from '../../components/productExtra.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, HeaderNav, BannerAd, ProductDetails, ProductExtra, FooterNav,
  },
  mounted() {
    // 调整页面位置到页面的最上方
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style scoped lang="scss"></style>
