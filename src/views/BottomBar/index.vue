<template>
  <div>
    <cube-slide ref="slide" :data="items" @change="changePage">
      <cube-slide-item
        v-for="(item, index) in items"
        :key="index"
        @click.native="clickHandler(item, index)"
      >
        <a :href="item.url">
          <img class="slideImg" :src="item.image" />
        </a>
      </cube-slide-item>
    </cube-slide>
    <cube-slide ref="rollinglist" :data="rollinglists" :auto-play="false">
      <cube-slide-item v-for="(list, index) in rollinglists" :key="index">
        <ul class="rollingUl">
          <li v-for="(item, index1) in list" :key="index1" class="rollingLi">
            <a :href="item.url">
              <img :src="item.img" :alt="item.label" />
            </a>
            <p>{{item.label}}</p>
          </li>
        </ul>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      rollinglists: []
    };
  },
  async created() {
    try {
      const result = await this.$http.get("/api/banner");
      this.items = result.data;
      const rollinglists = await this.$http.get("/api/rollinglist");
      this.rollinglists = rollinglists.data;
    } catch (err) {
      console.log("请求主页数据错误", err);
    }
  },
  methods: {
    changePage(current) {},
    clickHandler(item, index) {}
  }
};
</script>

<style lang="stylus" scoped>
.slideImg
  display block
  height 175px
  width 100%
.rollingUl
  display flex
  flex-wrap wrap
  .rollingLi
    width 20%
    justify-content center
    img
      width 55%
      border-radius 15%
      padding 5px 0
    p
      font-size 14px
      padding-bottom 5px
</style>
