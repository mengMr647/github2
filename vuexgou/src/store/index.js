import Vue from "vue"
import vuex from "vuex"
Vue.use(vuex)
let store=new vuex.Store({
    state:{
        cart:[]
    },
    mutations:{
        //添加到购物车页面
        addcart(state,obj){
            state.cart.push(obj)
        },
        //如果有数据就让商品数量+1
        addnum(state,index){
            state.cart[index].number++
        },
        //增加购物车的数量
        jiaadd(state,index){
            state.cart[index].number++
        },
        //减少购物车的数量
        jianadd(state,index){
            if(state.cart[index].number==1){
                return state.cart.splice(index,1)
            }
            state.cart[index].number--
        },
        //删除购物车数据
        deladd(state,index){
            state.cart.splice(index,1)
        }
    },
     //计算属性
     getters:{
        count(state){
            let count=0
            for(var i in state.cart){
                count+=state.cart[i].number*state.cart[i].price
            }
            return count
        }
    },
})
export default store