<template>
    <div class="container">
        <div class="main">
            <h2>Which day works best for you?</h2>
            <div id="doweek">
            <a class="days" href="/pages/days/monday.html">Monday</a>
            <a class="days" href="/pages/days/tuesday.html">Tuesday</a>
            <a class="days" href="/pages/days/wednesday.html">Wednesday</a>
            <a class="days" href="/pages/days/thursday.html">Thursday</a>
            <a class="days" href="/pages/days/friday.html">Friday</a>
            <a class="days" href="/pages/days/saturday.html">Saturday</a>
            <a class="days" href="/pages/days/sunday.html">Sunday</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WhichDay'
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
    font-size: 20px;
}

.main {
    grid-area: main;
    padding: 0px;
    min-height: 400px;

}

#doweek {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.main p {
    max-width: 800px;
    
}


.button {
    background-color: #e5b121;
    border:none;
    color:#f5f5f5;
    padding: 15px 32px;
    text-align: center;
    display:inline-block;
    font-size: 16px;
    text-decoration: none;
}

.days {
    min-width: 170px;
    margin-bottom: 10px;
    margin-right: 5px;
    background-color: #4e595d;
    border:none;
    color:#f5f5f5;
    padding: 15px 32px;
    text-align: center;
    display:inline-block;
    font-size: 20px;
    text-decoration: none;
}

.days:hover {
    background: #e5b121;
}

.footer {
    grid-area: footer;
    text-align: center;
}

h2 {
    font-size: 60px;
    color: #e5b121;
    font-weight: 800;
}

.box {
    width: 300px;
    height: 30px;
    display: block;
}
</style>