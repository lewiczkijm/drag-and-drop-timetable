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
    CREATE_TIMETABLE(state){


        /**
         * Подготовка структур длнных недели
         * @param startDate строка даты из входа в формате YYYY-MM-DD
         * @param startDay Начало недели - 0 воскресенье, 1 - понедельник ...
         */
        function createEmptyWeek(startDate,startDay=1) {
            const HOUR0 = 5;          // час начала рабочего дня
            const d = new Date(startDate);
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



            // Создание такой структуры timetable не актуально для таблицы, написанной на grid
            const incrementActiveDate = ()=>activeDate = new Date(activeDate.getTime() + 86400000);

            for (let i=0;i < 7;i ++){
                const dayTT=[];
                for (let j = 5; j <= 17; j += 0.5) {
                    dayTT.push({time: j, lesson: undefined})
                }
                state.timetable.push({time:[...dayTT],date:activeDate.getDate()});
                incrementActiveDate();
            }
        }
        createEmptyWeek(state.lessons[0].date);

        // Список уроков
        state.lessons.forEach(el=>{
            const day = new Date(el.date).getDate();
            const currentDayObject = state.timetable.find(e=>e.date === day);

            let firstFlag = true;
            let time = el.start;

            // Проход по часам для вставки урока в нужное место
            for(let i = 0;i < 20; i ++){
                if(currentDayObject.time[i].time === time && time < el.end){
                    currentDayObject.time[i].lesson = el;
                    currentDayObject.time[i].isStart = firstFlag;
                    firstFlag = false;
                    time +=0.5
                }
            }
        });


    },
    // Это проверочная мутация для тестов - не запускать
    TEST_M(state){
        state.dates=[0,1]
    }
};

const actions = {
    prepare({ commit }){
        commit("CREATE_TIMETABLE")
    }
};

export default {
    state,
    mutations,
    actions
}