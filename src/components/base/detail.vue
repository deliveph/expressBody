<template>
  <div class="detail" id="detail">
    <div class="detail_box" v-html="htmlContent">
    </div>
    <div class="footer_btn" v-if="type == 'home_tip'">
      <div>
        <button @click="experience">立即体验</button>
      </div>
    </div>
    <div class="footer_btn" v-else-if="type == 'bottom_menu'">
      <div>
        <button @click="rechargeBtn">充值</button>
        <button @click="share = !share">分享</button>
      </div>
    </div>
    <shareshade v-show="share" @click.native="share = !share"></shareshade>
  </div>
</template>

<script>
  import Shareshade from "./public/shareShade";
  export default {
    data() {
      return {
        share: false,
        type: "free",
        htmlContent: ""
      }
    },
    components: {
      Shareshade
    },
    methods: {
      rechargeBtn() {
        this.$router.push({
          path: "/recharge"
        })
      },
      experience() {
        this.$router.push({
          path: "/user"
        })
      }
    },
    created() {
      let that = this
      that.type = this.$route.query.type
      switch (that.type) {
        case "bottom_menu":
        case "user_balance_help":
        case "agreement":
        case "use_help":
        case "home_tip":
          that.http(that.configs.apiTop + "/page/html-content?type=" + that.type, "get", "", function(res) {
            let msg = res.data;
            if (msg.code == 0) {
              that.htmlContent = msg.data.html_content
            } else {
              that.$vux.toast.text(msg.message, "middle", 100)
            }
          })
          break
        case "user":
          let readmeId = this.$route.query.id;
          this.http(
            that.configs.apiTop + "/page/readme-detail/" + readmeId, "get", "",
            function(res) {
              let msg = res.data;
              if (msg.code == 0) {
                that.htmlContent = msg.data.readme_content;
                document.title = msg.data.readme_title;
              }
            }
          )
          break
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../static/assets/css/px2rem.scss";
  .detail {}
  
  .detail_box {
    padding-bottom: px2rem(90);
    font-size: px2rem(28);
    color: #333;
    text-align: left;
    // text-indent:2em;
    line-height: px2rem(38);
    padding: 0 px2rem(30);
    img {
      width: 100%;
    }
    .content {
      margin-top: px2rem(30);
      padding: 0 px2rem(30);
    }
    p {
      font-size: px2rem(28);
      color: #333;
      text-align: left;
      text-indent: 2em;
      line-height: px2rem(38);
    }
  }
  
  .footer_btn {
    display: flex;
    width: 100%;
    height: px2rem(90);
    line-height: px2rem(90);
    position: fixed;
    bottom: 0;
    div {
      display: flex;
      width: 100%;
      height: 0.45rem;
    }
    button {
      flex: 1;
      font-size: px2rem(34);
      color: #fff;
      background-color: #499142;
      border-right: 1px solid #fff;
      &::last-child {
        border-right: 0;
      }
    }
  }
</style>