import timetable from './timetable'
test('My first test', () => {
    const state = {dates:[]};
    timetable.mutations.TEST_M(state);
    expect(state.dates[1]).toBe(1);
});
