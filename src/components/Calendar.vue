<template>
    <div class="container">
    <div class="days">
        <div><div style="{position: absolute;marginTop: 1.9em;marginLeft: 6px;}"><img src="Vector100.png"></div></div>
        <div v-for="day in dates" :key="day" class="day">{{day}}</div>
        <div><div style="{position: absolute;marginTop: 1.9em;marginLeft: -6px;}"><img src="Vector101.png"></div></div>

    </div>
    <div class="hours">
        <div class="hour" :key="hour" v-for="hour in time" >{{hour}}</div>
    </div>
    <div class="area" ref="area">
        <Lesson
                :key="lesson.id"
                v-for="lesson in lessons"
                :data="lesson"
                :zeroArea="getZeroKoordinats"
                :style="{
                    gridColumn: lesson.coordinates.x,
                    gridRow: lesson.coordinates.y,
                    gridRowEnd: lesson.coordinates.yEnd
                }"
        />
    </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import Lesson from "./Lesson";
                                //  ## Константы координатной сетки
    const COLUMN = 150;         // ширина ячейки (x)
    const ROW = 30;             // высота ячейки (y)
    const COLUMNS = 7;          // количество ячеек по x
    const ROWS = 24;            // количество ячеек по y

    export default {
        name: "Calendar",
        components: {Lesson},
        data:function(){
            let time = [];
            for (let i = 6;i < 17;i ++) time.push(`${i}:00`);
            return {
                days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                time:time
            }
        },
        computed:{
            ...mapState({
                lessons:state=>state.timetable.lessons,
                dates:state=>state.timetable.dates
            })
        },
        methods:{


            /**
             * ## Получение координат мыши в системе рабочего поля.
             * Нужно для верного рассчета позиции мыши при ресайзе и перетаскивании элементов
             * Получено при помощи ref
             *
             * Возвращает координаты x y или false при выходе за пределы поля
             * @param x {number}
             * @param y {number}
             * @returns {boolean|{x: number, y: number}}
             */
            getZeroKoordinats(x,y){
                const box = this.$refs.area.getBoundingClientRect();
                const top = box.top + pageYOffset;
                const left = box.left + pageXOffset;
                x = x-left;
                y = y - top;
                if(x < 0 || y < 0 || x > COLUMN * COLUMNS || y > ROW * ROWS) return false;
                return {
                    x: ~~(x / COLUMN) + 1,
                    y: ~~(y / ROW) + 1
                }
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
    grid-template-columns: 0 repeat(7, 150px) 0;
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
.day:nth-child(2){border-left: 0}
.day:nth-child(8){border-right: 0}
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