<template>
  <div class="pannelbox">
    <cube-scroll class="leftpanel">
      <ul>
        <li
          v-for="(list, index) in labelLists"
          :key="index"
          :class="list.active ? 'active' : ''"
          @click="select(index)"
        >{{list.label}}</li>
      </ul>
    </cube-scroll>
    <cube-scroll class="rightpanel">
      <ul>
        <li v-for="(product, index) in productLists" :key="index" @click="selectProduct(index)">
          <img :src="product.image" :alt="product.label" />
          <p>{{product.label}}</p>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productLists: [],
      labelLists: [
        {
          label: "热门推荐",
          active: true
        },
        {
          label: "手机数码",
          active: false
        },
        {
          label: "家用电器",
          active: false
        },
        {
          label: "家用空调",
          active: false
        },
        {
          label: "电脑产品",
          active: false
        },
        {
          label: "计生情趣",
          active: false
        },
        {
          label: "美妆护肤",
          active: false
        },
        {
          label: "口红",
          active: false
        },
        {
          label: "手袋",
          active: false
        },
        {
          label: "汽车生活",
          active: false
        },
        {
          label: "京东超市",
          active: false
        },
        {
          label: "男装",
          active: false
        },
        {
          label: "男鞋",
          active: false
        },
        {
          label: "女装",
          active: false
        },
        {
          label: "女鞋",
          active: false
        }
      ]
    };
  },
  methods: {
    select(index) {
      this.labelLists.forEach((item, idx) => {
        if (idx === index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
      this.getClassify(index);
    },
    async getClassify(index) {
      const result = await this.$http.get("/api/classify", {
        params: { type: index }
      });
      this.productLists = result.data;
    }
  },
  created() {
    // 初始化获取默认的分类数据
    this.getClassify(0);
  },
  mounted() {
    // DOM元素渲染结束，且el挂载之后
    const leftpanel = document.querySelector(".leftpanel");
    const rightpanel = document.querySelector(".rightpanel");
    const bodyheight = document.body.clientHeight;
    const bottomBarheight = document.querySelector(".bottom-bar").clientHeight;
    rightpanel.style.height = leftpanel.style.height =
      bodyheight - bottomBarheight + "px";
  }
};
</script>

<style lang="stylus" scoped>
.pannelbox
  display flex
  font-size 1rem
  .leftpanel
    width 30%
    li
      font-size 0.5em
      height 2.5em
      line-height 2.5em
      background-color #f8f8f8
      border-bottom 1px solid 'gray'
      color #333
    .active
      background-color #ffffff
      color #e93b3d
  .rightpanel
    width 70%
    ul
      display flex
      flex-wrap wrap
      align-items center
      justify-content center
      li
        width 50%
        font-size 0.4em
        img
          width 2rem
          height 2rem
</style>

