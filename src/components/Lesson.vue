<template>
    <div style="width: fit-content">
    <div class="lesson-ticket" :style="{background:group.color,height: height + 'px'}">
        <div class="holder" :style="{background:group.color2}" ></div>
        <div class="container">
            <div>{{start}} - {{end}}</div>
            <div class="group-box">{{group.level}} - {{group.name}}</div>
        </div>
    </div>
        <div class="holder-down" @mousedown="startResize" ></div>
    </div>
</template>

<script>
    const step = 57.75;
    export default {
        name: "Lesson",
        data:()=>({
            start:"10:30",
            end:"11:30",
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            },
            height:0
        }),
        methods:{
            startResize(){
                let startY = 0;
                let baseY = 0;
                let self = this;
                const height = this.height;
                function move(e){
                    if(startY === 0)
                        baseY = e.clientY;
                    else {
                        let move = (baseY - e.clientY) * -1;
                        if(move > 0){
                            move = Math.ceil(move/step) * step + step;
                            self.height =move
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
                function stop(){
                    window.removeEventListener("mousemove",move);
                    window.removeEventListener("mouseup",stop);
                }
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