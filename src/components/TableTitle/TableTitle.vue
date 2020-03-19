<template>
  <div class="tableTitleList">
    <el-menu
      :default-active=" defaultIndex || activeIndex "
      class="el-menu-demo"
      mode="horizontal"
      background-color="rgba(228, 228, 228, 1)"
      text-color="#333"
      active-text-color="#333"
      @select="selectItems"
    >
      <el-menu-item v-for="(item,index) in tableTitles " :key="index" :index="item.index">
          <div class="line">|</div>
          {{$t(item.name)}}
          </el-menu-item>
    </el-menu>
  </div>
</template>

<script >
import {mapState,mapGetters,mapActions} from 'vuex'; 
export default {

  name: 'TableTitle',
  props:{
      tableTitles:{
        type: Array,
        required: true
      },
      activeIndex:{
        type: String,
        required: true
      }
  },
  data() {
    return {
     
    }
  },
  mounted(){
    
  },
  methods:{
    selectItems(index){
       sessionStorage.setItem("activeIndex",index)
      // console.log(index)
      this.$store.commit("setActiveIndex",index)
      console.log(this.defaultIndex)
      // this.$store.state.activeIndex = index
    //  console.log( sessionStorage.getItem("activeIndex") )
    }
  },
  computed:{
    defaultIndex(){
      return  (this.$store.state.activeIndexTable || sessionStorage.getItem("activeIndex"))
    }
  }
}
</script>

<style scoped>

.el-menu{
    /* text-align: center; */
  display: flex;
}
.el-menu-item{
    font-size: 16px;
    flex: 1;
    display: flex;
    text-align: center;
    padding: 0;
    margin: 0 30px;
   
}
.el-menu--horizontal>.el-menu-item.is-active{
    /* border-bottom: 2px solid #333; */
    font-weight: 700;
    
}

.line{
  width: 2px;
  height: 100%;
  color: #333;
  position: absolute;
  left: -30px;
  font-weight: normal;
}
.el-menu-item:first-child .line{
  display: none;
}
  
</style>