<template>
    <div class="container">
        <div class="main">
                <h2>Register a New Admin</h2>
                <form v-on:submit.prevent="register">
                    <label for="username">Choose Username:</label>
                    <input type="text" id="regUsername" v-model="username">
                    <br>
                    <label for="password">Choose Password:</label>
                    <input type="password" id="regPassword" v-model="password">
                    <br>
                    <button type="submit" class="button">Register</button>
                 </form>
                 <p class="error">{{registerError}}</p>
            </div>
        </div>   
</template>

<script>
import axios from 'axios';
export default {
    name: 'Register',
    data () {
        return {
            username: '',
            password: '',
        }
    },

    
    computed: {
        registerError: function() {
            return this.$store.getters.registerError;
        },
     
    },


    methods: {
       register: function() {
           this.$store.dispatch('register',{
               username: this.username,
               password: this.password,
           }).then(response =>
           {
               this.username = '';
               this.password = '';
           })
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