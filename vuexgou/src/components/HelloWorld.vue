<template>
  <div class="hello">
    <h1>vuex购物车</h1>
    <h2>商品信息</h2>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>名称</th>
          <th>价格</th>
          <th>数量</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>{{item.number}}</td>
          <td>
            <p @click="add(item)" v-show="!item.flag"><button>添加购物车</button></p>
            <p v-show="item.flag"><button @click="jia(index)">+</button><button @click="
            n(index)">-</button></p>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>购物车信息</h2>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>名称</th>
          <th>价格</th>
          <th>数量</th>
          <th>总价</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in this.$store.state.cart" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>{{item.number}}</td>
          <td>{{item.number*item.price}}</td>
          <td>
            <button @click="jia(index)">+</button>
            <button @click="jian(index)">-</button>
            <button @click="del(index)">x</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>总数{{this.$store.state.cart.length}}总价{{this.$store.getters.count}}</h2>
    {{this.$store.state.cart}}
    {{list}}
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'HelloWorld',
  data () {
    return {
      list:[],
    }
  },
  methods:{
    add(item){
      item.flag=!item.flag
      let cart=this.$store.state.cart
      var index=cart.findIndex((i,k,arr)=>{
        return i.id==item.id
      })
      let obj={
        id:item.id,
        name:item.name,
        price:item.price,
        img:item.img,
        number:item.number,
        flag:item.flag
      }
      if(index==-1){
        this.$store.commit("addcart",obj)
      }else{
        this.$store.commit("addnum",obj)
      }
    },
    jia(index){
      this.$store.commit("jiaadd",index)
    },
    jian(index){
      this.$store.commit("jianadd",index)
      // if(this.$store.cart[index].number==0){
      //   this.list[index].flag=!this.list[index].flag
      // }
    },
    del(index){
      // this.list[index].flag=!this.list[index].flag
      this.$store.commit("deladd",index)
    }
  },
  mounted(){
    axios.get("/static/goods.json").then((res)=>{
      this.list=res.data
    })
  }
}
</script>

<style scoped>

</style>