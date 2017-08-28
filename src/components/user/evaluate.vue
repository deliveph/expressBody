<template>
<div class="wrapper">
    <div class="appraise">
        <div class="appraise-con">
            <dl>
                <dt><img src="http://dw.ofniao.com/upload/./20170614/14974098963665.jpg" alt=""></dt>
                <dd>快递宝宝名字</dd>
            </dl>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <input type="hidden">
        </div>
        <div class="commit-eval">
            <button class="commit-btn" @click="saveRes">提交评论</button>
        </div>
    </div>
</div>
</template>
<script>
    export default{
        methods: {
            // evalresult
            saveRes() {
                this.$router.push({path:'/evalresult'});
            }
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>