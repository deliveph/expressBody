<template>
    <div class="wrapper">
        <tab :line-width=2 v-model="index">
            <tab-item class="vux-center" v-for="(item, index) in lists" :key="index">
                <span>{{item}}</span>
            </tab-item>
        </tab>
        <div class="address-wrapper" v-model="index">
            <v-address v-if="index == 0">
            </v-address>
            <v-address2 v-else></v-address2>
        </div>
        
    </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
import address from '../addressitem'
import address2 from '../addressitem2'
const list = () => ['寄件地址', '收件地址']
export default {
    components: {
        Tab,
        TabItem,
        'v-address': address,
        'v-address2':address2
    },
    data() {
        return {
            lists: list(),
            index: 0
        }
    },
    created(){
        let types = this.$route.params.attribute;
        if(types == 'shipper'){
            this.index = 0;
        }else{
            this.index = 1;
        }
    }
}
</script>
<style lang="scss" scoped src="../../../static/assets/css/user.scss"></style>
<style lang="scss">
@import '../../../static/assets/css/px2rem.scss';

.vux-tab .vux-tab-item.vux-tab-selected {
    color: #366931 !important;
    border-bottom: none !important;
}

.vux-tab .vux-tab-item.vux-tab-selected span {
    border-bottom: 3px solid #366931 !important;
    padding-bottom: px2rem(14)
}

.vux-tab-ink-bar {
    background-color: none !important
}

.vux-tab-item+.vux-tab-ink-bar {
    display: none !important;
}

.vux-slider>.vux-swiper {
    min-height: -webkit-fill-available;
}

.vux-slider>.vux-swiper {
    overflow: auto !important;
    position: relative;
}
</style>