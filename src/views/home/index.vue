<template>
  <div>
    <TopNav></TopNav>
    <HeaderNav></HeaderNav>
    <MenuNav></MenuNav>
    <SlideShow></SlideShow>
    <RecommendList></RecommendList>
    <FooterNav></FooterNav>
  </div>
</template>
<script>
import TopNav from '../../components/topNav.vue';
import HeaderNav from '../../components/headerNav.vue';
import MenuNav from '../../components/menuNav.vue';
import SlideShow from '../../components/slideShow.vue';
import RecommendList from '../../components/recommendList.vue';
import FooterNav from '../../components/footerNav.vue';

export default {
  components: {
    TopNav, HeaderNav, MenuNav, SlideShow, RecommendList, FooterNav,
  },
  mounted() {
    this.$store.commit('alterPageTitle', '瞄~欢迎来到FBMall');
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
