<template>
    <div class="wrapper">
        <div class="person">
            <div class="person-c">
                <ul>
                    <li class="pes-avatar">
                        <router-link to="">
                            <span>头像</span>
                            <em><span class="avatar"><img src="/static/assets/images/icon_success.png" alt=""></span><i class="arrow-right"></i></em>
                            <input type="file">
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/name">
                            <span>真实姓名</span>
                            <em><span>陈宇凡</span><i class="arrow-right"></i></em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <span>联系电话</span>
                            <em><span>1511111111</span></em>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/editaddr">
                            <span>联系地址</span>
                            <em><i class="arrow-right"></i></em>
                        </router-link>
                        <p>深圳市南山区高新园大冲国际商务中心5号楼501深圳市南山区高新园大冲国际商务中心5号楼501深圳市南山区高新园大冲国际商务中心5号楼501</p>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>