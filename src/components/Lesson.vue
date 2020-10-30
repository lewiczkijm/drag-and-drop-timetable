<template>
    <div @mousedown="move" class="lesson-ticket">
        <div class="holder" :style="{background:data.group.color2}" ></div>
        <div class="container" :style="{background:data.group.color}">
            <div>{{startTime}} - {{endTime}}</div>
            <div :title="data.group.name" class="group-box">
                {{data.group.level}} - {{groupName}}
            </div>
        </div>
        <div class="holder-down" @mousedown.stop="resize" ></div>
    </div>
</template>

<script>

    export default {
        // Тестовые данные. Впоследствии заменить на полученные из store
        name: "Lesson",
        props:["data","zeroArea"],
        computed:{
            startTime:function (){ return this.fmtTime(this.data.start)},
            endTime:function (){ return this.fmtTime(this.data.end)},
            groupName:function () {
                if(this.data.group.name.length <=7)
                return this.data.group.name;
                else
                return this.data.group.name.slice(0,6) + "..."
            }
        },
        methods:{

            // Изменение длины урока. Внимание!!! Работает со свойством document. Вносит временные изменения.
            resize(){
                const dispatch = this.$store.dispatch;
                document.body.style.cursor = "n-resize";
                this.mouseHandle(
                    coordinates=>{

                        dispatch("resize",{id:this.data.id,x:coordinates.x,y:coordinates.y})
                    }, false
                    ,()=> document.body.style.cursor = "default"
                )
            },

            move(){
                const dispatch = this.$store.dispatch;
                this.mouseHandle(
                    coordinates=>{
                        dispatch("move",{id:this.data.id,x:coordinates.x,y:coordinates.y})
                    }, true
                )
            },



            /**
             * Обработка прертаскивания мыши.
             * Принимает коллбек. и коллбек завершения
             * Обрабатывает перемещение мыши и автомвтически отписывается от событий и отключается при отпускании мыши
             * При перемещении мыши в другую ячейку вызывает коллбек.
             *
             * Внимание!!! Взаимодействует напрямую с window, подписывается на события  "mousemove", "mouseup"
             * @param callback
             * @param isMove Отличие между режимами перетаскивания и ресайза для мелких улучшений
             * @param exitCallback
             */
            mouseHandle(callback,isMove,exitCallback){
                const self = this;
                let x = 0;
                let y = 0;
                let correctorY = 0; // Корректировка для drag end drop, чтобы урок не прыгал, при попвтке двигать не за верх
                function move(e){
                    const coordinates = self.zeroArea(e.clientX,e.clientY);
                    if(!coordinates) return;
                    if(isMove && x === 0 && y === 0) correctorY = coordinates.y - self.data.koordinates.y;
                    if( x && y && (x !== coordinates.x || y !== coordinates.y)) {
                        if(isMove) {
                            coordinates.y -= correctorY;
                            callback(coordinates);
                        } else {
                            if(!((coordinates.y - x) % 2))
                                callback(coordinates);
                        }

                    }
                    x = coordinates.x;
                    y = coordinates.y;
                }
                function stop(){
                    window.removeEventListener("mousemove",move);
                    window.removeEventListener("mouseup",stop);
                    if(exitCallback) exitCallback()
                }
                window.addEventListener("mousemove",move);
                window.addEventListener("mouseup",stop);

            },


            /**
             * Преобразование времени из числа в строку вида 8:30
             * @param time
             * @returns {string}
             */
            fmtTime(time){
                const hours = ~~time;
                const minutes = hours - time?"30":"00";
                return hours + ":" + minutes
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
    user-select: none;
}
.holder{
    width: 6px;
    border-radius: 4px;
}
.container{
    padding: 10px 0 10px 8px;
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
    height: 5px;
    background: rgba(0,0,0,0);
    cursor: n-resize;
    grid-area: auto / 1 / auto / 3;
}
</style>