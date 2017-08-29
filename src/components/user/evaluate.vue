<template>
<div class="wrapper">
    <div class="appraise">
        <div class="appraise-con">
            <dl>
                <dt><img src="http://dw.ofniao.com/upload/./20170614/14974098963665.jpg" alt=""></dt>
                <dd>快递宝宝名字</dd>
            </dl>
            <!--
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>-->
            <rater class="appraise-start" margin="14" v-model="dstar" active-color="#fc6" font-size="38" slot="value"></rater>
            <span v-model="dstar">{{dstar}}</span>
            <input type="hidden" v-model="dstar" value="dstar">
        </div>
        <div class="commit-eval">
            <button class="commit-btn" @click="saveRes">提交评论</button>
        </div>
    </div>
</div>
</template>
<script>
    import Rater from 'vux'
    export default{
        data() {
            return {
                dstar: 0
            }
        },
        methods: {
            saveRes() {
                this.$router.push({path:'/evalresult'});
            }
        },
        components: {
            Rater
        },
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';
</style>