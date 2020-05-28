---
layout: post
title: "OS-2 시스템 구조와 프로그램 실행"
author: "oowgnoj"
subtitle: "Operating System"
category: CS Basic
date: 2020-05-20
photo: "https://t1.daumcdn.net/cfile/tistory/246E444E5782046738"
tags:
  - computer science
  - OS
  - 운영체제
---


컴퓨터 시스템 구조에서 가장 중요한 역할을 하는 hardware device는 CPU와 메모리, 그리고 각종 I/O 장치들이다. I/O 장치는 hard disk, 키보드, 모니터, 마우스 등을 포함한다. CPU는 메모리부터 기계어를 불러와 **빠른 시간에** 처리한다. 이 때 program counter라는 CPU register가 가르키는 memory 주소에서 instruction을 실행한다. 그렇다면 program counter는 다음 CPU가 어떤 작업을 수행 해야할지 알려주는 기능을 한다는 것을 알 수 있다.

CPU가 program counter의 다음 instruction을 실행하기 전 interrupt line에 interrupt가 있는지 확인한다. interrupt가 있다면 CPU 제어권이 OS로 넘어가게 된다. 
mode bit이 CPU의 제어권이 현재 누구에게 있는지 확인하는 역할을 한다. 1: 사용자 프로그램, 0: 운영체제 에서 CPU를 사용하고 있음을 나타낸다.

각 I/O 장치마다 device controller를 가지고 있다. device controller는 해당 I/O 장치를 관리하는 일종의 작은 CPU로서 I/O 장치와 CPU 사이에서 의사소통을 담당해준다. 예를 들어, CPU가 모니터에 동영상 스트림을 전송한다고 하면, 모니터에 직접 stream을 보낼 수 없다. 따라서 모니터를 담당하는 device controller에게 '이 스트림 데이터를 모니터에 표현해줘!' 하고 요청을 보내면 모니터 device controller 안에 있는 data register에서 모니터는 해당 데이터를 읽어 화면에 그려준다. 키보드 input 요청이 있을 때에도, 키보드로 타자를 치면 어떤 값을 사용자가 입력했는지 keyboard device controller 가 data register 안에 그 값을 저장(local buffer) 한다.


초당 500타의 빠른 속도로 타자를 치거나, 4K 화질의 영화를 보고 있다면 많은 양의 I/O 작업을 수행해야 한다. 그럼 I/O 장치(키보드) 와 사용자 프로그램은(netflix)는 상당히 빈번하게 interrupt line에 I/O interrupt를 요청을 보내게 된다. 그럼 OS로 제어권이 넘어가고 프로그램이 정상적으로 수행되지 못한다. 

DMA(Direct Memory Access) controller는 이때 CPU의 interrupt 걸리는 빈도를 줄여주는 역할을 한다. 직접 memory에 접근할 수 있는 controller로서, **byte 단위가 아닌 block/page 단위의 데이터를 다룬다**. I/O가 CPU interrupt 너무 요청이 많다 보니, DMA가 직접 device 내부에 local buffer에 있는 데이터를 memory에 복사하고, 이 작업이 끝나면 CPU에 interrupt를 건다.

하지만 모든 I/O를 DMA가 수행하는 것은 아니다. CPU가 해당 I/O요청에 대해 memory controller가 작업할지, DMA가 작업할지 정해준다.


Timer는 특정 프로그램이 CPU를 시간적으로 독점하는 것을 막는 장치다. CPU는 다음 instruction이 실행되기 전, 실행될 수 있는 한계 시간을 정하는데 이 때 시간을 기록하는 것이 Timer의 역할이다. Timer와 CPU가 상호작용 하는 것은 다음과 같다.
1. 운영체제가 실행되다 프로그램 A로 넘어갈 때, timer에 시간 값을 설정한다.
2. 시간이 끝나면 timer는 CPU에 interrupt를 건다.
3. CPU 제어권이 프로그램 A 로부터 OS로 넘어간다
4. OS는 다시 사용자 프로그램 B에 CPU 제어권을 넘겨주고, Timer 설정을 다시 한다.
5. 프로그램이 종료되면 CPU 제어권은 자동 반납된다.



모든 I/O 요청은 특권 명령이다. 사용자 프로그램에서 I/O요청이 있다면, interrupt를 걸어 OS가 제어권을 가진 상태에서 I/O 작업을 수행한다. 사용자 프로그램이 OS에게 I/O 요청을 부탁하는 것은 **system call** 이라고 한다. 이처럼 사용자 프로그램이 I/O요청을 위해 자발적으로 interrupt 를 거는 것이 아니라, 프로그램이 오류를 범한 경우에도 interrupt가 걸린다. **Exception**이라고 부른다.
현대의 운영체제는 interrupt에 의해 구동된다.


### 동기적, 비동기적 입출력 (synchronous and asynchronous I/O)

보통 synchronous 는 동기적, 순차적으로 해석된다. 평소에 잘 사용하지 않은 단어이기도 하고, 어떤 방식으로 해석하는지에 따라 오해를 낳을 수도 있어 잘 이해하는것이 필요하다. 
I/O 요청이 동기적으로 수행되면, 해당 I/O가 끝날 때까지 기다려야만 다음 instruction을 실행할 수 있다. 비동기적으로 수행될 경우에는 해당 I/O 작업이 시작되면, 끝나기를 기다리지 않는다. 그 즉시 CPU 제어권이 사용자 프로그램에게 넘어가 다음 instruction을 수행한다.



### 저장장치 계층구조
그림에서 위에 위치할 수록 speed, cost, volability가 증가된다. 속도가 빨라지고, 가격이 올라가고, 휘발성(전원이 꺼지면 정보를 더이상 저장하지 못함)의 특징을 가진다. primary 저장장치의 특성은 CPU가 직접 접근이 가능하고, byte 단위 접근이 가능하다. 그리고 CPU가 실행가능한 특성을 가지고 있다. secondary 영역에 있는 저장장치는 CPU가 직접 접근이 불가하고, sector 단위의 접근이 가능하다.



### 그렇다면 프로그램이 어떻게 실행되는가

사용자 프로그램이 실행되게 되면, 각 프로그램의, virtual memory 가 생성된다. 각 프로그램에서 함수 단위로 나누어져 있을 때, 함수 A를 실행할 차례에는 그것만 물리적 메모리에 올려서 사용한다. 이미 실행되었거나 대기하는 코드는 disk(swap area)에 내려놓고 사용한다









