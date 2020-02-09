<template>
    <div class="app">
        <ul class="shenti">
            <li v-for="(item,index) in list" :key="index">
                <router-link class="list" :to="'http://elm.cangdu.org/shopping/restaurant/'+item.id">
                    <div class="left">
                        <div>
                            <img :src="'https://elm.cangdu.org/img/'+item.image_path" >
                        </div>
                        <div>
                            <h3><span class="pinpai">品牌</span>{{item.name}}</h3>
                            <span>{{item.rating}}月售{{item.recent_order_num}}单</span>
                            <br>
                            <span>￥20起送/{{item.piecewise_agent_fee.tips}}</span>
                        </div>
                    </div>
                    <div class="rigan">
                        <span>保准票</span>
                        <br>
                        <span>蜂鸟专送</span><span>准时达</span>
                        <br>
                        <span>{{item.distance}}/{{item.order_lead_time}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
        <ul>
            <router-link to="/Waimai" tag="li">外卖</router-link>
            <router-link to="/Sousuo" tag="li">搜索</router-link>
            <router-link to="/Dingdan" tag="li">订单</router-link>
            <router-link to="/Wode" tag="li">我的</router-link>
        </ul>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"Waimai",
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        axios.get("https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762").then((res)=>{
            console.log(res.data)
            this.list=res.data
        })
    }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,.app{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.shenti{
  flex: 1;
}
.list{
    display: flex;
    justify-content:space-around;
    .left{
        width: 500px;
        display: flex;
        img{
            width: 100px;
            height: 100px;
        }
        .pinpai{
            background: yellow; 
            font-size: 5;
        }
    }
    .rigan{
        width: 200px;
    }
}


</style>
