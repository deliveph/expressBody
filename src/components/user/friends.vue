<template>
    <div class="wrapper">
        <div class="invite-wrapper" v-if="invite_users.length != 0">
            <h4><span>已邀请<i class="ft-red">{{ data.user_total_invite }}</i>人</span><span class="ml60">已获得<i class="ft-red">{{ data.user_total_invite_reward }}</i>快递豆</span></h4>
            <table class="invite-table">
                <thead>
                    <tr>
                        <th>账号</th>
                        <th>注册时间</th>
                        <th>奖励</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in invite_users" :key="item">
                        <td>{{ item.to_user_phone }}</td>
                        <td>{{ item.from_user_create_time }}</td>
                        <td>{{ item.from_user_reward }}快递豆</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="no-friends" v-else>
            <img src="/static/assets/images/no_friend.png" alt="">
            <p>你还没有好友哦，快去邀请吧</p>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                page: 1,
                data: {},
                invite_users:[]
            }
        },
        created() {
            let that = this
            this.http(that.configs.apiTop + "/user/invite-users?page=" + this.page, "get", '', function (res) {
                let msg = res.data
                if(msg.code == 0){
                    let data = msg.data
                    that.data = msg.data
                    that.invite_users = data.invite_users
                }
            })
        }
    }
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>