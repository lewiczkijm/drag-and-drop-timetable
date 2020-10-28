import timetable from './timetable'
test('First correct test', () => {
    const state = {dates:[]};
    timetable.mutations.TEST_M(state);
    expect(state.dates[1]).toBe(1);
});

const state = { timetable:[],dates:[],
    weekNames:[
        "Mon","Tue","Wed","Thu","Fri","Sat","Sun"
    ],
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

    ]
};


test('CREATE_TIMETABLE - week output', () => {



    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.dates.length).toBe(7);
    expect(state.dates[0]).toBe("Mon, 19");
    expect(state.dates[6]).toBe("Sun, 25");
});

test('CREATE_TIMETABLE - right coordinates to grid', () => {



    timetable.mutations.CREATE_TIMETABLE(state);
    expect(state.lessons[0].koordinates).toEqual({"x":2,"y":10,"yEnd":12});
});
