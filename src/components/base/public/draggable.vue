<template>
    
</template>

<script>
import draggable from 'vuedraggable'
export default {
    data(){
        return{
            tags:''
        }
    },
    components:{
        draggable
    },
    methods: {
      getdata (evt) {
        console.log(evt.draggedContext.element.id)
      },
      datadragEnd (evt) {
        console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)
        console.log(this.tags)
      }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
