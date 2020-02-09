<template>
  <div id="app">
    <div class="nav">
      <img src="" alt="">
      <span>{{chengshi}}</span>
      <span>登录|注册</span>
    </div>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'App',
  data(){
    return{
      chengshi:[]
    }
  },
  mounted(){
    axios.get("https://elm.cangdu.org/v2/pois/45.761089,126.631908").then((res)=>{
        console.log(res.data)
        this.chengshi=res.data.name
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.nav{
  width: 100%;
  line-height: 50px;
  background: blue;
  color: white;
  display: flex;
}
</style>
