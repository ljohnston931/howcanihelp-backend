<template>
    <div class="container">
        <div class="main">
            <h2>Delete Activities:</h2>
            <p v-show="activities.length === 0">There aren't any activities yet. Add one <router-link to="/new-activities">here</router-link>.</p>
            <div id="activity" v-for="item in activities">
                <a :href="item.link">{{item.name}}</a>
                <p><strong>{{item.time}}</strong></p>
               <button v-on:click="remove(item.id)" class="delete">X</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Delete',
    data () {
        return {
            text: '', //?
        }

    },
    created: function() {
        this.$store.dispatch('getActivities');
    },
    computed: {
        activities: function() {
            return this.$store.getters.activities;
        },
    },
    methods: {
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
                return true;
            }).catch(err => {
            });
        },
        remove: function(id) {
            this.$store.dispatch('deleteActivity',id)
            .then(response => {
                   this.username = '';
                   this.password = '';
                    return true;
                }).catch(err => {
                    console.log(err);
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
    background-color: #e5b121;
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