<template>
  <div>
    <div class="goods" v-for="(item, index) in cartLists" :key="index">
      {{item.name}}
      <div class="goodsRight">
        <i class="cubeic-remove" @click="removeGoods(index)"></i>
        <span>{{item.count}}</span>
        <i class="cubeic-add" @click="addGoods(index)"></i>
      </div>
    </div>
    <cube-button class="cart-button">下单</cube-button>
    <cube-button class="cart-button">清空购物车</cube-button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    removeGoods(index) {},
    addGoods(index) {}
  },
  computed: {
    ...mapState({
      cartLists: state => state.cartLists
    })
  }
};
</script>

<style lang="stylus" scoped>
.goods
  padding 10px
  text-align left
  .goodsRight
    float right
  i
    font-size 0.5rem
.cart-button
  margin 0.25rem 0
</style>

