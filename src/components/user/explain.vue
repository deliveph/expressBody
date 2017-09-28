<template>
    <div class="wrapper">
        <div class="cen-list">
            <div class="cen-item">
                <ul class="some-item">
                     <li v-for="item in data"> 
                        <router-link :to="{path:'/detail',query: {type: 'user',id: item.readme_id}}"> 
                            <span>{{ item.readme_title }}</span> 
                            <em><i class="arrow-right"></i></em> 
                        </router-link> 
                    </li> 
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data() { 
            return { 
                data: {} 
            } 
        }, 
        created() { 
            let that = this 
            this.http(that.configs.apiTop + '/page/readme', "get", '', function (res) { 
                let msg = res.data 
                if(msg.code == 0){ 
                    that.data = msg.data.readme 
                }else if(msg.code == 40004){ 
                    that.$vux.toast.text(msg.message, 'middle', 100); 
                }else{ 
                    that.$vux.toast.text(msg.message, 'middle', 100); 
                } 
            }) 
        } 
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>