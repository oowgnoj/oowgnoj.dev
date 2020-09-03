---
layout: post
title: 'Brute Force'
author: 'oowgnoj'
path: 'post/algo-bf'
subtitle: '가능한 모든 경우의 수를 구하는 알고리즘 접근법 Brute Force에 대해 정리합니다.'
category: CS Fundamental
date: 2020-04-12

tags:
    - computer science
    - data structure
    - python
    - linked list
---

알고리즘 접근 방법중에 Brute Force에 대한 정리입니다.

### Brute Force?

직역하면 짐승의 힘 입니다. 저는 느낌적으로 제목에 쓴 것 처럼, 짐승처럼 무식하게라는 느낌을 받았는데요. (모든 짐승이 무식하다는 뜻은 아닙니다! :/)
가장 순진한 알고리즘 접근법으로, 가능한 모든 경우의 수를 구하는 알고리즘 접근법 입니다. 어떻게 풀어야할지 감이 잘 안올때 쉽게 접근할 수 있는 접근방법이고, 그만큼 직관적이고 명확하게 문제를 해결할 수 있습니다. 또한 모든 경우의 수를 다 구하기에, 답을 확실하게 찾을 수 있는 효과도 있습니다. 따라서 알고리즘을 brute force 로 접근한다면 효율적으로 문제를 해결할 수 있습니다.

그만큼 한계도 있는데요, 주어진 input이 크다면 algorithm의 성능을 고려해야합니다.

예제를 살펴보겠습니다.

### 두 카드의 최대곱

첫번째 예제는 input으로 두 배열이 주어집니다. 각각의 배열 안에는 숫자가 주어지는데요, 두 수의 곱이 최대인 값을 반환하는 함수 입니다

```python
def max_product(left_cards, right_cards):
    # code here
```

brute force로 문제를 접근하지 않는다면, 절대값과 두 수의 부호를 사용해 볼 수도 있다는 생각이 드는데요, 직관적으로 모든 경우의수의 곱셈을 해보고 그 중에서 최대값을 반환하는 코드를 작성해볼게요

```python
def max_product(left_cards, right_cards):
    # 코드를 작성하세요.
    max_product= -1 # 초기값 -1
    for left in left_cards:
        for right in right_cards:
           max_product = max(max_product, left * right)
    return max

# 테스트
print(max_product([1, 6, 5], [4, 2, 3]))
print(max_product([1, -9, 3, 4], [2, 8, 3, 1]))
print(max_product([-1, -7, 3], [-4, 3, 6]))
```

비교적 쉽고, 직관적으로 문제를 풀 수 있는 장점이 있는 것 같습니다.
하지만, 두개의 포문이 중첩해서 순환하므로, 시간복잡도는 O(n²)이 됩니다.

### 가장 가까운 두 매장 찾기

두번째 예제는 input으로 매장의 (x, y) 좌표를 담고있는 배열이 주어집니다. `distance` 함수를 통해 두 매장의 거리를 계산할 수 있습니다. 최종적으로 `closest_pair`에서 주어진 레스토랑 중에서 가장 가까이 위치한 두 매장의 좌표를 반환하는 문제입니다.

```python
# 제곱근 사용을 위한 sqrt 함수
from math import sqrt

# 두 매장의 직선 거리를 계산해 주는 함수
def distance(store1, store2):
    return sqrt((store1[0] - store2[0]) ** 2 + (store1[1] - store2[1]) ** 2)

# 가장 가까운 두 매장을 찾아주는 함수
def closest_pair(coordinates):
    # 여기 코드를 쓰세요


# 테스트
test_coordinates = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)]
print(closest_pair(test_coordinates))
```

```python

# 제곱근 사용을 위한 sqrt 함수
from math import sqrt

# 두 매장의 직선 거리를 계산해 주는 함수
def distance(store1, store2):
    return sqrt((store1[0] - store2[0]) ** 2 + (store1[1] - store2[1]) ** 2)

# 가장 가까운 두 매장을 찾아주는 함수
def closest_pair(coordinates):
    min = []
    dist = None
    for i in range(len(coordinates)):
        for j in range(i+1, len(coordinates)):
            if len(min) == 0 : # 초기
                min = [coordinates[i], coordinates[j]]
                dist = distance(coordinates[i], coordinates[j])
            elif dist > distance(coordinates[i],coordinates[j]):
                min = [coordinates[i], coordinates[j]]
                dist = distance(coordinates[i],coordinates[j])
            else:
                continue
    return min


# 테스트
test_coordinates = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)]
print(closest_pair(test_coordinates))
```

이번 문제에서도 마찬가지로 이중포문에서 **_모든 경우의 수_**를 `dist`를 비교하고, 가장 가까운 거리의 두 매장을 `min` 배열에 넣어 return 하는 함수를 구현했습니다. 시간복잡도 마찬가지로 두 반복문 모두 반복 횟수가 n에 비례하므로 O(n²) 입니다.

### 강남역 폭우

강남역에 엄청난 폭우가 쏟아졌을 때 건물 사이에 담길 수 있는 빗물의 양을 계산하는 함수를 구현합니다. 예를 들어, 파라미터 buildings는 [3,0,0,2,0,4] 가 주어졌을 때, 0번 인덱스에 높이 3의 건물이, 3번 인덱스에 높이 2의 건물, 5번 인덱스에는 높이 4의 건물이 있다는 뜻 입니다. 1,2,4 번 인덱스에는 건물이 없습니다.

그러면 아래의 사진처럼 총 10 만큼의 빗물이 담길 수 있습니다. 따라서 `trapping_rain` 함수는 10을 리턴합니다.
{% include image.html url="/img/in-post/data-structure/building1.png" description="출처 codeit" %}

```python
def trapping_rain(buildings):
    # 코드를 작성하세요

# 테스트
print(trapping_rain([3, 0, 0, 2, 0, 4]))
print(trapping_rain([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
```

```python
def trapping_rain(buildings):
    # 코드를 작성하세요
    totalAmt = 0
    for i in range(1, len(buildings)-1):
        max_left = max(buildings[:i]) # i번째 건물 기준으로 왼쪽 제일 높은 빌딩
        max_right = max(buildings[i:]) # i번째 건물 기준으로 오른쪽 제일 높은 빌딩
        upper_bound=min(max_left, max_right) # 담길 수 있는 물의 양

        totalAmt += max(0, upper_bound - buildings[i]) # 담길 수 있는 물의 양 - 빌딩 높이
    return totalAmt
```

함수 `tapping_rain`은 위의 두 예제처럼 모든 index에 접근해 빗물의 양을 구합니다.

### 정리

brute force 알고리즘은 모든 방법을 계산하기에 확실하고 직관적인 알고리즘 접근법입니다. 하지만 모든 방법을 본다는 것 자체가 효율적인 방법은 아닙니다.
가로 19, 세로 19칸의 바둑판에 돌을 놓을 때마다 경우의 수를 계산해야 한다고하면, 19 \* 19 = 360! 가지의 경우의 수를 모두 계산해야 합니다.
