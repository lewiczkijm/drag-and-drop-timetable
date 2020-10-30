const state = ()=>({
    timetable: [
/*
        Template of structure
        {date:30,time:[
                {time:6,lesson:undefined},
                {time:6.5,lesson:undefined},
                {time:7,lesson:undefined},
        ]}
*/
    ],
    // Список уроков, возможно полученный от api
    lessons:[
        {
            id:24589,
            date: "2020-10-20",
            start: 9.5,
            end: 10.5,
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            },
            koordinates:{},
        },
        {
            id:24575,
            date: "2020-10-20",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#CCC6FF",
                color2:"#A499FF"
            },
            koordinates:{},
        },
        {
            id:24554,
            date: "2020-10-21",
            start: 11,
            end: 12.5,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#CCC6FF",
                color2:"#A499FF"
            },
            koordinates:{}
        },

    ],
    dates:[],
    weekNames:[
        "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
    ],

    test:"test"
});

const mutations = {
    // Подготовка списка уроков и вспосогательных параметров, зависимых от них
    CREATE_TIMETABLE(state){
        const startDay=1; // Начало недели - 0 воскресенье, 1 - понедельник
        const HOUR0 = 5;          // час начала рабочего дня

        const d = new Date(state.lessons[0].date);
        const START_DATE = d.getDay() - startDay;
        let activeDate = new Date(d.getTime() - 86400000 * START_DATE);     // нахождение первого дня недели

        // Получение списка дней недели с датами
        for(let i = 0;i < 7;i ++){
            state.dates.push(state.weekNames[i] + ", " + (activeDate.getDate() + i))
        }

        // Рассчет каординат grid в формате x, y, y-end
        state.lessons.forEach(key=>{
            const x = (new Date(key.date)).getDate() - activeDate.getDate() + 1;
            const y = key.start * 2 - HOUR0 * 2 + 1;
            const yEnd = key.end * 2 - HOUR0 * 2 + 1;
            key.koordinates = {x:x,y:y,yEnd:yEnd}
        });
    },

    MOVE_LESSON(state,payload){
        if(!payload) return;

        const x = payload.currentLesson.koordinates.x;
        payload.currentLesson.koordinates.x = payload.x;
        payload.currentLesson.koordinates.y = payload.y;
        payload.currentLesson.koordinates.yEnd = payload.yEnd;

        // Рассчет нового времени
        let diff = payload.currentLesson.koordinates.x - x;
        let date = new Date(new Date(payload.currentLesson.date).getTime() + diff * 86400000);
        let dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        payload.currentLesson. start = payload.currentLesson.koordinates.y /2+ 0.5 + 4;
        payload.currentLesson.end = payload.currentLesson.koordinates.yEnd /2+ 0.5 + 4;
        payload.currentLesson.date = dateStr;

    },
    RESIZE_LESSON(state,payload){
        if(!payload) return;
        payload.currentLesson.koordinates.yEnd  =payload.yEnd;
        payload.currentLesson.end = payload.currentLesson.koordinates.yEnd /2+ 0.5 + 4
    },
    // Это проверочная мутация для тестов - не запускать
    TEST_M(state){
        state.dates=[0,1]
    }

};

const actions = {
    prepare({ commit }){
        commit("CREATE_TIMETABLE")
    },

    // контроль при перетаскивании
    review({state},moveData){
        state;
        // Контроль границ
        if(moveData.x > 7 || moveData.yEnd > 25) return false;
        return moveData
    },

    // контроль при ресайзе
    reviewResize({state},moveData){
        state;
        // Контроль границ
        if(moveData.x > 7 || moveData.yEnd > 25) return false;
        if(moveData.yEnd - moveData.currentLesson.koordinates.y < 2) return false;
        return moveData
    },

    // Перемещение урока
    async move({commit, state,dispatch},moveData){
        const currentLesson = state.lessons.find(el=>el.id === moveData.id);
        const duration = currentLesson.koordinates.yEnd - currentLesson.koordinates.y;
        const yEnd = moveData.y + duration;
        let payload = {x : moveData.x, y: moveData.y,yEnd, id:moveData.id,currentLesson};
        payload = await dispatch("review",payload);
        commit("MOVE_LESSON",payload);
    },

    // Изменение времени урока
    async resize({commit,state,dispatch},moveData){
        const currentLesson = state.lessons.find(el=>el.id === moveData.id);
        const duration = currentLesson.koordinates.yEnd - moveData.y;
        if(duration > 0)
             moveData.yEnd = currentLesson.koordinates.yEnd  -2;
        else moveData.yEnd = currentLesson.koordinates.yEnd  +2;
        moveData.currentLesson = currentLesson;
        moveData = await dispatch("reviewResize",moveData);
        commit("RESIZE_LESSON",moveData);
    }

};

export default {
    state,
    mutations,
    actions
}