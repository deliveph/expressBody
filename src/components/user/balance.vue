<template>
    <div class="wrapper">
        <div class="banlance-wrapper">
            <div class="balace-banner">
                <ul class="document">
                    <li>
                        <router-link to="/payset">设置</router-link>
                    </li>
                    <li>
                        <router-link to="/detail">使用帮助</router-link>
                    </li>
                </ul>
                <div class="bal-img"></div>
                <h6>{{sun}}</h6>
                <p>快递豆总余额(个)</p>
            </div>
            <ul class="balace-option">
                <li>
                    <router-link :to="{name:'Recharge'}">充值</router-link>
                </li>
                <li>
                    <button @click="share = !share">邀请好友</button>
                </li>
            </ul>
            <div class="structure mt20">
                <h1>收支明细</h1>
                <ul class="income-item" v-if="items">
                    <li v-for="(item,i) in items" :key="i">
                        <div class="income-info col-8">
                            <p>{{item.consume_category_name}}</p>
                            <span>{{item.create_time}}</span>
                        </div>
                        <div class="income-add col-2">
                            <p class="add t-r">{{item.consume}}</p>
                            <!-- <p class="subtract t-r">-10</p> -->
                            <!--
                            <p class="subtract">-10</p>
                            -->
                        </div>
                    </li>
                </ul>
                <div class="no-balance" v-else>
                    <img src="/static/assets/images/no_record.png" alt="">
                    <p>暂无余额明细</p>
                </div>
            </div>
            
        </div>

        <shareshade v-show="share" @click.native="share = !share"></shareshade>
    </div>
</template>
<script>
    import Shareshade from '../base/public/shareShade'
    export default{
        data(){
            return{
                items:[],
                sun:'',
                share: false
            }
        },
        components:{
           Shareshade
        },
        created() {
            let that = this
            this.http(that.configs.apiTop + "/page/user-balance", "get", '', function(res) {
                let msg = res.data
                if (msg.code == 0) {
                    let data = msg.data
                    that.items = data.user_finance_log
                    that.sun = data.user_balance 
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                } else {
                    that.$vux.toast.text(msg.message, 'middle', 100);
                }
            })
        },
        methods:{
            shareClick(){
                this.share = true
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>