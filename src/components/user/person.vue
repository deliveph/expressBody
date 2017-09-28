<template>
    <div class="wrapper">
        <div class="person">
            <div class="person-c">
                <ul>
                    <li class="pes-avatar">
                        <div class="avatar_row">
                            <span>头像</span>
                            <em>
                                <span class="avatar"><img v-bind:src="avatar" alt=""></span>
                                <i class="arrow-right"></i>
                            </em>
                            <input type="file" name="file" value="" @change="onFileChange">
                        </div>
                    </li>
                    <li>
                        <router-link :to="{path:'/name',query: {type:type}}">
                            <span>真实姓名</span>
                            <em>
                                <span>{{name}}</span>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <span>联系电话</span>
                            <em>
                                <span>{{phone}}</span>
                            </em>
                        </router-link>
                    </li>
                    <li>
                        <router-link v-if="type == 'service'" to="" href="javascript:;">
                            <span>联系地址</span>
                            <p>{{address}}</p>
                            
                        </router-link>
                        <router-link to="/editaddr" v-else>
                            <span>联系地址</span>
                            <p>{{address}}</p>
                            <em>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                        
                    </li>
                    <!--快递宝宝端-->
                    <li v-if="serve">
                        <router-link to="">
                            <span>我的评分</span>
                            <em>
                                <span>{{ score }}</span>
                            </em>
                        </router-link>
                    </li>
                    <li v-if="serve">
                        <router-link to="/modifypwd">
                            <span>修改密码</span>
                            <em>
                                <span></span>
                                <i class="arrow-right"></i>
                            </em>
                        </router-link>
                    </li>
                    <!--快递宝宝端-->
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            avatar: '/static/assets/images/icon_success.png',
            name: '',
            phone: '',
            address: '',
            score: '',
            serve: false,
            type:''
        }
    },
    methods: {
        onFileChange(e) {
            let that = this
            var files = e.target.files || e.dataTransfer.files
            if (!files.length)
                return;
            var formData = new FormData()
            formData.append('file', e.target.files[0])
            formData.append('type', 'test')
            /* 如果头部类型为service */
            if(this.type == 'service'){
                this.http(that.configs.apiUpload + "/upload", "post", formData, function (res) {
                    let msg = res.data
                    if(msg.code == 0){
                        that.avatar = msg.data.uri
                        let data = qs.stringify({
                            'service_avatar':that.avatar
                        })
                        that.http(that.configs.apiTop + "/service/update-profile-avatar","post", data, function(res){
                            let avatar = res.data
                            if(avatar.code == 0){

                            }else if(avatar.code == 40004){
                                // location.href = that.configs.accreditUrl
                            }
                        })
                    }else if(msg.code == 40004){
                        // location.href = that.configs.accreditUrl
                    }
                })
                return
            }
            this.http(that.configs.apiUpload + "/upload", "post", formData, function (res) {
                let msg = res.data
                if(msg.code == 0){
                    that.avatar = msg.data.uri
                    let data = qs.stringify({
                        'user_avatar':that.avatar
                    })
                    that.http(that.configs.apiTop + "/user/update-profile-avatar","post", data, function(res){
                        let avatar = res.data
                        if(avatar.code == 0){

                        }else if(avatar.code == 40004){
                            // location.href = that.configs.accreditUrl
                        }
                    })
                }else if(msg.code == 40004){
                    // location.href = that.configs.accreditUrl
                }
            })
        }
    },
    created() {
        let that = this
        this.type = this.$route.query.type
        
        if(this.type == 'service'){
            that.serve = true
            this.http(that.configs.apiTop + "/service/profile", "get", '', function(res) {
                let msg = res.data
                let data = msg.data
                if (msg.code == 0) {
                    console.log(data)
                    that.avatar = data.service_avatar
                    that.name = data.service_nickname
                    that.phone = data.service_phone
                    that.address = data.service_full_address
                    that.score = data.service_score
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                }
            })
        }else{
            this.http(that.configs.apiTop+"/user/profile", "get", '', function(res) {
                let msg = res.data
                let data = msg.data
                if (msg.code == 0) {
                    that.avatar = data.user_avatar
                    that.name = data.user_nickname
                    that.phone = data.user_phone
                    that.address = data.user_address
                } else if (msg.code == 40004) {
                    // location.href = that.configs.accreditUrl
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style>
.person .person-c ul li a > p{
    margin-top: 0 !important;
}
</style>