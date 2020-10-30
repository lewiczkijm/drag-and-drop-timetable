/* eslint-disable no-undef */
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
            id:24587,
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
            id:24588,
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

//Проверка мутаций движения и ресайза
test('RESIZE_LESSON', () => {

    timetable.mutations.RESIZE_LESSON(state,{currentLesson:state.lessons[2],yEnd:18});
    expect(state.lessons[2].koordinates).toEqual({"x":3,"y":13,"yEnd":18});
    expect(state.lessons[2].start).toBe(11);
    expect(state.lessons[2].end).toBe(13.5);
});

test("MOVE_LESSON",()=>{
    timetable.mutations.MOVE_LESSON(state,{
        currentLesson:state.lessons[2],
        x:4,
        y:11,
        yEnd:16
    });
    expect(state.lessons[2].koordinates).toEqual({"x":4,"y":11,"yEnd":16});
    expect(state.lessons[2].start).toBe(10);
    expect(state.lessons[2].end).toBe(12.5);
    expect(state.lessons[2].date).toBe("2020-10-22");

});

// Проверка действий move и resize

test("action move",async ()=>{
    const commit = jest.fn();
    const dispatch = jest.fn((type,moveData)=>moveData);
    await timetable.actions.move({commit,state,dispatch},{id:24589,x:4,y:9});
    expect(dispatch).toHaveBeenCalledWith("review",{currentLesson:state.lessons[2],id:24589,x:4,y:9,yEnd:14});
    expect(commit).toHaveBeenCalledWith("MOVE_LESSON",{currentLesson:state.lessons[2],id:24589,x:4,y:9,yEnd:14})
});

test("action resize",async ()=>{
    const commit = jest.fn();
    const dispatch = jest.fn((type,moveData)=>moveData);
    await timetable.actions.resize({commit,state,dispatch},{id:24589,x:4,y:16});
    expect(dispatch).toHaveBeenCalledWith("reviewResize",{currentLesson:state.lessons[2],id:24589,x:4,y:16,yEnd:18});
    expect(commit).toHaveBeenCalledWith("RESIZE_LESSON",{currentLesson:state.lessons[2],id:24589,x:4,y:16,yEnd:18})
});

// TODO Проверка контролья коллизий и прочих крайних случаев