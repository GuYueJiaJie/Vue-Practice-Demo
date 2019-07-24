<template>
  <div>
    <img
      class="headerimg"
      src="//m.360buyimg.com/mobilecms/s750x366_jfs/t1/31162/17/1128/101786/5c46ead8E22ee9740/f66061da227c1965.jpg!cr_1125x549_0_72!q70.jpg.dpg"
      alt="注册界面"
    />
    <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
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
            // 用户名的配置
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
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
              min: "用户名不能少于3个字符",
              max: "用户名不能大于15个字符",
              notWhitespace: "用户名不能全部为空白字符"
            },
            trigger: "blur"
          },
          {
            // 密码的配置
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              required: true,
              type: "string",
              min: 6,
              max: 20,
              notWhitespace: true
            },
            messages: {
              required: "密码不能为空",
              min: "密码不能少于6个字符",
              max: "用户名不能大于15个字符",
              notWhitespace: "密码不能全部为空白字符"
            },
            trigger: "blur"
          },
          {
            // 注册按钮
            type: "submit",
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e) {
      e.preventDefault();
      this.$http
        .get("/api/register", {
          params: this.model
        })
        .then(res => {})
        .catch(err => {
          console.log("AJAX请求出错");
          console.log(err);
        });
      // 原生AJAX
      // var xhr = new XMLHttpRequest();
      // xhr.onreadystatechange = function() {
      //   if (xhr.readyState === 4) {
      //     if (xhr.status === 200) {
      //       console.log(xhr.responseText);
      //     } else {
      //       console.error(xhr.statusText);
      //     }
      //   }
      // };
      // xhr.onerror = function() {
      //   console.error(xhr.statusText);
      // };
      // xhr.open("POST", "/api/register", true);
      // xhr.send(this.model);
    }
  }
};
</script>

<style lang="stylus" scoped>
.headerimg
  height 150px
  width 100%
</style>
