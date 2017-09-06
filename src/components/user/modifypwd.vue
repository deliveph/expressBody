<template>
    <div class="wrapper">
       
        <div class="modify-wrapper">
            <div class="pwd-input">
                <label for="">原密码</label>
                <input type="passwork" placeholder="请输入原密码">
            </div>
            <div class="pwd-input">
                <label for="">新密码</label>
                <input type="passwork" placeholder="请输入6-20">
            </div>
            <div class="change-name-save">
                <button class="commit-btn" disabled>完成</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default{}
</script>
<style lang="scss">
    @import '../../../static/assets/css/px2rem.scss';
   
    .modify-wrapper{
        margin-top:px2rem(20);
        .pwd-input{
            padding:px2rem(20) 4%;background:#fff;border-bottom:1px solid #f1f1f1;height:px2rem(48);line-height:px2rem(48);
            label{
                font-size:px2rem(28);color:#666;vertical-align: middle;
            }
            input{
                width:50%;border:0;font-size:px2rem(28);
            }
        }
        .change-name-save{
            padding: 0 4%;
            margin-top:px2rem(340);
            .commit-btn{
                width: 100%;height: px2rem(88);line-height: px2rem(88);
                font-size: px2rem(30);color: #fff;background-color: #366931;
                border-radius: px2rem(10);
            }
        }
    }

</style>