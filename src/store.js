import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const router = new Vuex.Store({
  state: {
    token: "",
    cartLists: JSON.parse(localStorage.getItem("cartLists")) || []
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
    },
    // 增加购物车中的商品数量
    addProduct(state, name) {
      const product = state.cartLists.find(item => item.name === name);
      product.count += 1;
    },
    removeProduct(state, name) {
      const cartLists = state.cartLists;
      let indexOfProduct = "";
      for (let i = 0; i < cartLists.length; i++) {
        if (cartLists[i].name === name) {
          indexOfProduct = i;
          break;
        }
      }
      if (cartLists[indexOfProduct].count > 1) {
        cartLists[indexOfProduct].count -= 1;
      } else {
        if (window.confirm("确定从购物车移除商品吗？")) {
          cartLists.splice(indexOfProduct, 1);
        }
      }
    },
    // 清空购物车
    removeAllProducts(state) {
      state.cartLists = [];
    }
  },
  actions: {},
  getters: {
    sumOfCart(state) {
      return state.cartLists.length;
    }
  }
});

// 会在每个mutation完成后调用，接收mutation和经过mutation后的状态作为参数
// JSON.parse(JSON.stringify(item))可以实现有限制条件的深拷贝
router.subscribe((mutation, state) => {
  localStorage.setItem("cartLists", JSON.stringify(state.cartLists));
});

export default router;
