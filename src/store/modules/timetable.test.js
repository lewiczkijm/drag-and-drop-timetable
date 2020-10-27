import timetable from './timetable'
test('My first test', () => {
    const state = {dates:[]};
    timetable.mutations.TEST_M(state);
    expect(state.dates[1]).toBe(1);
});


test('CREATE_TIMETABLE - one lesson', () => {


    const state = {lessons:[
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
    expect(state.dates.length).toBe(1);
    expect(state.dates[0].getDate()).toBe(20);
});

test('CREATE_TIMETABLE - some lessons without empty Days',()=>{
    const state = {dates:[]};
    state.lessons = [
        {
            id:24589,
            date: "2020-10-31",
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
            date: "2020-10-31",
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
            date: "2020-11-1",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },
    ];
    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.dates.length).toBe(2);
    expect(state.dates[0].getDate()).toBe(31);

});


test('CREATE_TIMETABLE - some lessons with empty Days in one month',()=>{
    const state = {dates:[]};
    state.lessons = [
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
            date: "2020-10-22",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },
    ];
    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.dates.length).toBe(3);
    expect(state.dates[1].getDate()).toBe(21);

});


test('CREATE_TIMETABLE - empty Days cross month',()=>{
    const state = {dates:[]};
    state.lessons = [
        {
            id:24589,
            date: "2020-10-31",
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
            date: "2020-10-31",
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
            date: "2020-11-2",
            start: 11,
            end: 12,
            group:{
                level:"A2",
                name:"Liberman",
                color:"#FFEECE",
                color2:"#FFBC42"
            }
        },
    ];
    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.dates.length).toBe(3);
    expect(state.dates[1].getDate()).toBe(1);

});