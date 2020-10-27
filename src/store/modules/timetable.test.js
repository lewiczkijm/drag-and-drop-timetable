import timetable from './timetable'
test('First correct test', () => {
    const state = {dates:[]};
    timetable.mutations.TEST_M(state);
    expect(state.dates[1]).toBe(1);
});


test('CREATE_TIMETABLE - Empty field with dates', () => {


    const state = { timetable:[],lessons:[
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
            }
        ]};


    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.timetable.length).toBe(7);
    expect(state.timetable[0].date).toBe(19);
});

test('CREATE_TIMETABLE - right lessons location', () => {


    const state = { timetable:[],lessons:[
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
            }
        ]};


    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.timetable[1].time[8].lesson).toBe(undefined);
    expect(state.timetable[1].time[9].lesson.id).toBe(24589);
    expect(state.timetable[1].time[10].lesson.id).toBe(24589);
    expect(state.timetable[1].time[11].lesson).toBe(undefined);

    expect(state.timetable[2].time[8].lesson).toBe(undefined);

});

test('CREATE_TIMETABLE - flags isStart on start lesson', () => {


    const state = { timetable:[],lessons:[
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
            }
        ]};


    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.timetable[1].time[9].isStart).toBe(true);
    expect(state.timetable[1].time[10].isStart).toBe(false);

});

