<template>
    <div class="wrapper">
        <div class="change-name">
            <div class="change-name-input">
                <input type="text" placeholder="请输入姓名(不超过10个字)">
            </div>
            <div class="change-name-save">
                <button class="commit-btn" disabled>保存</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{}
</script>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';
    .change-name{
        margin-top:px2rem(20)
    }
    .change-name-input{
        padding:px2rem(20) 4%;background:#fff;
        input{
            width:100%;
            background:#fff;
            height:px2rem(48);
            border:0;
            font-size:px2rem(30);
            color:#333;
        }
    }
    .change-name-save{
        padding: 0 4%;
        margin-top:px2rem(480);
        .commit-btn{
            width: 100%;height: px2rem(88);line-height: px2rem(88);
            font-size: px2rem(30);color: #fff;background-color: #366931;
            border-radius: px2rem(10);
        }
    }
</style>