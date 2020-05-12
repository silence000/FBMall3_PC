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
// eslint-disable-next-line import/extensions
import TopNav from '../../components/topNav';
// eslint-disable-next-line import/extensions
import HeaderNav from '../../components/headerNav';
// eslint-disable-next-line import/extensions
import BannerAd from '../../components/bannerAd';
// eslint-disable-next-line import/extensions
import ProductFilter from '../../components/productFilter';
// eslint-disable-next-line import/extensions
import SortContent from '../../components/sortContent';
// eslint-disable-next-line import/extensions
import FooterNav from '../../components/footerNav';

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
