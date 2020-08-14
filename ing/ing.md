---
layout: post
title: '커맨드 패턴 with JS'
author: 'oowgnoj'
subtitle: '메소드를 객체 형태로 캡슐화해 뒤로가기, 실행취소 기능을 명확하게 구현할 수 있는 커맨드 패턴을 정리했습니다.'
category: CS Basic
date: 2020-08-10
tags:
    - design pattern
---

## 커맨드 패턴

요청을 객체의 형태로 캡슐화하여 사용자가 보낸 요청을 나중에 이용할 수 있도록 메서드 이름, 매개변수 등 요청에 필요한 정보를 저장 또는 로깅, 취소할 수 있게 하는 패턴이다.
아래 예제처럼 보통은 클래스 내부에 메서드를 만들어 실행 주체에서 실행한다.

```
class Person {
	constructor(name) {
		this.name = name
	}
	introduce(){
		console.log(`안녕하세요 제 이름은 ${this.name} 입니다`)
	}
}
class PersonIntrouce {
	Person.introduce()
}
```

## 손님 - 웨이터 - 주방장 예시

일반적인 식당 예시로 커맨드 패턴에 대해 정리하기 전에 간단한 예시로 커맨드 패턴에 감을 잡을 수 있는 예시를 준비했습니다.

```
(1) 어떤 식당에는 주방장과 웨이터가 있다.
(2) 손님이 들어와, 주문서에 스파게티를 작성하고, 웨이터에게 전달했다.
(3) 웨이터는 주문을 읽고 주방장에게 스파게티 요리를 전달했다.
```

먼저 주방장과 웨이터를 추상화해 클래스로 구현한 코드입니다.

```
class Chef {
  constructor(name) {
    this.name = name;
  }
  cookNoodle() {
    console.log(`chef ${this.name} 가 면 요리를 하고 있습니다`);
  }
  cookPizza() {
    console.log(`chef ${this.name} 가 피자를 만들고 있습니다`);
  }
}
class Waiter {
  constructor() {
    this.orders = [];
  }
  getOrder(order) {
    this.orders.push(order);
  }
  executeOrder() {
    for (let order of this.orders) {
      order.execute();
    }
    this.orders = [];
  }
}
```

다음으로 **주문**을 추상화 합니다. 자바스크립트에서 추상 Class와 method를 정의하는 방법은 아래와 같은 방법을 사용했으나, 사용하지 않아도 무방합니다.

```
// 추상 class Order 정의
const Order = function () {
  if (this.constructor === Order) {
    throw new Error("구체적인 주문을 만들어 주세요.");
  }
};
// 추상메소드 execute 정의
Order.prototype.execute = function () {
  throw new Error("구체적인 주문을 실행해 주세요.");
};
class NoodleOrder extends Order {
  constructor(chef) {
    super();
    this.chef = chef;
  }
  execute() {
    this.chef.cookNoodle();
  }
}
class PizzaOrder extends Order {
  constructor(chef) {
    super();
    this.chef = chef;
  }
  execute() {
    this.chef.cookPizza();
  }
}
```

이제 위의 (1) - (4) 까지 예시를 코드로 옮겨보겠습니다.

```
(1) 어떤 식당에는 주방장과 웨이터가 있다.
(2) 손님이 들어와, 주문서에 스파게티를 작성하고, 웨이터에게 전달했다.
(3) 웨이터는 주문을 읽고 주방장에게 스파게티 요리를 전달했다.
(4) 주방장은 스파게티를 만든다.
```

```
// (1) 어떤 식당에는 주방장과 웨이터가 있다.
let chefJG = Chef('JG');
let waiter = Waiter();
// (2) 손님이 들어와, 30번 주문서에 스파게티를 작성하고, 웨이터에게 전달했다.
let order30 = PizzaOrder(chef=chefJG);
waiter.getOrder(order30);
// (2-1) 손님이 들어와, 31번 주문서에 스파게티를 작성하고, 웨이터에게 전달했다.
let order31 = NoodleOrder(chef=chefJG);
waiter.getOrder(order31);
// (3) 웨이터는 주문을 읽고 주방장에게 스파게티 요리를 전달했다.
waiter.executeOrder();
""" output
chef JG 가 피자를 만들고 있습니다
chef JG 가 면 요리를 하고 있습니다
"""
```

### Command pattern 용어 정리

-   Client (손님)
    -   명령을 내리는 사용자
    -   Receiver(주방장) 에게 Command(피자)를 할지 정한다
-   Receiver (주방장)
    -   Client (손님)의 요청을 수행하는 객체
    -   누가 언제 요청을 했는지 관심 없다. 액션(요리)를 만들기만 하면 된다
-   Invoker (웨이터)
    -   Client와 Receiver를 연결
-   Command (주문)
    -   ConcreteCommand(PizzaOrder)의 추상 클래스
    -   execute()를 공통 인터페이스로 둔다
-   ConcreteCommand(주문-피자)
    -   실제 구체적인 요청 내용을 담는 클래스
    -   누가(JG chef), 무엇을 어떻게 해야하는지

### 장점

-   작업을 수행하는 객체(리시버)와 작업을 요청하는 객체를 분리하기 때문에 SRP 원칙을 잘 지켜낸다.
-   기존 코드 수정 없이 새로운 리시버, 명령어 추가가 가능하기 때문에 OCP 원칙을 잘 지켜낸다.

    OCP(Open-Closed Principle) 개방 폐쇄 원칙 : **확장에는 개방적, 수정에는 폐쇄적**

-   커맨드 단위의 별도의 액션(undo, redo) 등이 가능하고, 커맨드 상속 및 조합을 통해 더 정교한 커맨드를 구현할 수 있다.

### 단점

-   전반적으로 복잡한 코드와 이해가 필요하다.

### 리모컨과 전등, 뮤직플레이어 예제

```
하나의 리모컨에 전등,
> 1 - 9 버튼
> 음악 플레이어 두 개를 연결해서 사용하려고 한다.
```

```
class Light {
    constructor(location) {
        this.location = location;
    }
    on() {
        console.log(`${this.location} 전등이 켜졌습니다`);
    }
    off() {
        console.log(`${this.location} 전등이 꺼졌습니다`);
    }
}
class MusicPlayer {
    constructor(location) {
        this.location = location;
    }
    on() {
        console.log(`${this.location} 음악 플레이어 켜졌습니다.`);
    }
    off() {
        console.log(`${this.location} 음악 플레이어 꺼졌습니다.`);
    }
}
```

```
// 추상클래스 정의
class Command{
	@abstractmethod
	execute()
}
class LightOnCommand extends Command {
	constructor(light){
		this.light = light
	}
	execute(){
		this.light.on()
	}
	undo(){
		this.light.off()
	}
}
class LightOffCommand extends Command {
	constructor(light){
		this.light = light
	}
	execute(){
		this.light.off()
	}
	undo(){
		this.light.on()
	}
}
class musicPlayerOnCommand {
	constructor(musicPlayer){
		this.musicPlayer = musicPlayer
	}
	execute(){
		this.musicPlayer.on()
	}
	undo(){
		this.musicPlayer.off()
	}
}
class musicPlayerOffCommand {
	constructor(musicPlayer){
		this.musicPlayer = musicPlayer
	}
	execute(){
		this.musicPlayer.off()
	}
	undo(){
		this.musicPlayer.on()
	}
}
```

### Invoker - 리모컨

```
class RemoteController {
    constructor() {
        this.button = [...Array(9)];
        this.lastCommand = undefined;
        this.commandHistory = [];
    }
    setCommand(index, command) {
        this.button[index] = command;
    }
    pressButton(index) {
        this.button[index].execute();
        this.lastCommand = this.button[index];
        this.commandHistory.push(this.button[index]);
    }
    pressUndoButton() {
        this.lastCommand.undo();
    }
}
```

### Client

```
// 전등과 음악 플레이어 생성
const myLight = new Light('내방');
const myPlayer = new MusicPlayer('책상 위');
// 리모컨 만들고 명령어 설정
const myRemoteController = new RemoteController();
myRemoteController.setCommand(0, LightOnCommand(light));
myRemoteController.setCommand(1, LightOffCommand(light));
myRemoteController.setCommand(2, MusicPlayerOnCommand(music_player));
myRemoteController.setCommand(3, MusicPlayerOffCommand(music_player));
// 실행
myRemoteController.pressButton(0); // 내 방 전등 켜짐
myRemoteController.pressButton(3); // 챡성 위 뮤직 플레이어 꺼짐
```
