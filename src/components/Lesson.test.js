import { mount } from '@vue/test-utils'
import Lesson from './Lesson'



const data = {"id":24589,"date":"2020-10-20","start":9.5,"end":10.5,
    "group":{"level":"B2","name":"Liberman","color":"#FFEECE","color2":"#FFBC42"},
    "koordinates":{"x":2,"y":10,"yEnd":12}
};

const spy = jest.fn();

function zeroArea1(){
    spy(1);
    return {x:1,y:1}
}

function zeroArea2(x,y){
    spy(2);
    return {x:1,y:2}
}

function zeroArea3(x,y){
    spy(3);
    return {x:2,y:2}
}

function zeroArea4(x,y){
    spy(4);
    false
}

test('First correct test', () => {
    expect(1).toBe(1);
});

// Тестировать надписи и время
test('Simple text', () => {
    const data = {"id":24589,"date":"2020-10-20","start":9.5,"end":10.5,
        "group":{"level":"B2","name":"Kolette","color":"#FFEECE","color2":"#FFBC42"},
        "koordinates":{"x":2,"y":10,"yEnd":12}
    };
    const wrapper = mount(Lesson,{propsData:{data}});
    expect(wrapper.text()).toContain("9:30");
    expect(wrapper.text()).toContain("Kolette")
});

// Тестировать сокращение группы
test('long group name', () => {
    const wrapper = mount(Lesson,{propsData:{data}});
    expect(wrapper.text()).toContain("Liberm...")
});

// Тестировать ножатие и перемещение мыши с функцией zeroArea и моками dispatch

test('mouse drag and drop - start zeroArea', async () => {
    const wrapper = mount(Lesson,{propsData:{data,zeroArea:zeroArea1}});
    await wrapper.trigger("mousedown");
    await wrapper.trigger("mousemove",{clientX:250,clientY:440});
    await window.dispatchEvent(new Event('mousedown'));
    // Нельзя протестировать передачу координат мыши из - за особенностей реализации DOM
    // Тестируем только факт движения и передаем дальше фейковые параметры
    await window.dispatchEvent(new Event('mousemove'));
    expect(spy).toHaveBeenCalledWith(1);
    await window.dispatchEvent(new Event('mouseup'));
    expect(spy).toHaveBeenCalledTimes(1);

});
