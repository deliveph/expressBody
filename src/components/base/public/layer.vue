<template>
    <!--手机号弹出层  -->
    <div class="layer_warp layer_phone">
        <div class="layer_table">
            <div class="layer_table_cell">
                <div class="layer_box">
                    <div class="layer_title">
                        <p>请输入您的手机号</p>
                    </div>
                    <div class="layer_container">
                        <div class="phone_register register_box">
                            <div class="phone_number">
                                <label></label>
                                <input type="number" name="phone" value="" placeholder="请输入手机号码" v-model="phone"/>
                                <button type="button" >发送验证码</button>
                            </div>
                            <div class="phone_code">
                                <label></label>
                                <input type="number" name="code" value="" placeholder="请输入验证码" v-model="code"/>
                            </div>
                        </div>
                    </div>
                    <div class="layer_footer">
                        <div class="layer_footer_cancel">
                            <button @click="cancel">取消</button>
                        </div>
                        <div class="layer_footer_confirm">
                            <button @click="confirm">确定</button>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    </div>

    
</template>

<script>
    import qs from 'qs'
    export default{
        data(){
            return{
                phone:'',
                code:''
            }
        },
        created() {
        },
        methods: {
            confirm() {
                let that = this;
                let data = qs.stringify({
                    'phone':that.phone,
                    'captcha':that.code,
                })
                this.$ajax({
                    url:'/api/weixin/binding-role',
                    method:'post',
                    headers:{
                        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtZW5vcnkuY29tIiwic3ViIjoiKiIsImV4cCI6MTUwNDQ5NjgzNiwid2VpeGluX2F1dGhvcml6YXRpb25faWQiOiIxMDAxNyJ9.4NJ3cHK0sAlruaS9NjRIFj1Rf2IF4Z-hhmiUDjq4TLY'
                    },
                    data:data,
                    responseType:'json',
                    withCredentials:true
                }).then(function(res){ 
                    let msg = res.data.data
                    if(msg.code == 0){
                        if(msg.data == 'user'){
                            this.$router.push({path: '/home'}); 
                        }else if(msg.data == 'service'){
                            console.log(that.LayerPw);
                            that.$parent.layerPwhide = true;
                            that.$parent.layerhide = false
                        }
                    }else{
                        
                    }
                }).catch(function(err){
                    // that.loadingState = "加载失败"
                })
            },
            cancel(){
                let that = this;
                that.$parent.layerhide = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../../static/assets/css/px2rem.scss';
    .layer_warp{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        .layer_table{
            width: 100%;
            height: 100%;
            display: table;
            text-align: center;
        }
        .layer_table_cell{
            display: table-cell;
            vertical-align: middle;
        }
        .layer_box{
            width:px2rem(600);
            // height: px2rem(460);
            background-color: #fff;
            display: inline-block;
            border-radius:px2rem(10);
        }
        .layer_title{
            font-size:px2rem(30);
            color:#fff;
            height:px2rem(88);
            line-height:px2rem(88);
            background-color:#366931;
            border-top-left-radius: px2rem(10);
            border-top-right-radius: px2rem(10);
        }
        .layer_container{
            
        }
        .layer_footer{
            height:px2rem(90);
            border-top:1px solid #e0e0e0;
            display:flex;
            line-height:px2rem(90);
        }
        .layer_footer_cancel,.layer_footer_confirm,.layer_footer_cancel button,.layer_footer_confirm button{
            flex:1;
            border-right:1px solid #e0e0e0;
            text-align: center;
            font-size:px2rem(34);
            color:#007aff;
        }
        .layer_footer_confirm,.layer_footer_cancel button,.layer_footer_confirm button{
            border-right:0
        }
    }

    .register_box{
        padding:px2rem(40) px2rem(66) px2rem(76);
        input{
            font-size:px2rem(24);
            color:#cacaca;
            width:100%;
            height:px2rem(50);
            line-height:px2rem(50);
            padding:px2rem(10);
            border:1px solid #dddddd;
            border-radius:px2rem(10);
        }
        button{
            width:px2rem(142);
            height:px2rem(70);
            font-size:px2rem(24);
            color:#fff;
            line-height:px2rem(70);
            border-radius:px2rem(10);
            margin-left:px2rem(20);
            border:0;
            background-color: #afc3ad;
            &.action{
                background-color: #366931;
            }

        }
        .phone_number{
            display:flex;
            margin-bottom:px2rem(30);
            input{
                flex:0;
                width:px2rem(270);
            }
            button{
            }
        }
    }
</style>