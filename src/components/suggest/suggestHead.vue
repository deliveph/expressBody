<template>
    <div class="suggest-header">
        <div class="city-wrapper">
            <div class="city-content border-right-1px" >
                <div class="city-input-wrapper" v-show="isChoosed">
                    <input type="text" ref="tipinput" placeholder="请输入城市名或拼音" class="city-input" style="display: block;" v-model="suggestInputValue">
                </div>
            </div>
        </div>
        <div class="cancel-wrapper">
            <span class="text border-left-1px" @click="back_home">取消</span>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            suggestInputValue: ''
        }
    },
    computed: {
        ...mapState([
            'position',
            'isChoosed',
            'position'
        ])
    },
    watch: {
        suggestInputValue(newVal, odlVal) {
            if (newVal != odlVal) {
                this.$store.dispatch('autocomplete', newVal)
            }
        }
    },
    methods: {
        back_home() {
            this.$router.go(-1)
        },
        ...mapActions([
            'show_suggest',
            'close_suggest',
            'switch_input_city',
            'autocomplete'
        ])
    },
    components: {
    }
}
</script>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';

.suggest-header {
    position: relative;
    z-index: 10;
    display: flex;
    height: px2rem(90);
    white-space: nowrap;
    background: #fff;
    box-shadow: 0 2px 3px rgba(0, 0, 0, .12);
}

.suggest-header .city-wrapper {
    padding:0 px2rem(26);
    padding-right:0;
    width:px2rem(620);
}

.suggest-header .city-wrapper .city-content {
    /* height: 18px; */
    border:1px solid #ebeced;
    border-radius: px2rem(26);
    margin-top:px2rem(15)
}

.border-bottom-1px,
.border-left-1px,
.border-right-1px,
.border-top-1px {
    position: relative;
}

.suggest-header .city-wrapper .city-content .city-select {
    line-height: 18px;
    padding: 0 16px;
    font-size: 0;
}

.suggest-header .city-wrapper .city-content .city-select .text {
    margin-right: 4px;
}

.suggest-header .city-wrapper .city-content .city-select .text {
    display: inline-block;
    vertical-align: top;
    color: #666;
    font-size: 14px;
}

.suggest-header .address-wrapper {
    position: relative;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 10px;
}

.suggest-header .address-wrapper .address-input {
    display: table-cell;
    width: 100%;
    height: 14px;
    margin-top: -10px;
    padding: 15px 0;
    vertical-align: middle;
    font-size: 14px;
}

input {
    outline: 0;
    border: 0;
}

.suggest-header .address-wrapper .clear {
    position: absolute;
    right: 0;
    top: 14px;
}

.suggest-header .cancel-wrapper .text {
    display: inline-block;
    padding: 0 16px;
    margin-top: 15px;
    color: #999;
    font-size: 14px;
}

.border-bottom-1px,
.border-left-1px,
.border-right-1px,
.border-top-1px {
    position: relative;
}

.border-left-1px:before {
    border-left: 1px solid #f5f5f5;
    top: 0;
    left: 0;
    height: 100%;
}

.border-right-1px:before {
    content:'';
    width:px2rem(26);
    height:px2rem(26);
    background:url('/static/assets/images/btn_search.png') no-repeat center;
    background-size:px2rem(26);
    vertical-align: middle;
    display: inline-block;
    margin-top:px2rem(14);
    margin-right: px2rem(20);
    margin-left: px2rem(20)
}

.border-bottom-1px:after,
.border-bottom-1px:before,
.border-left-1px:after,
.border-left-1px:before,
.border-right-1px:after,
.border-right-1px:before,
.border-top-1px:after,
.border-top-1px:before {
    content: "";
    display: block;
    position: absolute;
    transform-origin: 0 0;
}

.suggest-header .city-wrapper .city-content .city-input-wrapper {
    width: px2rem(520);
    height: px2rem(56);
    padding-left:px2rem(60)
}

.suggest-header .city-wrapper .city-content .city-input-wrapper .city-input {
    display: table-cell;
    width: 100%;
    display: inline-block;
    // height: 14px;
    // margin-top: -13px;
    // padding: 15px 0;
    vertical-align: middle;
    height:px2rem(55);
    font-size: px2rem(28);
    background: transparent
}
</style>
