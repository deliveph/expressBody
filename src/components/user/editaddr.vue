<template>
    <div class="wrapper">
        <div class="edit-wrapper mt20 content">
            <div class="edit-item">
                <div class="edit-des col-2">省市区</div>
                <div class="edit-addr col-8 tr">
                    <span>请选择</span>
                    <i class="arrow-right"></i>
                </div>
            </div>
            <div class="edit-item">
                <div class="edit-des col-2">小区名称</div>
                <div class="edit-addr col-8 t-l">
                    <input type="text" placeholder="请输入小区名">
                </div>
            </div>
            <div class="edit-item">
                <div class="edit-des col-2">小区名称</div>
                <div class="edit-addr col-8 t-l">
                    <textarea placeholder="请输入单元、房号等详细内容"></textarea>
                </div>
            </div>
        </div>
        <div class="edit-commit content">
            <button class="commit-btn">保存</button>
        </div>
    </div>
</template>
<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>