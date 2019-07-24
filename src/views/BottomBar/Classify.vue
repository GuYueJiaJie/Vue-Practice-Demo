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
        <li v-for="(product, index) in productLists" :key="index">
          <img :src="product.image" :alt="product.label" />
          <p>
            {{product.label}}
            <i class="cubeic-add" @click="addToCart($event, product.label)"></i>
          </p>
        </li>
      </ul>
    </cube-scroll>
    <!-- 动画可以组合成竖直方向上的动画和水平方向上的动画 -->
    <!-- 竖直的动画由ball来完成过渡，利用besizer曲线完成一个上跳再往下的过程 -->
    <!-- 水平的动画由inner来完成过渡，线性变化 -->
    <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-if="ball.show">
          <div class="inner">
            <i class="cubeic-add"></i>
          </div>
        </div>
      </transition>
    </div>
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
      ],
      ball: {
        show: false, //是否显示该球
        el: "" // 获取class为ball的dom
      }
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
    addToCart(e, label) {
      this.$store.commit("addToCartLists", label);
      this.ball.show = true; // 显示出小球
      this.ball.el = e.target; // 获取点击元素
    },
    async getClassify(index) {
      const result = await this.$http.get("/api/classify", {
        params: { type: index }
      });
      this.productLists = result.data;
    },
    beforeEnter(el) {
      // beforeEnter是过渡开始前的状态
      // el是transition标签下第一个dom元素

      // 在开始transition之前
      // 先让小球移动到点击的位置
      const dom = this.ball.el; // dom是addToCart中获得的点击元素
      const rect = dom.getBoundingClientRect(); // 获取点击dom的位置
      // 计算小球到达点击的位置需要的变换
      const x = rect.left - window.innerWidth * 0.73;
      const y = rect.top - window.innerHeight;
      console.log(x, y);
      // 让.ball元素移动到点击的位置
      // .ball元素控制y轴变化
      el.style.display = "block";
      el.style.transform = `translate3D(0, ${y}px, 0)`;
      // inner元素控制x轴变化
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${x}px,0,0)`;
    },
    enter(el, done) {
      // enter是过渡中的变化

      // 此时需要触发重排才能开始动作变化
      document.body.offsetWidth;

      // 让小球回到原点位置
      el.style.transform = `translate3D(0, 0, 0)`;
      // inner元素控制x轴变化
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3D(0,0,0)`;
      // 过渡完成后需要执行done
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
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
  .ball
    position fixed
    left 73%
    bottom 0.5rem
    color red
    z-index 1003
    transition all 1s cubic-bezier(0.4, -0.3, 0.8, 0.75)
    .inner
      width 0.3rem
      height 0.3rem
      font-size 0.5rem
      transition all 1s linear
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

