 var comm = {
   onItemClick(index,ref,cls,data){

        var that = this;
        console.log(index);
        console.log(ref)
        console.log(cls)
        console.log(data)
        let els = this.$refs.ref.querySelectorAll(cls);
        for (let i = 0; i < els.length; i++) {
            that.data = index;
        }
    } 
}