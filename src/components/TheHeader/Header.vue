<template>
  <div class="header">
    <div class="left">
      {{$t('message.company')}}
    </div>
    <div class="right">
      <Right />
       <div class="lang">
        <i18nDropdown :isTop="true"/>
      </div>
    </div>
  </div>
</template>

<script >

  import Right from "./Right";
import i18nDropdown from '../i18nDropdown'

  
  export default{
    name: 'Header',
    components:{
      Right,
      i18nDropdown
    }
  }

</script>

<style scoped>
.header{
  height: 80px;
  background-color: rgba(0, 63, 96, 1);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.left{
  height: 80px;
  line-height: 80px;
  font-size: 22px;
  font-weight: 700;
}
.right {
  display: flex;
  line-height: 80px;
  cursor: pointer;
}
.lang{
  margin-left: 24px;
}
</style>