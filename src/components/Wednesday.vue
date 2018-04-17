<template>
    <div class="container">
        <div class="main">
            <h2>Activities On Wednesdays:</h2>
            <p v-show="filteredItems.length === 0">Submit a new activity <router-link to="/submit">here</router-link>.</p>
            <div id="activity" v-for="item in filteredItems">
                <a :href="item.link">{{item.text}}</a>
                <button v-on:click="deleteItem(item)" class="delete">X</button>
                <p><strong>{{item.time}}</strong></p>
                <p id="desc">{{item.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Wednesday',
    data () {
        return {
            items: []
        }

    },
    created: function() {
        this.getItems();
    },
    computed: {
        filteredItems: function() {
            return this.items.filter(function(item) {
            return item.day === 2;
            });
            return this.items;
        }
    },
    methods: {
        deleteItem: function(item) {
        axios.delete("/api/items/" + item.id).then(response => {
                this.getItems();
                return true;
            }).catch(err => {
            });
        },
        getItems: function() {
            axios.get("/api/items").then(response => {
                this.items = response.data;
                return true;
            }).catch(err => {
            });
        }

    }
}
</script>

<style scoped>

.container {
    padding: 20px 50px 50px 50px;
    display: grid;
    grid-template-rows: 40px 1fr 40px;
    grid-template-columns: 100% 100% 100%;
    grid-template-areas:
    "header"
    "main"
    "footer";
    grid-gap: 20px;
    font-size: 20px;
}

.main {
    grid-area: main;
    padding: 0px;
    min-height: 400px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.main p {
    max-width: 800px;
    
}

#desc {
    margin-bottom: 50px;
}

.delete {
    display: block;
    float: right;
    background-color: white;
    border:none;
    color:white;
    padding: 10px 15px;
    text-align: center;
    font-size: 16px;
    text-decoration: none;
    font-weight: 900;
}

#activity:hover .delete {
    background-color:#e5b121
}


h2 {
    font-size: 60px;
    color: #e5b121;
    font-weight: 800;
}

</style>