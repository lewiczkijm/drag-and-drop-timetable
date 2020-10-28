<template>
    <div style="width: fit-content">
    <div class="lesson-ticket" :style="{background:data.group.color,height: height + 'px'}">
        <div class="holder" :style="{background:data.group.color2}" ></div>
        <div class="container">
            <div>{{startTime}} - {{endTime}}</div>
            <div class="group-box">{{data.group.level}} - {{data.group.name}}</div>
        </div>
    </div>
        <div class="holder-down" @mousedown="startResize" ></div>
    </div>
</template>

<script>
    const step = 57.75;

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
        data:()=>({
            // Время начала и окончания урока - в будушем computed
            /* В будущем рассчетный параметр. Задает высоту элемента,
            *  по логике - продолжительность урока
            * */
            height:0
        }),
        computed:{
            startTime:function (){ return fmtTime(this.data.start)},
            endTime:function (){ return fmtTime(this.data.end)}
        },
        methods:{

            // Масштабирование карточки урока
            startResize(){
                let startY = 0;
                let baseY = 0;
                let self = this;
                const height = this.height;

                // Рассчет размера, в зависимости от положения мыши
                function move(e){
                    if(startY === 0)
                        baseY = e.clientY;
                    else {
                        let move = (baseY - e.clientY) * -1;
                        if(move > 0){
                            move = Math.ceil(move/step) * step + step;
                            self.height = move
                        }
                        else {
                            move = Math.ceil((height + move)/step)*step;
                            console.log(move);
                            self.height =move
                            //move = Math.round((self.height + move)/step)* step
                        }

                    }
                    startY = e.clientY
                }

                // Отписка от событий и остановка перемещения
                function stop(){
                    window.removeEventListener("mousemove",move);
                    window.removeEventListener("mouseup",stop);
                }

                // Подписка на события window для того, чтобы события мыши улавливались по всему экрану
                window.addEventListener("mousemove",move);
                window.addEventListener("mouseup",stop)
            },
        }
    }
</script>

<style scoped>
.lesson-ticket{
    width: 132px;
    border-radius: 4px;
    display: flex;
    min-height: 57.75px;
}
.holder{
    width: 6px;
    border-radius: 4px;
}
.container{
    padding: 10px 8px;
    font-size: 12px;
    text-align: left;
}
.group-box{
    /*padding: 1px;*/
    font-size: 18px;
}
.holder-down {
    /*background: #f00;*/
    height: 2px;
    width: 100%;
    cursor: n-resize;
}
</style>