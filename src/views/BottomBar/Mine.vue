<template>
  <div>
    <img
      src="//m.360buyimg.com/mobilecms/s750x366_jfs/t1/52179/40/5254/89348/5d2fc8c1Ebe45307a/ca7d6ce01b578202.jpg!cr_1125x549_0_72!q70.jpg.dpg"
      alt="登录界面"
      class="headerimg"
    />
    <ul>
      <li class="mine-lists" v-for="item in labelsList" :key="item.label" @click="selectItem(item)">
        <span>{{item.label}}</span>
        <i class="cubeic-arrow"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelsList: [
        {
          label: "商品收藏"
        },
        { label: "我的足迹" },
        { label: "店铺收藏" },
        { label: "我的订单" },
        { label: "退出账户", type: "exit" }
      ]
    };
  },
  methods: {
    selectItem(item) {
      if (item.type === "exit") {
        // 清除vuex中的token
        // 清除sessionStorage中的token
        // 跳转到登录界面
        this.$store.commit("setToken", "");
        sessionStorage.removeItem("token");
        this.$router.push("/user/login");
        // 此时应该将购物车等需要账户的信息上传后台并存进数据库
      } else {
        alert("此功能尚未开发");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.headerimg
  height 150px
  width 100%
.mine-lists
  text-align left
  font-size 0.5rem
  height 1rem
  line-height 1rem
  padding-left 5%
  border-bottom 1px solid #eee
  span
    display inline-block
    width 90%
</style>

