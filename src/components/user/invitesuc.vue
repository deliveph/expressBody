<template>
    <div class="wrapper">
        <div class="code-wrapper">
            <div class="er-code">
                <img src="//qr.api.cli.im/qr?data=http%253A%252F%252F192.168.60.40%253A2400%252F%2523%252Fleague&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=775f1911267163adc8a4dbc00569d317" alt="">
            </div>
        </div>
        <div class="about-invited">
            <h2>关注公众号</h2>
            <p>立即享受便捷服务</p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        created(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:white")
        }
    }
</script>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';
// body{
//     background:#fff;
// }
.code-wrapper{
    background:url(/static/assets/images/haibao_bg.png) no-repeat;background-size:cover;
    position:relative;height:px2rem(1056);width:100%;
}
.er-code{
    width:px2rem(240);height:px2rem(240);position:absolute;top:px2rem(378);left:0 ;right:0;margin:0 auto;
    img{
        width:100%;height:100%;
    }
}
.about-invited{
    margin-top:px2rem(30);
    h2{
        font-size:px2rem(40);color:#333;text-align:center;
    }
    p{
        text-align:center; font-size:px2rem(30);color:#333;margin-top:px2rem(10)
    }
}
</style>