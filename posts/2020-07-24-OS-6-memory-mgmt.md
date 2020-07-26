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


## Memory management 
프로세스의 데이터 저장 방법에 대한 관리법

### 메모리 주소
- symbolic address : 코드 단에서 설정하는 address (ex `a= 10`)
- virtual(logical) address: 프로그램이 이상적으로 사용하는 주소 체계
- physical address : 실제 memory의 주소

![OS](./../images/in-post/OS/VMandLM.png)

### 주소 바인딩

**logical memory(프로그램) → physical memory (메모리) 주소에 바인딩이 필요하다**

1. compile time binding : 프로그램이 컴파일 될 때 **logical memory가 physical memory 그대로 올라간다.**
2. load time binding : 프로그램이 컴파일 될 때 **logical memory는 physical memory에 비어있는 부분으로 올라간다.**
3. run time binding : load time binding 과 같지만, **프로그램이 실행된 후에도 physical memory 내 주소가 변할 수 있다.**
    - MMU(memory management unit) : register 두개로 logical memory → physical memory 변환 해주는 장치다.
    EX)
        - relocation register는 : logical memory가 physical memory 시작부분을 더해준다.
        - limit register : 하지만 더하기 이전에 요청된 주소와 program의 최대 주소를 비교해 악용으로 다른 프로그램 memory에 접근하는지 확인하는 limit register 가 있다.

### 물리적 메모리를 어떻게 관리?

- **낮은 부분의 주소는 OS 상주 영역, 높은 부분은 사용자 프로세스가 올라간다**

## 사용자 프로세스 영역의 할당 방법

#### 연속 할당 (contiguous allocation)

1. **고정 분할 방식**
- 물리적 메모리를 여러 크기로 나누어 자르고, virtual 메모리 프로세스의 크기에 맞게 할당한다. 1번 공간에 프로세스 A가 할당 되었다가 프로세스 B가 올라갔다. 이 때 프로세스 B는 A보다 작다. 그 때 남는 공간은 내부 조각 이라고 한다.
- 외부조각 은 물리적 메모리의 1번, 2번 프로세스 사이에 비어있는 공간을 말한다.

2. **가변 분할 방식**

- 메모리가 할당되는 순서대로 물리적 메모리에 차곡차곡 할당된다.
- 운영체제는 물리적 메모리 중간중간 비어있는 hole에 대한 정보를 가지고 있고, 다음 프로세스를 할당할 때 참고해야 한다.
- **Dynamic storage allocation problem**
    - size n인 요청을 만족하는 가장 적절한 hole을 찾는 문제
    - first-fit, best-fit, worst-fit 등의 방법이 있다
- compaction : 실행중인 메모리를 한 군대로 몰아 hole을 처리한다.

#### 불연속 할당 (non-contiguous allocation)

**페이징 기법**

- 페이징 기법**은 process의 virtual memory를 동일한 사이즈의 페이지 단위로 physical memory에 할당하는 방식이다.**

**page-table**

- 프로세스의 logical memory -> physical memory 로 address binding 을 할 때 page table을 사용한다.
- page table 연산 + 실제 메모리 접근 으로 약 2배의 시간이 소요된다
- TLB를 사용한다. (자주 쓰는 데이터를 캐싱하는 하드웨어, page table의 일부만 가지고 있고, parallel search가 가능하다.
- TLB가 담고 있는 정보
    - physical memory address
    - Valid(v) / Invalid(i) Bit
    - protection bit

**Two-level page table**

- 프로그램이 사용하는 주소체계는 상당히 일부분 임에도, 프로그램이 **4G(32bit 체계)에 해당하는 메모리 주소정보를 모두 가지고 있을 필요가 없기 때문에 (모든 page table을 가지고 있을 필요가 없다.)**
- Two-level page table은 메모리 공간 절약을 위해 사용한다.
- multi-level page table도 마찬가지.

**어떻게 공간 절약을 할까?**

- page table 자체를 page로 구성한다.
- 하드디스크에 저장하고 있다가 필요시 메모리 (on demand)로 로드하는 방식

**Inverted page table** 

- 기존 page table의 문제점 :
    - 모든 프로세스 마다 logical address에 대응하는 모든 page에 대해 page table entry가 따로 존재
    - 대응하는 page가 메모리에 있든 아니든 간에 page table에는 entry로 존재
- system-wide 하게 page table이 한개 존재한다. page table entry에는 물리적 메모리의 page frame이 담고 있는 내용을 표시 (pid, process의 logical address)
- 단점 : 테이블 전체를 탐색해야 함
- 조치 : associative register 사용 해 병렬탐색 (exprensive)

**shared page**

- **read-only**로 하여 프로세스 간에 하나의 code 만 메모리에 옮김
- shared code는 모든 프로세스의 logical address space에서 동일한 위치에 있어야 한다
    - 코드가 컴파일 될 때 주소가 적혀있다
--

### Segmentation

불연속 할당의 한 방법으로 **physical memory 에 의미 단위로 나누어 올리는 기법이다.**

- Logical address 는 segment-number, offset으로 변경
- Segment table
    - base - starting physical address of the segment
    - limit = length of the segment
- 주소변환을 위해 제공되던 CPU 레지스터
    - segment-table-base-register
        - **물리적 메모리에서의 segment table의 위치**
    - segment-table-length-register
        - **프로그램이 사용하는 segment 의 수, entry 갯수가 몇개인지**

장점 : 

1. 의미 단위로 쪼개어 segment table이 가볍다. 
2. **shared segment,** protection과 같은 (Read, Read/write 권한 등) 설정을 하기 용이하다.
    - 이 때 shared segment의 논리적 주소는 각 프로세스에서 동일한 segment address 를 사용해야 한다.

단점 : first fit / best fit, external fragment 발생

---

### Paged Segmentation

의미 분할, 공유, 보안 등은 segment 단위로,  물리적 메모리에 올라갈 때는 page 단위로 올라간다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d8b0e783-9749-4ed8-a033-4e57fa28e1d0/Screen_Shot_2020-06-26_at_7.13.32_AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d8b0e783-9749-4ed8-a033-4e57fa28e1d0/Screen_Shot_2020-06-26_at_7.13.32_AM.png)
![OS](./../images/in-post/OS/os-segmented-paging1.png)


### Memory Management

- 물리적 메모리 관리
- 주소 변환에서 운영체제의 역할? → 운영체제가 하는 역할은 하나도 없음
    - 프로세스가 CPU를 가지고 있었을 때 메모리에서 instruction을 실행할 때 주소변환을 사용하는데, 이 때 마다 OS 로 제어권이 넘어가는건 말이 안됨.


### 정리
- CPU는 RAM에 있는 데이터를 읽어 instruction을 수행한다.
- 연속 할당이 저장공간 관리 측면에서 한계가 있어 `paging` 기법이 사용되고 있다.
- paing 기법에서 프로그램이 실질적으로 사용하는 주소는 일부지만, 모든 메모리에 대한 주소값을 저장하고 있어 비효율이 발생하는 부분은 multi-level 페이징 기법으로 해결했다.
- segmentation 기법은 데이터를 의미 단위로 쪼개어 메모리에 올리는 방법이다.
