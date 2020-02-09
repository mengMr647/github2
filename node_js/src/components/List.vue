<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <img :src="item.author.avatar_url" >
                {{item.reply_count}}/{{item.visit_count}}
                {{item.title}}
            </li>
        </ul>
        {{list}}
    </div>
</template>

<script>
import axios from "axios"
export default {
    name:"List",
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        let id=this.$route.query.id
        axios.get("https://cnodejs.org/api/v1/topics/").then((res)=>{
            var index=res.data.data.filter((item)=>{
                return item.id==id
            })
            this.list=index
        })
    }
}
</script>

<style>
img{
    width: 20px;
    height: 20px;
}
</style>
