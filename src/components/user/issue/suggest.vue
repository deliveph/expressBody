<template>
    <div class="advise-info">
        <div class="advise-info-box">
            <div class="advise-item">
                <p>请选择你要反馈的意见类型(必填)</p>
                <ul class="choice">
                    <li>产品功能</li>
                    <li>页面展示</li>
                    <li>系统使用</li>
                    <li>新版建议</li><li>新版建议</li>
                </ul>
                <input type="hidden" value="">
            </div>
            <div class="advise-item">
                <p>请选择你要反馈的意见类型(必填)</p>
                <div class="matter">
                    <textarea placeholder="请输入产品功能/系统意见，感谢您的反馈我们将不断优化体验"></textarea>
                    <div class="num"><span>0</span><em>/</em><span>30</span></div>
                </div>
            </div>
            <div class="advise-item mt46">
                <div class="save-box">
                    <div class="upload">
                        <input type="file" >
                        <span></span>
                    </div>
                    <ul>
                        <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                        <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                        <li><img src="http://jindou.oss-cn-shenzhen.aliyuncs.com/goods/201706295954d01af227e.jpg" alt=""></li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="commit">
            <button disabled>提交</button>
        </div>
    </div>
</template>

<script>
    export default{}
</script>
<style lang="scss" scoped src="../../../../static/assets/css/user.scss"></style>
