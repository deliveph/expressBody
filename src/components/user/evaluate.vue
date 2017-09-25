<template>
<div class="wrapper">
    <div class="appraise">
        <div class="appraise-con">
            <dl>
                <dt><img :src="items.service_avatar" alt=""></dt>
                <dd>{{items.service_nickname}}</dd>
            </dl>
            <rater class="appraise-start" v-model="dstar" active-color="#fc6"  slot="value" font-size=30 margin=3></rater>
        </div>
        <div class="commit-eval">
            <button class="commit-btn" @click="saveRes">提交评论</button>
        </div>
    </div>
</div>
</template>
<script>
    import { Rater } from 'vux'
    import  { Toast } from 'vux'
    import  qs from 'qs'
    export default{
        data() {
            return {
                dstar: 0,
                ship_order_number:'',
                items:[],
                type:''
            }
        },
        methods: {
            saveRes() {
                let that = this
                let number = that.dstar.toFixed(1)
                let data = qs.stringify({
                    'service_score':number
                })
                if(that.type == 'ship'){
                    this.http(that.configs.apiTop + "/order/comment-ship-order/"+that.ship_order_number, "post", data, function(res) {
                        let msg = res.data
                        if (msg.code == 0) {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                            setTimeout(function(){ 
                                that.$router.push({path:'/evalresult'})
                            }, 200);
                        } else if (msg.code == 40004) {
                            // location.href = that.configs.accreditUrl
                        } else {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                        }
                    })
                }else{
                    this.http(that.configs.apiTop + "/collection-order/comment/"+that.ship_order_number, "post", data, function(res) {
                        let msg = res.data
                        if (msg.code == 0) {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                            setTimeout(function(){ 
                                that.$router.push({path:'/evalresult'})
                            }, 200);
                        } else if (msg.code == 40004) {
                            // location.href = that.configs.accreditUrl
                        } else {
                            that.$vux.toast.text(msg.message, 'middle', 100);
                        }
                    }) 
                }
            }
        },
        components: {
            Rater,
            Toast
        },
        created(){
            let that = this
            that.ship_order_number = this.$route.query.ship_order_number
            that.type = this.$route.query.type
            if(that.type == 'ship'){
                this.http(that.configs.apiTop + "/page/comment-ship-order/"+that.ship_order_number, "get", '', function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        let data = msg.data
                        that.items = data.service
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }else{
                this.http(that.configs.apiTop + "/page/comment-collection-order/"+that.ship_order_number, "get", '', function(res) {
                    let msg = res.data
                    if (msg.code == 0) {
                        let data = msg.data
                        that.items = data.service
                    } else if (msg.code == 40004) {
                        // location.href = that.configs.accreditUrl
                    } else {
                        that.$vux.toast.text(msg.message, 'middle', 100);
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';
</style>