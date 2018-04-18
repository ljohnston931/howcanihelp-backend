<template>
    <div>
        <div v-if="loggedIn">
            <a-h-admin/>
        </div>
        <div v-else>
            <app-header/>
        </div>
    </div>
</template>

<script>
import AHAdmin from './AHAdmin';
import AppHeader from './AppHeader';
export default {
    name: 'AH',
    components: {AHAdmin,AppHeader},
    computed: {
        loggedIn: function() {
            return this.$store.getters.loggedIn;
        },
    },
}
</script>

<style scoped>
</style>