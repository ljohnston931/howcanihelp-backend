<template>
  <div id="app">
    <app-header/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
export default {
  name: 'App',
  components: { AppHeader, AppFooter }
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
