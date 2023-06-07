# JS

## let & const

let 과 const 모두 변수를 할당 할 때 사용함.

const 는 한번 지정하면 다시 바뀌지 않는 상수값을 할당함

## Arrow Function

```js

function myFunc() {

}

const myFunc = () => {

}
```

## Class

```js
class Person {
    constructor () {
        this.name = 'hi'
    }
    printMyName() {
        console.log(this.name);
    }
    call = () => {}
}

const myPerson = new Person()
myPerson.call()
console.log(myPerson.name)


class Human {
    constructor () {
        this.gender = 'male';
    }
    printGender() {
        console.log(this.gender);
    }
}

class Person extends Human {
    constructor() {
        super();
        this.name = 'hi';
    }
}
```

## Classes, Properties , Methods

```js

class Human {
    gedner = 'male';

    printGender = () => {
        console.log(this.gender);
    }
}
```

## Spread & Rest Operators

Spread : 오브젝트의 프로퍼티나 배열의 원소들을 분리하기 위해 사용

```js
const newArray = [...oldArray, 1, 2]
const newObject = {...oldObject, newProp: 5}
```

Rest : 함수의 인수목록을 배열로 합치는데 사용 

```js
function sortArgs(...args) {
    return args.sort()
}
```

## Destructing

```js
[a, b] = ['hello' , 'world']

console.log(a) // hello
console.log(b) // world

{name} = {name: 'hello', age: 1}

console.log(name) // hello
console.log(age) // undefined
```