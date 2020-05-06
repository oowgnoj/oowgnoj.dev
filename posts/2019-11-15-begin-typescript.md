---
layout: post
title: "타입스크립트 따라하기"
author: "oowgnoj"
header-img: "img/post-bg-universe.jpg"
subtitle: "typescript tutorial"
category: development
date: 2019-11-15
photo: "https://media.vlpt.us/post-images/chltndid724/0b2147f0-20a3-11ea-bfea-5d0fa0c4a664/ts.png"
tags:
  - typescript
  - begin
---


기본적으로, let 과 const 를 사용해서 변수에 특정 값을 선언 할 때, 해당되는 기본 타입을 명시한다.

아래는 기본타입을 명시하는 예시 입니다.

string : const message : **string** = 'hello world';
boolean : const done : **boolean** = true ;
number array : const numbers : **number[] **= [1, 2, 3]
message array : const messages : **string[]** = ['hello', 'world']

함수는 **parameter**에 기본 타입을 명시합니다. 더해서 **결과값**에도 type을 지정해줍니다.

    function sum(x : number, y : number) : number {
     return x + y;
    }
    sum(1,2) //3

숫자 배열의 총합을 구하는 sumArray 함수

    function sumArray ( arr : Number[]) :number {
      let total : number = 0
      for(let i = 0 ; i < arr.length ; i ++){
         total += arr[i]
       }
      return total;
    }

    //reduce 연습
    function sumArray ( numbers : number[] ) {
      return numbers.reduce((acc, current) => acc + current, 0);
    }

    const total = sumArray([1,2,3,4,5])

interfac** 클래스** 또는 **객체**를 위한 타입을 지정할 때 사용되는 문법
해당 클래스 혹은 객체에서 꼭 필요한 메소드를 포함하고, 결과값에 대한 type까지 정해줘야 한다.

### Class interface

    //shape라는 interface를 선언합니다.

    interface Shape {
      getArea() : number; // shape interface에는 **getArea라는 함수가 꼭 있어야함**
    }

    class Circle implements Shape {
      //`implement` 키워드를 사용해서 해당 클래스가 Shape interface의 조건을 충족하겠다는 것을 명시
      constructor(public radius : *number*) {
        this.radius = radius;
    }
    

typescript에서는 public / private 을 지정해 줄 수 있는데 일반적으로 class / object 바깥에서도 변수를 사용하고 싶다면 public 을 앞에 붙여주고, 그렇지 않다면 private을, 또한 변수명 앞에 _ (underscore)를 사용하면 private variable 의 convention 이다.

tsconfig.json 파일에서 outDir 을 “./dist” 에 설정하게 되면 해당 폴더 안으로 typescript가 compile 된 파일이 생성되게 되고, 실행하면 (node dist/practice) 실행 결과를 얻을 수 있다.

### 일반 객체 interface , extends 사용해서 상속 가능

    interface Person {
      name : string;
      age? : number; //물음표는 설정을 해도 되고 안해도 되는 값

    }

    interface Developer extends Person {
      skills : string[];
    }

    const person : Person = {
      name : 'jongwoo',
      age : 20
    }

    const expert : Developer = {
      name : 'jangoon',
      skills : ['javascript', 'react']
    }

    const people: Person[] = [person, expert]

### Type Alias

type 은 특정 타입에 별칭을 붙이는 용도 : 정의한다고 봐도 무방한지?

    type Person = {
      name : string ; 
      age? : number ; 
    };

    type Developer = Person & {
      skills : string[] ;
    };

    
    const person : Person = {
      name : '김사람'
    };

** type과 interface는 무엇을 써도 상관 없는데 일관성 있게 쓰면 된다. 큰 차이 없다. 다만 라이브러리를 작성하거나 다른 라이브러리를 위한 타입 지원 파일을 작성하게 될 때는 interface 를 사용하는것이 권장 되고 있다.

### Generic

제네릭(Generic)은 타입스크립트에서 함수, class, interface , type 을 사용하게 될 때 여러 종류의 타입에 대하여 **호환을 맞춰야 하는 상황**에서 사용하는 문법이다.

예를 들어 두 객체 A, B를 합쳐주는 merge 라는 함수를 만든다고 가정하면,

    function merge( a: any, b : any) : any {
      return {
         ...a,
         ...b
      }
    }

    const merged  = merge({foo : 1}, {bar : 1});

any 타입을 사용해서 어떤 형태가 들어와도 괜찮다고 표시할 수 있다. 하지만 이러한 경우에 type 추론이 깨진거나 다름없다. 이러한 경우에 <generic> 을 사용하면 된다.

    function merge <A, B> (a: A, b: B) : A & B {
      return {
        ...a,
        ...b
      }
    }

    const merged = merge({foo : 1} , {bar : 1})

Generic 을 사용하면 **어떠한 타입이 들어와도 될 수 있게 되면서도 사용할 때 타입이 깨지지 않게 된다.**

### interface & generic

    interface Items<T> {
      list : T[];
    }
    //Items<T> 부분에 어떠한 타입이 들어와도 괜찮지만 list에는 T 타입으로만 이루어진 list로 구성이 되어있어야 한다.

    const items : Items<String> = {
      list : ['a', 'b', 'c']
    };
    
