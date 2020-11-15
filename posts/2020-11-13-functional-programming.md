---
layout: post
title: '자바스크립트와 함수형 프로그래밍'
path: 'js/functional-programming-intro'
author: 'oowgnoj'
subtitle: '함수형 프로그래밍에 대한 소개, 이점과 개념을 다룬 글 입니다. 후반부에 예제도 포함하고 있습니다.'
category: development
date: 2020-11-15
tags:
    - 사이드 프로젝트
---


 

함수형 프로그래밍(FP)은 [프로그래밍 패러다임](https://ko.wikipedia.org/wiki/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D_%ED%8C%A8%EB%9F%AC%EB%8B%A4%EC%9E%84#:~:text=%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%20%ED%8C%A8%EB%9F%AC%EB%8B%A4%EC%9E%84(programming%20paradigm)%EC%9D%80,%EA%B2%B0%EC%A0%95%ED%95%98%EB%8A%94%20%EC%97%AD%ED%95%A0%EC%9D%84%20%ED%95%9C%EB%8B%A4.) 중 하나다. 객체 지향 프로그래밍 (OOP)도 프로그래밍 패러다임 중 하나인데, 어느 프로그래밍 패러다임이던 프로젝트에 알맞게 적용하면 크게 아래 다섯가지 이점을 얻을 수 있다.

1. 깨끗하고 이해 가능한 코드
2. 확장 가능한 코드
3. 유지보수에 용이한 코드
4. 메모리 효율성
5. DRY (Don't Repeat Yourself)

패러다임(padadigm)이 어떻게 도움을 주는걸까? 패러다임은 문제 해결을 위한 접근방식이다. 각 패러다임마다 코드의 관심사를  우리가 프로그래밍을 하는 이유는 특정 목표를 달성하기 위함인데, **간단히 말하면 패러다임은 코드 레벨에서 목표 달성을 위해 접근하는 방법이라고 이해했다.** 함수형 프로그래밍은 밑에서 자세히 살펴보고, 조금 더 친숙한 객체 지향 프로그래밍에 대해 생각해보자. 

```jsx
class Dog {
  constructor(name) {
    this.name = name;
  }
	sleep(){
		console.log(`${name} zzZ...`)
	}
}
const JG = new Dog('장군');
JG.eat() 
// 장군 zzZ...
```

꼭 위와 같이 작성하지 않아도 된다. 오히려 아래처럼 코드를 작성한다면 구태여 `class`, `constructor`, `method`, `instancce` 같은 개념을 사용하지 않아도 원하는 목표를 달성할 수 있다. 

```jsx
const JG = '장군'
const JG_sleep = () => console.log(JG, 'zzZ...')
JG //'장군'
JG_sleep() // 장군 zzZ...
```

하지만 만약 강아지가 1 마리가 아니라 100마리가, 아니면 1000000 마리가 있으면 어떤 방식이 효율적일까? 조금만 생각해봐도 첫번째 예제가 앞서 말한 5가지를 더 만족한다. 프로그래밍 패러다임이란 코드를 작성할 때 **선택할 수 있는 접근 방식이다. 선택한 방식에 따라 관심사를 나누고, 코드를 분리하게되면 위 5가지 장점을 가져갈 수 있다.** 이제 함수형 프로그래밍에 대해 알아보자.

## 함수형 프로그래밍

![컨베이어 벨트, istock.com](./../images/in-post/functional/conveyor.jpg)

함수형 프로그래밍 패러다임으로 접근하면 우리의 관심사는 먼저 (1) 함수와 (2) 데이터로 구분할 수 있다. 여기서 함수는 컨베이어 벨트에서 특정 작업을 수행하는 기계의 역할, 데이터는 가공하기 전 원재료 라고 생각할 수 있다. 위의 같은 예제를 함수형으로 접근해보자.

```jsx
// 함수형 프로그래밍
const JG = {name: '장군'} // 데이터
const sleep = (dog) => console.log(`${dog.name} zzZ`) //함수
sleep(JG) // 장군 zzZ...
```

간단하게 위 코드를 설명하면, 먼저 OOP 와는 다르게 데이터(강아지)는 따로 함수(메소드)를 가지고 있지 않다. 위에서 사용된  `sleep` 함수는 어떤 데이터가 들어와도 그 데이터를 잠재우는 역할만을 한다. 

### 순수함수

함수형 프로그래밍에서 순수하게 함수를 구현하고, 설계하는 것은 중요하다. 만약 데이터가 컨베이어 벨트를 통과하며 외부의 다른 요소들을 생성/변경 한다면 더이상 가공된 아이템은 신뢰할 수 없게 된다. 순수함수의 조건은 2가지로 **첫번째는 함수의 side effect 가 없어야 한다.** side effect란 함수 외부의 무언가를 생성/변형 하는 것을 말한다. 두번째는 **같은 input이면 항상 같은 output이 나와야 한다**. 예제를 살펴보자.

```jsx
// 1
const sleep = (dog) => console.log(`${dog.name} zzZ`) 

// 2
const today = () => new Date()

// 3
const multiply = (a,b) => a*b
```

1번은 순수함수 처럼 보이지만 아니다. window 객체의 console.log 함수를 실행해 콘솔창에 로그가 찍히기 때문이다. 2번은 항상 다른 결과 (날짜)를 리턴한다. 2번도 순수함수가 아니다.  마지막 3번은 a, b 두개의 인자를 받아 곱한 값을 리턴하는데 3번의 경우에는 순수함수의 조건 두가지를 모두 만족한다. 순수함수의 특징으로 크게 아래 다섯가지가 있다. 

1. predictable (예측할 수 있다)
2. 1 task (하나의 일을 수행한다)
3. immutable (불변성)
4. composable (구성 할 수 있는)
5. no share state (변하는 값을 공유하지 않는다)

3, 4, 5번은 뒤에서 더 다룰 예정이다. 같은 input에 같은 output이라 함수를 예측 가능하게 한다. 또 하나의 업무를 잘 수행하는 함수다.



## 주요 개념 (main concepts)

함수형 프로그래밍의 주요 개념 몇 가지를 먼저 살펴보고 이해하고 넘어가자.

#### **불변성 (immutability)**

함수의 인자를 직접적으로 조작하지 않고, 복사본을 만들어 명령을 수행하고 반환한다. 

```jsx
const myArray = [1,2,3]
const multiplyBy3 = (array) => array.map(el => el * 3)
const newArray = multiplyBy3(myArray)
console.log(myArray) // [1,2,3]
console.log(newArray) // [3,6,9]
```

자바스크립트의 배열은 주소값을 저장하는 call by reference다. multiplyBy3 함수에서 myArray의 요소에 직접 3을 곱해줬다면 기존 배열의 요소에도 3을 곱한값이 출력되어야 하는데, 기존값은 유지되고 3을 곱한 새로운 배열이 반환된다.

*메모리가 너무 많이 사용되는 것 아닌가요? :* 새롭게 생긴 복사본에서 바뀐 값만 저장하고 기존 값은 그대로 남기는 structuring sharing 전략을 사용해 메모리를 최소화 한다.

#### **커링 (Curring)**

n개의 인자를 단일 인자 함수열로 나타내는 방식.

```jsx
// 일반 함수
const mealToday = (breakfast, lunch, dinner) => {
	console.log(`아침 : ${breakfast}, 점심 : ${lunch}, 저녁 : ${dinner}`)
}
mealToday('X', '제육볶음', '삼겹살') // 중복
mealToday('X', '라면', '삼겹살') // 중복

// 커리 함수
const curriedMealToday = (breakfast) => (lunch) => (dinner) => {
	console.log(`아침 : ${breakfast}, 점심 : ${lunch}, 저녁 : ${dinner}`)
}
```

커링의 장점

- 반복해서 사용하는 함수의 중복을 피할 수 있다.
- 재사용에 유용하다

```jsx
// 커리 함수
const curriedMealToday = (breakfast) => (lunch) => (dinner) => {
	console.log(`아침 : ${breakfast}, 점심 : ${lunch}, 저녁 : ${dinner}`)
}
const noBreakfastToday= curreidMealToday('X')
noBreakfastToday('삼계탕', '우동')
noBreakfastToday('빵', '라면')
```

#### **compose and pipe**


![compose 검색 결과, naver](./../images/in-post/functional/compose.png)

`compose` 와 `pipe` 함수는 여러개의 **순수함수를 조합해** 원하는 결과를 얻는 방법이다. 예를 들어 숫자에 3을 곱하고, 절대값을 취한 값을 얻고자 할 때 사용할 수 있는 일반적인 경우와 함수형 프로그래밍의 경우는 아래와 같다.



```jsx
// 일반적인 방식
const multiplyBy3AndAbs = n => Math.abs(n*3)

// 함수형 프로그래밍
const multiplyBy3 = n => n*3
const makePositive = n => Math.abs(n)

const multiplyBy3AndAbs = compose(multiplyBy3, makePositive)
console.log(multiplyBy3AndAbs(-10)) 
// 30
```

직접 구현해 사용할 수도 있지만, [Ramda](https://ramdajs.com/docs/#compose), [underscore.js](https://underscorejs.org/#compose) 등 라이브러리에 수록이 되어있다. pipe와 compose 의 차이는 조합하는 함수를 어떤 방향으로 먼저 실행하는지에 차이가 있다.

```jsx
const compose = (f, g) => data => f(g(data))
// 오른쪽부터 실행한다. (g, f .. 순으로 실행)
const pipe = (f, g) => data => g(f(data))
// 왼쪽부터 실행한다. (f, g .. 순으로 실행)
```

개인적으로는 `pipe` 함수가 조금 더 직관적이라고 생각하는데, 취향의 문제인 것 같다.

#### **Closure를 사용한 memoization (caching)**

함수형 프로그래밍을 사용하면 간단하게 클로저 변수를 사용해 memoization 기법을 사용할 수 있다. 

예시)

```jsx
const memoizeAddToX = (X) => {
	let memo ={};
	return (n) => {
      if(n in memo){
          console.log('memoized value')
          return memo[n]
			}
      const ans = n+X;
      memo[n]= ans
      return ans;
  }
}

const memoizeAddTo80 = memoizeAddToX(80)
memoizeAddTo80(3)
memoizeAddTo80(4)
memoizeAddTo80(3) //memoized value
```

## 장바구니 예제

쇼핑몰에서 카트에 담은 상품을 구매하는 과정을 함수형으로 구현해보자. 장바구니와 구매 목록이 `배열` 형태로 있고 나머지는 유저 정보를 가지고 있는 유저 객체를 만든다.

```jsx
// 유저 객체
const user = {
	name: 'Kim',
	active: true,
	cart: [],
	purchases: []
}
```

상품을 구매 하기 전, 장바구니에 추가하는 함수를 만들어 볼텐데, 여기서 기억해야할 것은 순수함수로 만들어야 한다. **원본 객체를 변경하지 않고 새로운 유저객체를 돌려준다.**

```jsx
const addToCart = (user, item) => {
	const updatedCart = [...user.cart, item]
	return Object.assign({}, user, {cart: updatedCart} )
}
```

생각보다 쉽다. 우리는 아래와 같이 여러 (순수)함수가 조합된 `compose` 된 `buy` 함수를 만들 수 있다.

```jsx
const TAX_RATE = 0.03
const applyTax = (user)=> {
	let updatedCart = user.cart.map(item => item.price * (1 + TAX_RATE))
	return Object.assign({}, user, {cart: updatedCart} )
}

const buyItems = user => {
	const updatedPurchase = [...user.purchases, ...user.cart]
	return Object.assign({}, user, {purchases: updatedPurchases})
}
const emptyCart = user =>{
	return Object.assign({}, user, {cart: []})
}

const buyItem = compose(emptyCart, buyItems, applyTax)
buyItem(user) 
```

## 정리

- 함수형 프로그래밍은 프로그래밍 패러다임, 즉 문제 해결을 위한 접근 방식으로 활용할 수 있다.
- 하나의 task를 수행하는 (순수) 함수를 조합하여 재사용성을 높여준다.