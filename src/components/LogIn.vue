<template>
    <div class="container">
        <div class="main">
                <h2>Login as an admin:</h2>
                <h3>(try: admin 1234)</h3>
                <form v-on:submit.prevent="login">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="username">
                    <br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="password">
                    <br>
                    <button type="submit" class="button">Login</button>
                 </form>
                 <p class="error">{{loginError}}</p>
            </div>
        </div>   
</template>

<script>
import axios from 'axios';
export default {
    name: 'LogIn',
    data () {
        return {
            username: '',
            password: '',
        }
    },

    
    computed: {
        loginError: function() {
            return this.$store.getters.loginError;
        },
     
    },


    methods: {
       login: function() {
        console.log("before: ", this.$store.getters.loggedIn);
           this.$store.dispatch('login',{
               username: this.username,
               password: this.password,
           }).then(user => {
               this.username = '';
               this.password = '';
           });
        console.log("after: ", this.$store.getters.loggedIn);
       }
    }
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-rows: 40px 1fr 40px;
    grid-template-columns: 100% 100% 100%;
    grid-template-areas:
    "header"
    "main"
    "footer";
    grid-gap: 20px;
}

input {
    margin-bottom: 15px;
}

select {
    margin-bottom: 15px;
}

.main {
    grid-area: main;
    padding: 0px;
    min-height: 400px
}

.main p {
    max-width: 800px;
    
}

.button {
    font-family: "Montserrat";
    font-weight: 500;
    font-size: 20px;
    background-color: #e5b121;
    border:none;
    color:#f5f5f5;
    padding: 15px 32px;
    text-align: center;
    display:inline-block;
    text-decoration: none;
}

h2 {
    font-size: 60px;
    color: #e5b121;
}

input {
    width: 300px;
    height: 30px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
}

select {
    width: 300px;
    height: 30px;
    font-size: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
}
</style>