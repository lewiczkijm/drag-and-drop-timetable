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
            }
        },
        {
            id:24589,
            date: "2020-10-20",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },
        {
            id:24589,
            date: "2020-10-21",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },

    ],
    dates:[],
    test:"test"
});

const mutations = {
    CREATE_TIMETABLE(state){
        // Получить полный список дат вместе с неиспользуемыми
        let dates = [];


        /**
         * Подготовка структур длнных недели
         * @param startDate строка даты из входа в формате YYYY-MM-DD
         * @param startDay Начало недели - 0 воскресенье, 1 - понедельник ...
         */
        function createEmptyWeek(startDate,startDay=0) {
            const d = new Date(startDate);
            const START_DATE = d.getDay() - startDay;
            let activeDate = new Date(d.getTime() - 86400000 * START_DATE);

            const incrementActiveDate = ()=>activeDate = new Date(activeDate.getTime() + 86400000);

            console.log(activeDate);

            let EmptyTime = {time: 6, lesson: undefined};
            let EmptyDay = {
                date: 11,
                time: []
            };

            for (let i = 6; i <= 16; i += 0.5) {
                EmptyTime.time = i;
                EmptyDay.time.push({...EmptyTime})
            }
            for (let i=0;i < 7;i ++){
                state.timetable.push({...EmptyDay,date:activeDate.getDate()});
                incrementActiveDate();
            }
        }
        createEmptyWeek(state.lessons[0].date);

        state.lessons.forEach(el=>{
            const day = new Date(el.date);

            // Первый день
            if(!dates[dates.length - 1]) {
                dates.push(day);
                return;
            }

            // сдедующий день без перерыва
            if(
                dates[dates.length - 1].getTime() < day.getTime() &&
                dates[dates.length - 1].getTime() + 86400000  > day.getTime() ){
                dates.push(day);
                return;
            }

            // Вставка уроков в открытую дату
            console.log();

            // Обработка разрыва
            while (dates[dates.length - 1].getTime() < day.getTime()){
                const t = new Date(dates[dates.length - 1].getTime() + 86400000);
                dates.push(t);
            }
        });


        // диагностика дат - отладка
        state.dates = dates
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