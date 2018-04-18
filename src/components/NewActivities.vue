<template>
    <div>
        <div v-if="loggedIn">
            <add/>
        </div>
        <div v-else>
            <log-in/>
        </div>
    </div>
</template>

<script>
import Add from './Add';
import LogIn from './LogIn';
export default {
    name: 'NewActivities',
    components: {Add,LogIn},
    computed: {
        loggedIn: function() {
            return this.$store.getters.loggedIn;
        },
    },
}
</script>

<style scoped>
</style>