import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        loggedIn: false,
        loginError: '',
        registerError: '',
        activities: [],
        admin: false
    },
    getters: {
        user: state => state.user,
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        activities: state => state.activities,
        admin: state => state.admin
    },
    mutations: {
        setUser(state,user) {
            state.user = user;
        },
        setLogin(state,status) {
            state.loggedIn = status;
        },
        setLoginError(state,message) {
            state.loginError = message;
        },
        setRegisterError(state,message) {
            state.registerError = message;
        },
        setActivities(state,activities) {
            /*console.log("state.activities: " state.activities);
            console.log("activities: " activities);*/
            state.activities = activities;
        },
        setAdmin(state,status) {
            state.admin = status;
        },
    },
    actions: {

        //register new user
        register(context,user) {
            axios.post("/api/users",user)
            .then(response => {
                context.commit('setUser',response.data.user);
                context.commit('setLogin',true);
                context.commit('setLoginError',"");
                context.commit('setRegisterError',"");
                context.commit('setAdmin',false);
            }).catch(error => {
                context.commit('setLoginError','')//?
                context.commit('setLogin',false);
                if (error.response) {
                    if (error.response.status === 403)
                        context.commit('setRegisterError', "That username is already taken.");
                    return;
                }
                context.commit('setRegisterError',"Sorry your request failed. We will look into it!");
            });
        },

        //login
        login(context,user) {
            axios.post("/api/login",user)
            .then(response => {
                context.commit('setUser',response.data.user);
                context.commit('setLogin',true);
                context.commit('setRegisterError',"");
                context.commit('setLoginError',"");
                if (response.data.user.admin)
                    context.commit(setAdmin,true);
            }).catch(error => {
                context.commit('setRegisterError','');
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                        context.commit('setLoginError',"Invalid login.");
                    context.commit('setRegisterError',"");
                    return;
                }
                context.commit('setLoginError',"Sorry, your request failed. We will look into it!");
            });
        },

        //logout
        logout(context,user) {
            context.commit('setUser', {});
            context.commit('setLogin',false);
            context.commit('setAdmin',false);
        },

        //add an activity
        addActivity(context,activity) {
            axios.post("/api/activities",activity)
            .then(response => {
                return context.dispatch('getActivities');
            }).catch(err => {
                console.log("addActivity failed:",err)
            });
        },

        //get all activities
        getActivities(context) {
            axios.get("/api/activities")
            .then(response => {
                context.commit('setActivities',response.data.activities);
            }).catch(err => {
                console.log("getActivities failed: ",err);
            });
        },

        //get activities for a specific day
        getActivities(context, day) {
            console.log()
            axios.get("/api/activities/" + day)
            .then(response => {
                context.commit('setActivities',response.data.activities);
            }).catch(err => {
                console.log("getActivities failed: ",err);
            });
        }
    }
});