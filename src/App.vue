<template>
  <div id="app">
    <a-h/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import AH from './components/AH';
import AppFooter from './components/AppFooter';
export default {
  name: 'App',
  components: { AH, AppFooter }
}
</script>

<style>
#app {
  color: #303846;
  /*background-color: #f5f5f5;*/
  font-size: 16px;
  padding: 20px 50px 50px 50px;
  font-family: "Montserrat";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
}
</style>
