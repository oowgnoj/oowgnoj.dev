---
layout: post
title: "OS-6 memory management"
author: "oowgnoj"
subtitle: "Operating system"
category: CS Basic
date: 2020-07-28
photo: "https://previews.123rf.com/images/jemastock/jemastock1704/jemastock170405487/75950616-profile-human-head-brain-memory-vector-illustration-eps-10.jpg"
tags:
  - computer science
  - OS
  - 운영체제
---

kowc에서 제공하는 [반효경 교수님의 운영체제](http://www.kocw.net/home/search/kemView.do?kemId=1046323&ar=pop) 강의를 듣고 정리한 글 입니다.



## Virtual Memory

가상메모리를 사용하는 시스템은 여러 프로그램이 동시에 실행되는 것처럼 보여도 어느 한 순간에는 한 개의 프로그램만 실행되고, 한 프로그램내에서도 그중 일부만 실행하기 때문에 당장 필요한 부분만 주기억장치에 저장하고, 나머지는 그대로 보조기억장치에 두고 실행함으로써 실제의 메모리 용량보다 큰 프로그램이나 여러 개의 프로그램을 실행할 수 있도록 해줍니다.

### Demand paging

- 실제 필요할 때 page를 메모리에 올리는 기법
- valid / invalid bit
    - invalid bit : 사용되지 않거나, 물리적 메모리에 없는 경우 MMU가 trap (page fault) 발생시킴

        **page fault**

        invalid page 접근 —> (physical) get empty page frame —> (없다면) replace —> disk I/O

        - disk I/O가 끝날 때 까지 프로세스는 CPU block
        - disk read —> page table entry 기록 —> **valid**/invalid —> ready queue process inserted

        ---

        **replace :** page frame에 새로운 page에 대한 공간이 부족할 때

        - LRU(Least Recently Used) : 가장 오래전에 사용된 페이지 삭제
            - `linkedList` 로 구현, `**O(1)**`
        - LFU(Least Frequently Used) : 가장 적게 사용된 페이지 삭제
            - `heap` , 최대 `O(log n`

        ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19de5b7e-428b-4bed-916a-f406ae5bb3f6/Screen_Shot_2020-06-29_at_7.31.13_AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19de5b7e-428b-4bed-916a-f406ae5bb3f6/Screen_Shot_2020-06-29_at_7.31.13_AM.png)

### cf) 다양한 caching 환경

cache 기법 : 한정된 빠른 공간에 저장 후, 후속 요청 시 캐시 로 부터 직접 서비스하는 형식

- page system 외에도 cache memory, buffer caching, web caching등 다양한 분야에서 사용

**Page sytem에서 LRU, LFU 가능한가?**

page fault trap이 걸려 운영체제로 제어권이 넘어가 physical memory에서 LRU, LFU를 하는 것인데, 

**page fault 가 나지 않는다면 운영체제는 해당 페이지에 접근했는지에 대한 시간이나 횟수를 모른다.**

### 대안 : clock algorithm

가장 최근에 참조되지 않은 페이지를 삭제하는 algorithm

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0c943ddc-f7b1-45aa-b6eb-c72c10603092/unnamed.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0c943ddc-f7b1-45aa-b6eb-c72c10603092/unnamed.png)

- CPU가 logical memory 주소 —> 주소변환 하드웨어 —> 페이지에 접근 —> valid —> **page table의** `reference  bit` 를 1로 설정한다.
- 운영체제가 페이지 삭제를 위해 reference bit이 0 인 것을 찾는다. 
이 때  `reference bit` 가 1 이라면 0으로 설정한다.
- 만약 자주 사용되는 페이지라면 reference bit = 1
- `modified bit` 를 함께 사용해 I/O 동반 여부를 체크하기도 한다.

### Page allocation : 각 프로세스에 얼마만큼의 페이지를 할당 할 것인가

- 필요성 : CPU가 instruction을 수행하기 위해 한번에 여러 페이지에 메모리 접근을 해야 한다.

    ex) Loop를 구성하는 page 들

- 종류 : equality, proportional, priority
- Global vs Local replacement

**Thrashing**

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/668ebd54-b9a2-4709-9a31-139c4cce515f/Screen_Shot_2020-06-30_at_7.32.42_AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/668ebd54-b9a2-4709-9a31-139c4cce515f/Screen_Shot_2020-06-30_at_7.32.42_AM.png)

프로세스의 원활한 수행에 필요한 최소한의 page frame 수를 할당 받지 못했을 때 

**동시에 메모리에 올라가 있는 프로그램의 갯수 조절 —> working set algorithm,**

**working-set algorithm :** 프로그램은 한정적인 page 를 반복해서 참조하는 특성을 이용

**working-set:** 프로세스가 과거에 참조 했던 page의 모임

process의 working set 전체가 메모리에 올라와 있어야 수행되고, 그렇지 않은 경우 모들 frame을 반납 후 swap out(suspend) 

### page-fault frequency

프로세스의 page fault 비율에 upper, lower bound를 설정한다. 

upperbound를 초과한다면, process의 page frame 수를 늘리고

lowerbound 미만이라면  page frame 수를 줄인다.

빈 frame이 없으면 일부 프로세스를 swap out한다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d13ce81-1852-42e1-b718-8649dc5cdf5b/Screen_Shot_2020-06-30_at_7.47.26_AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9d13ce81-1852-42e1-b718-8649dc5cdf5b/Screen_Shot_2020-06-30_at_7.47.26_AM.png)

### page size

페이지 사이즈를 작게 하면 페이지 수가 증가하고, 페이지 테이블의 크기가 증가하게 된다. internal framentation이 감소하고, disk transfer 효율성이 감소한다. 하지만 필요한 메모리만 올라와 메모리 이용에 효율적이다.

하지만 page size를 늘리는 것이 trendsㅎ다


### 정리
- process synchronization은 여러 프로세스가 공유 데이터에 접근하여 연산을 수행하는 경우 발생하는 `race condition`을 방지하기 위함이다.
- 프로그램 / 하드웨어적 해결방법`(test_and_set)`이 있다.
- `test_and_set` 을 추상화시켜 프로그래머가 편리하게 사용할 수 있는 `Semaphore`, `Monitor`과 같은 방법으로 프로세스 간 동기화를 구현할 수 있다.