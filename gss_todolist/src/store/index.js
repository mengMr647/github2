import Vue from "vue"
import vuex from "vuex"
Vue.use(vuex)
let store=new vuex.Store({
    state:{
        list:[]
    },
    mutations:{
        //添加到购物车页面
        addcart(state,obj){
            state.list.push(obj)
        },
        //如果有数据就让商品数量+1
        addnum(state,index){
            state.list[index].number++
        },
        deladd(state,index){
            state.list.splice(index,1)
        }
    },
    getters:{
        count(state){
            let sum=0
            for(var i in state){
                sum+=state.list[i].salePrice*state.list[i].number
            }
            return sum 
        }
    }
})
export default store