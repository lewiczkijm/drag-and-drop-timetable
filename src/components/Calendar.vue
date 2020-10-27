<template>
    <div class="container">
    <div class="days">

        <div v-for="day in days" :key="day" class="day">{{day}}, 11</div>

    </div>
    <div class="hours">
        <div class="hour" :key="hour" v-for="hour in time" >{{hour}}</div>
    </div>
    <div class="area"><div></div></div>
    </div>
</template>

<script>
    export default {
        name: "Calendar",
        data:function(){
            let time = [];
            for (let i = 6;i < 17;i ++) time.push(`${i}:00`);
            return {
                days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                time:time
            }
        }
    }
</script>

<style scoped>
.container{
    width: fit-content;
    display: grid;
    grid-template-columns:60px repeat(7, 150px);
    grid-template-rows: auto repeat(24, 30px);
    font-size: 16px;
}
.days{
    display: grid;
    grid-template-columns:repeat(7, 150px);
    grid-column-start: 2;
    grid-column-end: 9;
}
.day{
    margin: 28px 0;
    height: 20px;
    text-align: center;
    border-left: solid 1px #D9D9D9;
    border-right: solid 1px #D9D9D9;
}
.day:first-child{border-left: 0}
.day:last-child{border-right:0}

.hours{
    display: grid;
    grid-template-rows: repeat(12, 60px);
    grid-row-start: 2;
    grid-row-end: 26;
    grid-gap: 0;
}
.hour{
    padding-top: 3.1em;
    padding-right: 8px;
    text-align: right;
}
.area{
    display: grid;
    grid-template-columns:repeat(7, 150px);
    grid-template-rows: repeat(24, 30px);
    background: white url("/cover.svg");
    border-radius: 8px;
    grid-column-start: 2;
    grid-row-start: 2;
    grid-column-end: 9;
    grid-row-end: 26;

}
</style>