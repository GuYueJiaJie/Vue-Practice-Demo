<template>
  <div>
    <!-- <transition :name="transitionName"> -->
    <router-view></router-view>
    <!-- </transition> -->
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      @click="clickHandler"
      @change="changeHandler"
      class="bottom-bar"
    ></cube-tab-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-left",
      selectedLabelDefault: "首页",
      tabs: [
        {
          label: "首页",
          icon: "cubeic-home"
        },
        {
          label: "分类",
          icon: "cubeic-tag"
        },
        {
          label: "搜索",
          icon: "cubeic-search"
        },
        {
          label: "购物车",
          icon: "cubeic-mall"
        },
        {
          label: "我的",
          icon: "cubeic-person"
        }
      ]
    };
  },
  methods: {
    // 点击某个tab时
    clickHandler(label) {},
    // 点击与当前不同tab时
    changeHandler(label) {
      switch (label) {
        case "首页":
          this.$router.push({ path: "/bottombar/index" });
          break;
        case "分类":
          this.$router.push({ path: "/bottombar/classify" });
          break;
        case "搜索":
          this.$router.push({ path: "/bottombar/search" });
          break;
        case "购物车":
          this.$router.push({ path: "/bottombar/cart" });
          break;
        case "我的":
          this.$router.push({ path: "/bottombar/mine" });
          break;
      }
    }
  },
  created() {
    switch (this.$route.path) {
      case "/bottombar/classify":
        this.selectedLabelDefault = "分类";
        break;
      case "/bottombar/search":
        this.selectedLabelDefault = "搜索";
        break;
      case "/bottombar/cart":
        this.selectedLabelDefault = "购物车";
        break;
      case "/bottombar/mine":
        this.selectedLabelDefault = "我的";
        break;
      default:
        this.selectedLabelDefault = "首页";
        break;
    }
  }
};
</script>

<style lang="stylus">
.cube-tab-bar.bottom-bar
  position fixed
  bottom 0
  left 0
  font-size 0.5rem
  width 100%
  z-index 100
  background-color #fff
  .cube-tab div
    font-size 0.7em
    padding-top 0.3em
  i
    font-size 1em
</style>
