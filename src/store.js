import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
    return { headers: {'Authorization': localStorage.getItem('token')}};
}

export default new Vuex.Store({
    state: {
        user: {},
        token: '',
        //loggedIn: false,
        loginError: '',
        registerError: '',
        activities: [],
        admin: false
    },
    getters: {
        user: state => state.user,
        getToken: state => state.token,
        loggedIn: state => {
            if (state.token === '')
                return false;
            return true;
        },
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        activities: state => state.activities,
        //admin: state => state.admin
    },
    mutations: {
        setUser(state,user) {
            state.user = user;
        },
        setToken(state,token) {
            state.token = token;
            if(token === '')
                localStorage.removeItem('token');
            else
                localStorage.setItem('token',token);
        },
        /*setLogin(state,status) {
            state.loggedIn = status;
        },*/
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

        //initialize
        initialize(context) {
            console.log("initializing");
            let token = localStorage.getItem('token');
            console.log(token);
            if (token) //see if we can the token to get me account
                axios.get("/api/me",getAuthHeader()).then(response => {
                    context.commit('setToken',token);
                    context.commit('setUser',response.data.user);
                }).catch(err => {
                    //remove token and user from state
                    context.commit('setUser',{});
                    context.commit('setToken','');
                });
            
        },

        //register new user
        register(context,user) {
            return axios.post("/api/users",user)
            .then(response => {
                context.commit('setUser',response.data.user);
                context.commit('setToken',response.data.token);
                context.commit('setLoginError',"");
                context.commit('setRegisterError',"");
                //context.commit('setAdmin',false);
            }).catch(error => {
                context.commit('setUser',{});
                context.commit('setToken','');
                context.commit('setLoginError','');
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
            console.log(1);
           return axios.post("/api/login",user)
            .then(response => {
                console.log(this.state.loggedIn);
                context.commit('setUser',response.data.user);
                context.commit('setToken',response.data.token);
                context.commit('setRegisterError',"");
                context.commit('setLoginError',"");
                console.log(this.state.loggedIn);
                //console.log("err: "+state.loginError);
                /*if (response.data.user.admin)
                    context.commit(setAdmin,true);*/
            }).catch(error => {
                console.log("error")
                context.commit('setUser',{});
                context.commit('setToken','');
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
            context.commit('setToken','');
            //context.commit('setAdmin',false);
        },

        //add an activity
        addActivity(context,activity) {
            axios.post("/api/activities",activity,context.state.user.user_id,getAuthHeader())
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