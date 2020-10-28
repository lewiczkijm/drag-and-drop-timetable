<template>
    <div @mousedown="move" class="lesson-ticket" :style="{background:data.group.color}">
        <div class="holder" :style="{background:data.group.color2}" ></div>
        <div class="container">
            <div>{{startTime}} - {{endTime}}</div>
            <div :title="data.group.name" class="group-box">
                {{data.group.level}} - {{groupName}}
            </div>
        </div>
        <div class="holder-down" @mousedown.stop="resize" ></div>
    </div>
</template>

<script>

    /**
     * Преобразование времени из числа в строку вида 8:30
     * @param time
     * @returns {string}
     */
    function fmtTime(time) {
        const hours = ~~time;
        const minutes = hours - time?"30":"00";
        return hours + ":" + minutes
    }

    export default {
        // Тестовые данные. Впоследствии заменить на полученные из store
        name: "Lesson",
        props:["data"],
        computed:{
            startTime:function (){ return fmtTime(this.data.start)},
            endTime:function (){ return fmtTime(this.data.end)},
            groupName:function () {
                if(this.data.group.name.length <=7)
                return this.data.group.name;
                else
                return this.data.group.name.slice(0,6) + "..."
            }
        },
        methods:{
            resize(){
                console.log(1)
            },
            move(){
                console.log(this);
                function move(e){
                    console.log(e)
                }
                function stop(){
                    window.removeEventListener("mousemove",move);
                    window.removeEventListener("mouseup",stop);
                }
                window.addEventListener("mousemove",move);
                window.addEventListener("mouseup",stop);
            }
        }
    }
</script>

<style scoped>
.lesson-ticket{
    width: 132px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: 6px auto;
    grid-template-rows: auto 2px;
    min-height: 57.75px;
}
.holder{
    width: 6px;
    border-radius: 4px;
}
.container{
    padding: 10px 8px;
    padding-right: 0;
    font-size: 12px;
    text-align: left;
}
.group-box{
    width: max-content;
    padding: 1px;
    font-size: 18px;
}
.holder-down {
    /*background: #f00;*/
    height: 2px;
    width: 100%;
    cursor: n-resize;
    grid-area: auto / 1 / auto / 3;
}
</style>