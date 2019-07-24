<template>
  <div>
    <img
      src="//m.360buyimg.com/mobilecms/s750x366_jfs/t1/52179/40/5254/89348/5d2fc8c1Ebe45307a/ca7d6ce01b578202.jpg!cr_1125x549_0_72!q70.jpg.dpg"
      alt="登录界面"
      class="headerimg"
    />
    <cube-form :model="model" :schema="schema" @submit="loginUser"></cube-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入你的用户名"
            },
            rules: {
              required: true,
              type: "string",
              min: 3,
              max: 15,
              notWhitespace: true
            },
            messages: {
              required: "用户名不能为空",
              min: "用户名不得小于3位字符",
              max: "用户名不得大于15位字符",
              notWhitespace: "用户名不能全部为空白字符"
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入您的密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              required: true,
              type: "string",
              min: 5,
              max: 20,
              notWhitespace: true
            },
            messages: {
              required: "密码不能为空",
              min: "密码不得小于5位字符",
              max: "密码不得大于20位字符",
              notWhitespace: "密码不能全部为空白字符"
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    async loginUser(e) {
      e.preventDefault();
      try {
        const result = await this.$http.get("/api/login", {
          params: this.model
        });
        // code=0表示登陆成功
        if (!result.code) {
          this.setToken(result.token);
          window.sessionStorage.setItem("token", result.token);
          // 增加登陆成功提示
          if (this.$route.query.redirect) {
            // 如果query参数中有redirect
            this.$router.replace({ path: this.$route.query.redirect });
          } else {
            this.$router.replace("/bottombar/index");
          }
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert(err);
      }
    },
    // getQueryString(name) {
    //   const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   const str = decodeURIComponent(location.search.substring(1)).match(reg);
    //   if (str != null) {
    //     return str[2];
    //   } else {
    //     return null;
    //   }
    // },
    showPopup(refId) {
      const component = this.$refs[refId];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 1000);
    },
    ...mapMutations({
      setToken: "setToken"
    })
  }
  // computed: {
  //   ...mapState({
  //     token: state => state.token
  //   })
  // }
};
</script>

<style lang="stylus" scoped>
.headerimg
  height 150px
  width 100%
.cube-popup-center .cube-popup-content
  color 'red'
  font-size 200px
</style>
