<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>
    <BannerAd></BannerAd>
    <ProductFilter></ProductFilter>
    <SortContent></SortContent>
    <FooterNav></FooterNav>
  </div>
</template>
<script>
import TopNav from '../../components/topNav.vue';
import HeaderNav from '../../components/headerNav.vue';
import BannerAd from '../../components/bannerAd.vue';
import ProductFilter from '../../components/productFilter.vue';
import SortContent from '../../components/sortContent.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, HeaderNav, BannerAd, ProductFilter, SortContent, FooterNav,
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
