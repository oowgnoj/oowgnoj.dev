---
layout: post
title: 'Clean Code'
author: 'oowgnoj'
path: 'review/cleancode'
subtitle: '제가 작성한 코드는 깨끗하지 않았습니다.'
category: development
date: 2019-12-13
tags:
    - web
    - front-end
    - 독서
    - 리뷰
---

書로모임 프로젝트 에서 리팩토링을 진행했습니다. 컴포넌트, 함수 재사용 등에 중점을 맞춰 진행하다 보니 성에 차지 않는 무언가를 느꼈습니다. 팀원들과 제가 조금 더 이해하기 쉬운 코드를 작성하고 싶었습니다. 이런 배경에서 Clean Code, Robert C. Martin 를 읽게 되었습니다.

먼저 책을 읽는 도중에 들었던 생각입니다.

**‘주니어 개발자로 이제 막 커리어를 시작하는 단계에서 도움이 될까’. ‘혹여나 Clean Code에 사로잡혀 실제 구현하는 개발 능력이 성장하지 못하는건 아닐까’ 하는 우려가 생겼습니다.**

지금은 걱정하지 않습니다. 제가 이 책을 읽었다고 해서 모든 부분에 바로 적용할 수 있다고 생각하지 않습니다. 더해서,\*\* **Clean Code를 작성하기 위한 노력은 **필요성만 느낀다면\*\*, 코딩을 막 접하는 사람도 충분히 노력할 수 있다고 생각하기 때문입니다.

> # 신은 세세함에 깃들어있다.

책 내용을 소개하겠습니다. 추천사 부터 멋진 문장이 나옵니다. 훌륭한 프로그래머는 글도 잘 쓴다는 말이 맞는 것 같습니다.

> ‘훌륭한 소프트웨어 기법은 집중, 침착, 사고라는 규율을 요구한다. 행동이 전부가 아니다. 무작정 설비를 돌려 제품만 찍어난다고 다가 아니다. 5S 철학은 다음 개념으로 이뤄진다.’

5S는 lean production의 (Toyota production System)의 한가지 개념으로 정리, 정돈, 청소, 청결, 생활화를 뜻합니다.

> 불행히도 우리는 세세함에 집중하는 태도가 프로그래밍 기술에 핵심적인 주춧돌이라 여기지 않곤 한다. 코드에서는 일찌감치 손을 뗀다. 본질보다 모양새를 중시하는 가치체계 때문이다.
> 흔히 우리는 아키텍처나 프로그래밍 언어나 좀 더 고차원적인 뭔가가 품질을 결정하는 요인이기를 바란다. **품질은 하늘에서 뚝 떨어진 위대한 방법론이 아니라 사심 없이 기울이는 무수한 관심에서 얻어진다**. 그 활동이 간단하다고 해서 단순하다는 뜻은 아니다. 쉽다는 의미는 더더욱 아니다. 일상적이고 간단한 활동 모두가 인간의 노력에 들어 있는 위대함과 아름다움의 바탕이다.

거대한 소프트웨어 일지라도 내막은 결국 작은 부분의 합으로 이루어져 있습니다. 소설로 비유하면 단어가 문장을 이루고, 문장이 단락이 되고, 단락이 모여 소설이 되는 구조와 비슷하네요. 글을 기계처럼 찍어내지 않고, 무수한 관심을 가져 세세한 부분까지 신경쓰고, 집중, 침착, 사고를 유지하며 글(코드)을 써내야 한다고 말하고 있습니다. 글을 쓰는 것과 코드를 작성하는 것이 공통점이 참 많네요.

그렇다면 세세한 부분까지 신경쓴, 좋은 코드는 무엇일까 하는 의문이 들었습니다. 다행히도 이 책에서 여러 사람들의 의견을 담고 있습니다. 그 중에서 제가 가장 추구하고 싶은 문장을 소개하겠습니다.

> 논리가 간단해야 버그가 숨어들지 못한다.
> 깨끗한 코드는 한 가지를 제대로 한다.
> 모든 테스트를 통과한다.

이런 코드는 읽기는 쉽지만, 쓰기에는 엄청난 노력이 들어갈 것 같다는 생각이 들었습니다.

> # 깨끗한 코드를 작성하려면 ‘청결'이라는 힘겹게 습득한 감각을 활용해 자잘한 기법들을 적용하는 절제와 규율이 필요하다.

저자도 그렇게 말하고 있습니다. 그럼 이 노력을 해야하는 합당한 이유가 필요한데요, 글에서 합리적인 주장과 재치있는 예시를 소개하고 있습니다.

> 코드를 읽는 시간 대 코드를 짜는 시간의 비율이 10대 1을 훌쩍 넘는다. 새 코드를 짜면서 우리는 끊임없이 기존 코드를 읽는다. 주변 코드를 읽지 않으면 새 코드를 짜지 못한다.

    예시)
    밥이 모듈을 입력한다.
    변경할 함수로 스크롤해 내려간다.
    잠시 멈추고 생각한다.
    이런! 모듈 상단으로 스크롤 해 변수 초기화를 확인한다.
    다시 내려와 입력하기 시작한다.
    이런 ! 입력을 지운다.
    다시 입력한다.
    다시 지운다.
    뭔가를 절반쯤 입력하다가 또 지운다!
    지금 바꾸려는 함수를 호출하는 함수로 스크롤한 후 함수가 호출되는 방식을 살펴본다.
    다시 돌아와 방금 지운 코드를 입력한다.
    잠시 멈춘다.
    코드를 다시 지운다....

**이 논리에서 빠져나갈 방법은 없다. 그러므로 급하다면 서둘러 끝내려면, 쉽게 짜러면, 읽기 쉽게 만들면 된다.**

다음 포스트에서는 의미있는 이름, 함수 작성법을 통해 저자가 제시하는 조금 더 clean code를 작성할 수 있는 방법을 소개 하겠습니다. 감사합니다.
