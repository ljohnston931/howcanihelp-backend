<template>
    <div class="container">
        <div class="main">
                <h2>Submit a new activity:</h2>
                <form v-on:submit.prevent="activity">
                     <label for="title">Activity Title:</label>
                    <input type="text" id="title" v-model="text">
                    <br>
                    <label for="doweek">Day of the Week:</label>
                    <select id="doweek" v-model="day" name="day">
                        <option value='0'>Monday</option>
                        <option value='1'>Tuesday</option>
                        <option value='2'>Wednesday</option>
                        <option value='3'>Thursday</option>
                        <option value='4'>Friday</option>
                        <option value='5'>Saturday</option>
                        <option value='6'>Sunday</option>
                    </select>
                    <br>
                    <label for="link">Website URL:</label>
                    <input type="text" id="link" v-model="link">
                    <br>
                    <label for="time">Time of Activity:</label>
                    <input type="text" id="time" v-model="time">
                    <br>
                    <label for="description">Activity Description:</label>
                    <input type="text" id="description" v-model="description">
                    <br>
                    <button type="submit" class="button">Submit</button>
                 </form>
            </div>
        </div>   
</template>

<script>
import axios from 'axios';
export default {
    name: 'Add',
    data () {
        return {
            items: [],
            text: '',
            day: '',
            link: '',
            time: '',
            description: ''
        }
    },

    /*created: function() {
        this.$store.dispatch('getActivities');
    },*/
    
    computed: {
        /*notCommittedItems: function() {
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
        },*/
        /*day: function() {
            return parseInt(this.dayText);
        },*/
        activities: function() {
            return this.$store.getters.activities;
        },
    },


    methods: {
       /* getItems: function() {
            axios.get("/api/items").then(response => {
                this.items = response.data;
                return true;
            }).catch(err => {
            });
        },
        addItem: function() {
            axios.post("/api/items", {
                text: this.text,
                committed: false,
                day: this.day,
                link: this.link,
                time: this.time,
                description: this.description

            }).then(response => {
                this.text = "";
                this.dayText = '';
                this.link = '';
                this.time = '';
                this.description = '';
                this.getItems();
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
        },*/
        activity: function() {
            this.$store.dispatch('addActivity',{
                name: this.text,
                link: this.link,
                day: this.day,
                time: this.time,
                description: this.description,
            }).then(response => {
                this.text = "";
                this.day = '';
                this.link = '';
                this.time = '';
                this.description = '';
                return context.dispatch('getActivities');
            }).catch(err => {
            });
        },
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