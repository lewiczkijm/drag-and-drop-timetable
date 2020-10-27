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
            date: "2020-10-30",
            start: 9.5,
            end: 10.5,
            group:{
                level:"B2",
                name:"Kolette",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        }
    ],
    dates:[],
    test:"test"
});

const mutations = {
    CREATE_TIMETABLE(state){
        // Получить полный список дат вместе с неиспользуемыми
        let dates = [];
        state.lessons.forEach(el=>{
            const day = new Date(el.date);
            if(dates[dates.length -1] !== day) {
                if (!dates[dates.length - 1] || day - dates[dates.length - 1] <= 86402000)
                    dates.push(day);
                else {
                    let middleDay = new Date();
                    let lastDay = dates[dates.length - 1];

                    while(middleDay > lastDay){
                        middleDay = new Date(day - 86400000);
                        dates.push(middleDay)
                    }
                }
            }
        });

        // диагностика дат - отладка
        state.dates = dates
    },
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