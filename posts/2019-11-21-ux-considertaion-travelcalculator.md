---
layout: post
title: '긴 로딩시간에 대한 UI적 해결법'
author: 'oowgnoj'
path: 'project/tc-ui-2'
header-img: 'img/post-bg-universe.jpg'
subtitle: "여행계산기 프로젝트를 진행하며 유저의 긴 로딩시간을 UI로 대처했던 경험을 소개합니다. skeleton, spinner, gif 이미지를 사용해 '저희는 쉬지않고 계산하고 있습니다'를 강조하고 싶었습니다."
category: development
date: 2019-11-21
tags:
    - UI
    - front-end
---

이번 블로그에서 Travel Calculator 의 client side를 구현하며 했던 긴 로딩시간에 대한 고민과 해결방안을 공유하려고 합니다.

### 최종 해결방안 : 자체 데이터를 활용, 흥미로운 정보 노출 + spinner + gif

항공권, 호텔, 레스토랑의 외부 API를 활용해 실시간 response 를 받아 유저에게 제공하고 있었습니다. 따라서 외부 API 응답 소요시간에 대한 부정적인 경험을 최소화 하고싶었습니다.

서버 팀원들의 노력으로 평균 응답시간을 약 30초에서 15–20초로 크게 줄일 수 있었지만 여전히 15초 — 20초가 소요 되었습니다. 기능을 구현해보니 한가지의 문제가 더 있었습니다. **‘반응’** 입니다. 버튼을 누른 후 앱에서 아무 반응이 없는 상태로 15초를 기다린 후, 페이지 전환이 되었습니다. 마치 오류가 난 듯 보였습니다. 개선이 필요하다고 느꼈습니다.

### 첫번째 방안은 spinner 입니다.

<iframe src="https://medium.com/media/6c836fec74e9c0217634397b2e5e8622" frameborder=0></iframe>

Ant Design, Material UI 등 여러 design framework 를 통해 spinner 컴포넌트를 사용할 수 있었습니다. **모바일, 웹, 어플리케이션 등 유저 여건을 고려하면 **15초는 시간은 영겁의 시간이라고 생각했습니다. 실제로 적용해보니, 스피너는 큰 역할을 하지 못했습니다. 저마저도 ‘서버에서 에러가 났나..’ 생각이 들었고 콘솔창을 켜봤기 때문입니다.

### 두번째 대처 방법은 gif 입니다.

![countdown gif](https://cdn-images-1.medium.com/max/2000/1*UazJaqHlmjrTg1_alpSKNw.gif)_countdown gif_

다섯부터 count down하는 gif를 사용해서 유저에게 *‘데이터를 준비하고 있어요, 기다려 주세요’ *라는 메세지를 전달하고 싶었습니다. 하지만 반복되는 countdown도 15초의 시간을 매우기에 충분하지 않다고 느꼈습니다.

다른 항공권 사이트를 둘러봤습니다. 스피너 혹은 ‘데이터를 준비중입니다’, ‘조회중 입니다’ 등 유저에게 직접적인 흥미요소나 정보를 주고 있지는 않았습니다.

![네이버 항공권 로딩 페이지](https://cdn-images-1.medium.com/max/2000/1*uMONdHHJ2IYGp1OcUZWImQ.png)_네이버 항공권 로딩 페이지_

### 세번째, 자체 데이터를 활용, 흥미로운 정보 노출

저희는 **이탈률과 체감시간을 줄이기 위해 유저의 흥미 / 도움이 되는 정보를 렌더**링 해야겠다는 생각이 들었습니다. 팀 회의를 통해 기존의/trends 엔드포인트를 활용해 다른 유저들은 어디를 검색했는지, 구체적으로 **특정한 관심사와 연령대, 성별의 사람들은 어떤 도시를 주로 가는지**에 대한 데이터를 준비했습니다.

![](https://cdn-images-1.medium.com/max/2000/1*SpDMiS4o2KTFZCqNTvXuhw.png)

로딩 페이지 입니다. setTimeOut 을 사용해서 3초마다 트렌드 정보를 업데이트 했고, 하단에는 spinner를 넣어 *‘데이터를 준비하고 있습니다' *전달하고 싶었습니다. 상단의 사진에는 보이지 않지만, 손모양 countdown gif를 처음 3초간 노출시켜 유저의 체감시간을 단축시키는 것을 시도했습니다.

### 최종 저희의 대처 방법은 앞서 나온 방법을 모두 사용했습니다.

흥미로운 데이터 + gif + spinner

![](https://cdn-images-1.medium.com/max/2160/1*FyqUsbR0iYG2CJ3y-wQi9Q.gif)

지금 생각나는 보완점은 graph 혹은 chart를 통해 한번에 하나의 데이터를 보여주는 것이 아닌 다양한 데이터를 한눈에 볼 수 있게 하는 것 입니다. 저희에게 15초의 긴 로딩시간은 유저 경험을 직접 체험하고, 개선방법을 고민하고, 나름 해결방법을 찾기 위해 노력했던 좋은 경험이였습니다.

더 나은 방안이나, 아이디어 있으시면 response 달아주시면 감사드리겠습니다 !
