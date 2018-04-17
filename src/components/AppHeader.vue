<template>
    <div class="header">
        <ul id="menu">
            <li><router-link to="/">Home</router-link></li>
            <li>
                    <router-link to="/which_day">Days<i class="fa fa-angle-down" aria-hidden="true"></i></router-link>
                    <ul class="hidden">
                        <li><router-link to='/monday'>Monday</router-link></li>
                        <li><router-link to='/tuesday'>Tuesday</router-link></li>
                        <li><router-link to='/wednesday'>Wednesday</router-link></li>
                        <li><router-link to='/thursday'>Thursday</router-link></li>
                        <li><router-link to='/friday'>Friday</router-link></li>
                        <li><router-link to='/saturday'>Saturday</router-link></li>
                        <li><router-link to='/sunday'>Sunday</router-link></li>
                  </ul>
                </li>
            <li><router-link to='/submit'>Submit</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<style scoped>

.header {
    font-size: 20px;
    padding: 20px 50px 50px 50px;
    grid-area: header;
    padding:0px;
    height:40px;
    position: relative;
    z-index: 3000;
}
.header ul {
    list-style-type:none;
    margin:0;
    padding:0;
    position:absolute;

}

.header li {
    display:inline-block;
    float: left;
    margin-right:10px;
}

.header li a {
    display: block;
    min-width: 140px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    text-decoration: none;
    background-color: #4e595d;
    color: #f5f5f5;
}

.here  {
    background-color: #e5b121 !important;
}

.header a:hover {
    background: #e5b121;
}

.header li:hover ul a {
    background-color: #4e595d;
    color: #f5f5f5;
    height: 40px;
    line-height: 40px;
}

.header li:hover ul a:hover {
    background-color: #e5b121;
}

.header li ul {
    display: none;
}

.header li ul li {
    display: block ;
    float: none;
    z-index: 1000;
}

.header ul li a:hover + .hidden, .hidden:hover {
    display: block;
}

.box {
    width: 300px;
    height: 30px;
    display: block;
}
</style>