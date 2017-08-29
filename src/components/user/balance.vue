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
                <h6>360</h6>
                <p>快递豆总余额(个)</p>
            </div>
            <ul class="balace-option">
                <li>
                    <router-link :to="{name:'Recharge'}">充值</router-link>
                </li>
                <li>
                    <router-link :to="{name: 'Invite'}">邀请好友</router-link>
                </li>
            </ul>
            <div class="structure mt20">
                <h1>收支明细</h1>
                <ul class="income-item">
                    <li>
                        <div class="income-info col-8">
                            <p>邀请好友</p>
                            <span>2016-02-10 18:09:56</span>
                        </div>
                        <div class="income-add col-2">
                            <p class="add t-r">+1000000</p>
                            <!--
                            <p class="subtract">-10</p>
                            -->
                        </div>
                    </li>
                    <li>
                        <div class="income-info col-8">
                            <p>邀请好友</p>
                            <span>2016-02-10 18:09:56</span>
                        </div>
                        <div class="income-add col-2">
                            <p class="subtract t-r">-10</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="no-balance">
                <img src="/static/assets/images/no_record.png" alt="">
                <p>暂无余额明细</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>