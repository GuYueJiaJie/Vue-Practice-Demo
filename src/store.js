import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    cartLists: []
  },
  mutations: {
    // 设置vueX的token
    setToken(state, token) {
      state.token = token;
    },
    addToCartLists(state, label) {
      let product = state.cartLists.find(item => {
        return item.name === label;
      });
      // 如果购物车中已经存在该label的商品
      if (product) {
        product.count++;
      } else {
        state.cartLists.push({
          name: label,
          count: 1
        });
      }
    }
  },
  actions: {},
  getters: {
    sumOfCart(state) {
      return state.cartLists.length;
    }
  }
});
