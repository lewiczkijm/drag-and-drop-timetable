const DAY = 86400000;
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
            id:24599,
            date: "2020-10-23",
            start: 9.5,
            end: 10.5,
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            },
            coordinates:{},
        },
        {
            id:24595,
            date: "2020-10-24",
            start: 9.5,
            end: 10.5,
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            },
            coordinates:{},
        },
        {
            id:24597,
            date: "2020-10-19",
            start: 9.5,
            end: 10.5,
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            },
            coordinates:{},
        },

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
            coordinates:{},
        },
        {
            id:24569,
            date: "2020-10-22",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#CCC6FF",
                color2:"#A499FF"
            },
            coordinates:{},
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
            coordinates:{},
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
            coordinates:{}
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
        let activeDate = new Date(d.getTime() - DAY * START_DATE);     // нахождение первого дня недели

        // Получение списка дней недели с датами
        for(let i = 0;i < 7;i ++){
            state.dates.push(state.weekNames[i] + ", " + (activeDate.getDate() + i))
        }

        // Рассчет каординат grid в формате x, y, y-end
        state.lessons.forEach(key=>{
            const x = (new Date(key.date)).getDate() - activeDate.getDate() + 1;
            const y = key.start * 2 - HOUR0 * 2 + 1;
            const yEnd = key.end * 2 - HOUR0 * 2 + 1;
            key.coordinates = {x:x,y:y,yEnd:yEnd}
        });
    },

    MOVE_LESSON(state,payload){
        if(!payload) return;

        const x = payload.currentLesson.coordinates.x;
        payload.currentLesson.coordinates.x = payload.x;
        payload.currentLesson.coordinates.y = payload.y;
        payload.currentLesson.coordinates.yEnd = payload.yEnd;

        // Рассчет нового времени
        let diff = payload.currentLesson.coordinates.x - x;
        // Нет стандартной функции получения даты вида YYYY-MM-DD
        let date = new Date(new Date(payload.currentLesson.date).getTime() + diff * DAY);
        let dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        payload.currentLesson. start = payload.currentLesson.coordinates.y /2+ 0.5 + 4;
        payload.currentLesson.end = payload.currentLesson.coordinates.yEnd /2+ 0.5 + 4;
        payload.currentLesson.date = dateStr;

    },
    RESIZE_LESSON(state,payload){
        if(!payload) return;
        payload.currentLesson.coordinates.yEnd  =payload.yEnd;
        payload.currentLesson.end = payload.currentLesson.coordinates.yEnd /2+ 0.5 + 4
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

        // Контроль границ
        if(moveData.x > 7 || moveData.yEnd > 25 || moveData.y < 1) return false;

        //Проверка на коллизии
        let collision = false;
        state.lessons.forEach(el=>{
            // Отбрасываем случаи, когда процессинг не требуется
            if(el.id === moveData.id) return;
            if(el.coordinates.x !==moveData.x) return;

            if(moveData.y < el.coordinates.yEnd && moveData.y> el.coordinates.y) {collision = true; return;}
            if(el.coordinates.y < moveData.y &&  el.coordinates.yEnd > moveData.yEnd) {collision = true; return;}
            if(el.coordinates.y > moveData.y &&  el.coordinates.yEnd < moveData.yEnd) {collision = true; return;}
            if(moveData.y === el.coordinates.y) {collision = true; return;}
            if(moveData.yEnd < el.coordinates.yEnd && moveData.y < el.coordinates.y && moveData.yEnd > el.coordinates.y) {collision = true; return;}
            if(moveData.y < el.coordinates.y && moveData.yEnd === el.coordinates.yEnd) {collision = true;}
        });

        if(collision) return false;

        return moveData
    },

    // контроль при ресайзе
    reviewResize({state},moveData){
        state;
        // Контроль границ
        if(moveData.x > 7 || moveData.yEnd > 25) return false;
        if(moveData.yEnd - moveData.currentLesson.coordinates.y < 2) return false;

        //Проверка на коллизии
        let collision = false;
        state.lessons.forEach(el=>{
            if(el.id === moveData.id) return;
            if(el.coordinates.x !==moveData.x) return;
            if(el.coordinates.y < moveData.yEnd && moveData.currentLesson.coordinates.y < el.coordinates.y) collision = true;
        });

        if(collision) return false;

        return moveData
    },

    // Перемещение урока
    async move({commit, state,dispatch},moveData){
        const currentLesson = state.lessons.find(el=>el.id === moveData.id);
        const duration = currentLesson.coordinates.yEnd - currentLesson.coordinates.y;
        const yEnd = moveData.y + duration;
        let payload = {x : moveData.x, y: moveData.y,yEnd, id:moveData.id,currentLesson};
        payload = await dispatch("review",payload);

        // Автоперенос при коллизиях
        let baseY = moveData.y; // Начальная точка y до переноса
        let incrementor = 0;    // число приращения y
        let iterator = 26;      // Ограничитель цикла

        while(!payload && iterator){
            iterator --;
            incrementor += 1;

            moveData.y = baseY + incrementor;
            let yEnd = moveData.y + duration;
            payload = {x : moveData.x, y: moveData.y,yEnd, id:moveData.id,currentLesson};
            payload = await dispatch("review",payload);

            if(payload) break;

            moveData.y = baseY - incrementor;
            yEnd = moveData.y + duration;
            payload = {x : moveData.x, y: moveData.y,yEnd, id:moveData.id,currentLesson};
            payload = await dispatch("review",payload);

        }

        commit("MOVE_LESSON",payload);
    },

    // Изменение времени урока
    async resize({commit,state,dispatch},moveData){
        const currentLesson = state.lessons.find(el=>el.id === moveData.id);
        const duration = currentLesson.coordinates.yEnd - moveData.y;
        if(duration > 0)
            moveData.yEnd = currentLesson.coordinates.yEnd  -2;
        else moveData.yEnd = currentLesson.coordinates.yEnd  +2;
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