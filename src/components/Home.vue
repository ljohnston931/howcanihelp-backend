<template>
<div class="container">
            <div class="main">
                <div class="banner">
                    <img src="./yserve.jpg" alt="people serving" style="width:90%">
                    <div class="bottom-left">How can I help?</div>
                </div>
                <p id="subtitle"><em>An easy way to find volunteer opportunities in Provo, Utah</em></p>
                <router-link class="button" to="/submit">Get Started</router-link>
            </div>
        </div>   
</template>

<script>
import axios from 'axios';
export default {
    name: 'Home',
    data () {
        return {
            items: [],
        
        }
    },
    computed: {
        notCommittedItems: function() {
            if (this.show === 'notCommitted')
                return this.items.filter(function(item) {
                    return !item.committed;
                });
        },
        filteredItems: function() {
            if (this.show === 'notCommitted')
            return this.items.filter(function(item) {
                return !item.committed;
            });
            if (this.show === 'committed')
            return this.items.filter(function(item) {
                return item.committed;
            });
            return this.items;
        },
    },
    created: function() {
        this.getItems();
    },
    methods: {
        getItems: function() {
            axios.get("/api/items").then(response => {
                this.items = response.data;
                return true;
            }).catch(err => {
            });
        },
        addItem: function() {
            axios.post("/api/items", {
                text: this.text,
                committed: false
            }).then(response => {
                this.text = "";
                this.getItems();
                return true;
            }).catch(err => {
            });
        },
        commitItem: function(item) {
            axios.put("/api/items/" + item.id, {
                text: item.text,
                committed: !item.committed
            }).then(response => {
                return true;
            }).catch(err => {
            });
        },
        deleteItem: function(item) {
            axios.delete("/api/items/" + item.id).then(response => {
                this.getItems();
                return true;
            }).catch(err => {
            });
        },
        showAll: function() {
            this.show = 'all';
        },
        showNotCommitted: function() {
            this.show = 'notCommitted';
        },
        showCommitted: function() {
            this.show = 'committed';
        }
    }
}
</script>

<style scoped>

.container {
    color: #303846;
    /*background-color: #f5f5f5; how to implement this correctly?*/
    font-size: 16px;
    font-family: 'Monserrat', sans-serif;
    padding: 20px 50px 50px 50px;
   /* display: grid;
    grid-template-rows: 40px 1fr 40px;
    grid-template-columns: 100% 100% 100%;
    grid-template-areas:
    "header"
    "main"
    "footer";
    grid-gap: 20px; */
    font-size: 20px;
}

.banner {
    margin-top: 30px;
    position: relative;
    z-index: 1000;
    text-align: center;
    color:#e5b121;
    font-size:  110px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;

}

.bottom-left {
    position: absolute;
    bottom: 30px;
    max-width: 80%;
    margin-left: 15%;
}
.main {
    grid-area: main;
    padding: 0px;
    min-height: 400px
}

.main p {
    max-width: 800px;
    
}

#subtitle{
    font-size: 40px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    max-width: 90%;
}

.button {
    background-color: #e5b121;
    border:none;
    color:#f5f5f5;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
}

.footer {
    grid-area: footer;
    text-align: center;
}

h2 {
    font-size: 60px;
    color: #e5b121;
}

.box {
    width: 300px;
    height: 30px;
    display: block;
}
</style>