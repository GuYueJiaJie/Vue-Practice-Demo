module.exports = {
  configureWebpack: {
    devServer: {
      // mock数据
      before: function(app) {
        // 用户信息池
        let userInfos = [
          { username: "jingdong", password: "123456" },
          { username: "jingdong1", password: "123456" }
        ];
        app.get("/api/register", (req, res) => {
          const { username } = req.query;
          const userLength = userInfos.filter(
            item => item.username === username
          ).length;
          if (userLength > 0) {
            res.json({
              success: false,
              message: "用户名已经存在"
            });
          } else {
            res.json({
              success: true,
              message: "注册成功"
            });
          }
        });
        let tokenkey = "jingdong";
        app.get("/api/login", (req, res) => {
          const { username, password } = req.query;
          const isUser = userInfos.filter(item => {
            return item.username === username;
          });
          if (isUser.length > 0 && isUser[0].password === password) {
            res.json({
              code: 0,
              message: "登录成功",
              token:
                tokenkey +
                "-" +
                username +
                "-" +
                (new Date().getTime() + 60 * 60 * 1000)
            });
          } else {
            res.json({
              code: 1,
              message: "用户名或密码错误"
            });
          }
        });
        app.get("/api/banner", (req, res) => {
          res.json({
            data: [
              {
                url:
                  "https://pro.m.jd.com/mall/active/2tAFcdGmrFRt5qAinhX6pT5CrZdT/index.html?extension_id=eyJhZCI6IiIsImNoIjoiIiwic2hvcCI6IiIsInNrdSI6IiIsInRzIjoiIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcImQ3N2UwZjQ0LWU3MzAtNDcwYi05N2NhLTA3MDYwZDI0MDA0ZVwiLFwibWF0ZXJpYWxfaWRcIjpcIjYzNjc1OTc4MVwiLFwicG9zX2lkXCI6XCIzNjIyXCIsXCJzaWRcIjpcImUwOWFiZmE3LTQ5MzQtNGM2YS1hOWJiLWFjOTUxNzM0MzlhNVwifSJ9&jd_pop=d77e0f44-e730-470b-97ca-07060d24004e&abt=1",
                image:
                  "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/61857/29/4876/109054/5d315fd6E62754536/e824f210ca306d46.jpg!cr_1125x549_0_72!q70.jpg.dpg"
              },
              {
                url:
                  "https://h5.m.jd.com/active/yard-channel/index.html?themeId=4276&babelChannel=12539622&innerLink=%5B%7B%22matId%22%3A%2212555203929%22%7D%5D&themeStyle=0",
                image:
                  "//imgcps.jd.com/ling4/12555203929/5oiR55qE5aSn5a2m/5YWo5paw55Sf5rS75LuO6L-Z6YeM5byA5ZCv/p-5c1361ed82acdd181dd72170/fade4897/cr_1125x549_0_72/s1125x690/q70.jpg"
              },
              {
                url:
                  "https://pro.m.jd.com/mall/active/3nxcGU8mCsjXN5MjTGQ1AX2LbdfF/index.html?innerAnchor=2922989_1975749_2361717_8053326_7400680&focus=4",
                image:
                  "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/23476/29/350/138320/5c090c50Ed5df740f/f7ca55a05a9c9acc.jpg!cr_1125x549_0_72!q70.jpg.dpg"
              }
            ]
          });
        });

        app.get("/api/rollinglist", (req, res) => {
          res.json({
            data: [
              [
                {
                  url:
                    "https://h5.m.jd.com/babelDiy/Zeus/4JkCVz6z5RB4dBL7bZBwtGRiBLLw/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/20983/16/10753/6124/5c8a16aaE5d6b15d7/01e0e818a7505267.png",
                  label: "京东超市"
                },
                {
                  url:
                    "https://pro.m.jd.com/mall/active/8tHNdJLcqwqhkLNA8hqwNRaNu5f/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/39401/17/2391/5859/5cc06fcfE2ad40668/28cda0a571b4a576.png",
                  label: "数码电器"
                },
                {
                  url:
                    "https://h5.m.jd.com/babelDiy/Zeus/28Lq4LbJDJcuMhNb9tQ6EcbZ8GTu/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/17169/3/4127/4611/5c2f35cfEd87b0dd5/65c0cdc1362635fc.png",
                  label: "京东服饰"
                },
                {
                  url:
                    "https://pro.m.jd.com/mall/active/4P9a2T9osR9JvtzHVaYTPvsecRtg/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/27962/13/1445/4620/5c120b24Edd8c34fe/43ea8051bc50d939.png",
                  label: "京东生鲜"
                },
                {
                  url: "//daojia.jd.com/html/index.html?channel=jdapp",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png",
                  label: "京东到家"
                },
                {
                  url: "//newcz.m.jd.com/",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png",
                  label: "充值缴费"
                },
                {
                  url:
                    "//wqs.jd.com/portal/wx/tuan/pingouv3.shtml?ptag=138097.1.8&sceneval=2",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png",
                  label: "9.9元拼"
                },
                {
                  url: "//coupon.m.jd.com/center/getCouponCenter.action",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/7068/29/8987/5605/5c120da2Ecae1cc3a/016033c7ef3e0c6c.png",
                  label: "领券"
                },
                {
                  url: "//m.jr.jd.com/vip/borrowMoney/html/index.html?from=rk",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t17116/175/2673385904/6610/50f5ef50/5b03b7aeNf3a7fa37.png",
                  label: "借钱"
                },
                {
                  url: "//plus.m.jd.com/index",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/22262/9/1470/4527/5c120cd0E5d3c6c66/4792ec307a853e9f.png",
                  label: "PLUS会员"
                }
              ],
              [
                {
                  url:
                    "//pro.m.jd.com/mall/active/3YvKJrc4e4WK7aZ46j3h5UMCvEn4/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/14555/23/1446/4195/5c120e71E947f3ca1/cdbad904f61e1fb7.png",
                  label: "海囤全球"
                },
                {
                  url: "//mauction.jd.com",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/32245/22/2820/6521/5c6df9b3E1466dcd3/9f4cd68276f4e971.png",
                  label: "京东拍卖"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/2aiozXgZK1PUVZA37WNq62KLtjcC/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/25651/12/1391/4836/5c120c34Eb93a70fa/3a1735f6a79d0721.png",
                  label: "唯品会"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/3JAoyewPmdVBMeRWTBiHDdGH5M36/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t28723/45/1332082024/6421/ead422d3/5cdd0be3Nfce1ba98.jpg.dpg",
                  label: "唯品会"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/3JAoyewPmdVBMeRWTBiHDdGH5M36/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t28723/45/1332082024/6421/ead422d3/5cdd0be3Nfce1ba98.jpg.dpg",
                  label: "玩3C"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/3d34Pm49obpjLEdhhagSZuM5QrwC/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/19699/10/1440/6755/5c120ca6Eaa521f62/f9d57f39e55c7321.png",
                  label: "沃尔玛"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/2kmaPNrGDNYo1LKwYtRoaSmsgbj6/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/19745/21/1415/4886/5c120cbbEe58af0bf/4d19bf58d42fc9c4.png",
                  label: "美妆馆"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/4Fr34Vshk1ymvv9CBTysFkF36aYM/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/27748/22/1419/4913/5c120d0eEa52ea62f/3c2b78a40edc97b2.png",
                  label: "京东旅行"
                },
                {
                  url:
                    "//pro.m.jd.com/mall/active/LHGZv1DrGkva1jNpUkKFuNFN6oo/index.html",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/14996/29/2195/11094/5c1afdb7Ee54cf069/d6ab6a0f64fee068.png",
                  label: "拍拍二手"
                },
                {
                  url: "//home.m.jd.com/user/userAllOrderList.action",
                  img:
                    "//m.360buyimg.com/mobilecms/s120x120_jfs/t5842/205/151189300/13247/a6de2d/591d94edNc42fb94d.png",
                  label: "物流查询"
                }
              ]
            ]
          });
        });

        app.get("/api/classify", (req, res) => {
          switch (req.query.type) {
            case "0":
              res.json({
                data: [
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  }
                ]
              });
              break;
            case "1":
              res.json({
                data: [
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  }
                ]
              });
              break;
            case "2":
              res.json({
                data: [
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  },
                  {
                    image:
                      "//img14.360buyimg.com/focus/s140x140_jfs/t11929/135/2372293765/1396/e103ec31/5a1692e2Nbea6e136.jpg",
                    label: "华为"
                  }
                ]
              });
              break;
            case "3":
              res.json({
                data: [
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  },
                  {
                    image:
                      "//img10.360buyimg.com/focus/s140x140_jfs/t12178/348/911080073/4732/db0ad9c7/5a1692e2N6df7c609.jpg",
                    label: "荣耀"
                  }
                ]
              });
              break;
            case "4":
              res.json({
                data: [
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  }
                ]
              });
              break;
            case "5":
              res.json({
                data: [
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  },
                  {
                    image:
                      "//img20.360buyimg.com/focus/s140x140_jfs/t13759/194/897734755/2493/1305d4c4/5a1692ebN8ae73077.jpg",
                    label: "雪梨手机"
                  }
                ]
              });
              break;
            case "6":
              res.json({
                data: [
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  },
                  {
                    image:
                      "//img30.360buyimg.com/focus/s140x140_jfs/t13411/188/926813276/3945/a4f47292/5a1692eeN105a64b4.png",
                    label: "小米"
                  }
                ]
              });
              break;
          }
        });
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },

  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: true
    }
  }
};
