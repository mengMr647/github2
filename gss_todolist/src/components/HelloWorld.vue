 <template>
   <div class="rules">
        <router-link to="/Shop">购物车</router-link>
        <p class="drop-down" v-if="dropDown">松手刷新数据...</p>
        <div class="bscroll" ref="bscroll">
            <div class="bscroll-container">
             <div class="top">
               <span class="top_txt">sort by <button @click="sort_default"> Default </button> price <button @click="sort_change">||</button></span>
             </div>

             <div class="bottom">
                    <div class="left">
                         <ul>
                           <li @click="fn('all')" :class="{bg:tip=='all'}">all</li>
                           <li v-for='(item,index) in price' :key='index' @click="fn(index)" :class="{bg:tip==index}">{{item.a}}-{{item.b}}</li>
                          
                         </ul>
                    </div>
                    <div class="right" ref='box'>
                           <!-- <div class="val" v-for='(item,index) in list' :key='index'>
                                 {{item}}
                           </div> -->
                           <div class="val" v-for='(item,index) in list' :key='index'>
                             <img :src="require('../assets/img/'+item.productImage)" alt="">

                             <h3>{{item.productName}}</h3>
                             <p>{{item.salePrice}}</p>
                             <button @click="add(item)">加入购物车</button>
                           </div>

                          
                    </div>
             </div>

            </div>
        </div>
        <p class="x" v-if='up'>加载更多...</p>
 
  </div>
</template>


<script>
import a from '../assets/json/data.json' 
import b from "../assets/json/data2.json"
import c from '../assets/json/data3.json'
import BScroll from 'better-scroll'
import  Untils from '../untils/index'

 export default {
    name:'HelloWorld',
    components: {
  
    },
    data () {
      return {
            dropDown:false,  //是否显示下拉刷新
            up:false,        //是否显示上拉加载
            list:null,
            price:[{a:'0.00',b:'100.00'},{a:'100.00',b:'500.00'},{a:'500.00',b:'1000.00'},{a:'1000.00',b:'2000.00'}],
            tip:'all',
            sort_tip:false,  //排序
            num:1
    }
    },
    created(){
       console.log(a);
       this.list=a.result.list;
       this.refs.a.style.height=window.innerHeight+'px'   
    },
   mounted(){
        this.scrollFn()
    },
    methods:{
        add(item){
            let list=this.$store.state.list
            var index=list.findIndex((i,k,arr)=>{
                return item.productId==i.productId
            })
            let obj={
                productName:item.productName,
                salePrice:item.salePrice,
                productImage:item.productImage,
                number:1,
                check:false
            }
            if(index==-1){
                this.$store.commit("addcart",obj)
            }else{
                this.$store.commit("addnum",obj)
            }
        },
        fn(index){
            this.tip=index;
             console.log(typeof index);
             this.list=[...a.result.list,...b.result.list];
             if(typeof index=='string'){  // index=='all'

             }else{  //'number'   0 ,1, 2,3
               
               var di=this.price[index].a;
               var gao=this.price[index].b;
                this.list=this.list.filter((val)=>{
                   if(val.salePrice>=di&&val.salePrice<=gao){
                     return val;
                   }
               })
             
             }
        },
        sort_default(){   //默认排序
           this.list=a.result.list;
        },
        sort_change(){
      
            this.sort_tip=!this.sort_tip;
          //   this.list.sort((a,b)=>{
          //      if(this.sort_tip){
          //         return b.salePrice-a.salePrice
          //      }else{
          //        return a.salePrice-b.salePrice
          //      }
          // })
            this.list=Untils.arrSory(this.list,'salePrice',this.sort_tip)
        },
        scrollFn(){
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.bscroll, {
                        click: true,
                        scrollY: true,
                        probeType: 3
                    });
                }else{
                    this.scroll.refresh();
                }
                this.scroll.on('scroll', (pos) => {
                    console.log(pos.y,this.dropDown)
                    //如果下拉超过50px 就显示下拉刷新的文字
                    if(pos.y>50){
                        this.dropDown = true
                    }else{
                        this.dropDown = false
                    }
                })
                //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if(pos.y > 50){
                        console.log("下拉刷新成功")
                        this.dropDown = false
                    }
                    //上拉加载 总高度>下拉的高度+10 触发加载更多
                    if(this.scroll.maxScrollY>pos.y+20){
                        console.log("加载更多")
                        this.up=true;
                         setTimeout(()=>{
                        //使用refresh 方法 来更新scroll  解决无法滚动的问题

                        // [{},{},{},{},{}]
                        this.list.push(...b.result.list)
                        this.scroll.refresh();
                        this.up=false;
                        },1000)
                       
                    }
                    console.log(this.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
                })
                console.log(this.scroll.maxScrollY)
            });
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bscroll{
    width: 100%;
    height:600px;
    overflow: hidden;
}
.bscroll-container{
    /* background: #ff0000; */
}
.drop-down{
    position: absolute;
    top:0px;
    lefT:0px;
    width: 100%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:20px;
    color:white;
    z-index:999;
}
.x{
     width: 100%;
    height: 50px;
    line-height:50px;
    text-align: center;
    font-size:20px;
    color:white;
      z-index:999;
}
.top{
  width: 100%;
  height: 50px;
  background: white;
}
.bottom{
  width: 100%;
  background: #ccc;
  display: flex;
  justify-content: space-around;
  margin-top:20px; 
}
.left{
  width: 20%;
  height: 400px;
  background: white;
}
.right{
  width: 70%;
  /* height: 400px; */
  background: white;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.val{
  margin-top: 20px;
  width: 200px;
  height: 300px;
  border: 1px solid black;
}
.val img{
  width:180px;
  height: 200px; 
}
ul,li{
  list-style: none;
}
li{
  margin: 10px;
}
li.bg{
  border-left: 2px solid red;
}
.top_txt{
  float: right;
  line-height: 50px;
  padding-right: 50px;
}
</style>
