<template>
    <div>
        <ul>
            <li v-for="(item,index) in this.$store.state.list" :key="index">
                <input type="checkbox" >
                <img :src="require('../assets/img/'+item.productImage)" alt="">
                <h3>{{item.productName}}</h3>
                <p>{{item.salePrice}}</p>
                <button @click="del(index)">删除</button>
            </li>
        </ul>
        <input type="checkbox" @click="chack">
    </div>
</template>

<script>
export default {
    name:"Shop",
    data(){
        return{
            list:[]
        }
    },
    methods:{
        del(index){
            this.$store.commit("deladd",index)
        },
        chack(){

        }
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    list-style:none;
}
li{
    width: 500px;
    display: flex;
}
li img{
    width: 50px;
    height: 50px;
}
</style>
