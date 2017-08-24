<template>
    <div class="shareShade por hide">
        <div class="shareShade_main">
            <img src="/static/assets/images/icon_guidance.png" class="shade_arrow poa">
            <img src="/static/assets/images/icon_wenzi.png" class="shade_text poa">
            <img src="/static/assets/images/btn_confirm.png" class="shade_btn poa">
        </div>
    </div>
</template>

<script>
    export default{

    }
</script>

<style lang="scss">
    @import '../../../../static/assets/css/px2rem.scss';
    .shareShade{
        width:100%;
        height:100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }
    .shareShade_main{

    }
    .shade_arrow{
        width:px2rem(128);
        height:px2rem(168);
        right:px2rem(60);
    }
    .shade_text{
        width:px2rem(532);
        height:px2rem(62);
        top:px2rem(168);
        left:0;
        right:0;
        margin:0 auto;
    }
    .shade_btn{
        top:px2rem(448);
        width:px2rem(246);
        height:px2rem(120);
        left:0;
        right:0;
        margin:0 auto;
    }
</style>