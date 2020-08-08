---
layout: post
title: "HTTP request 보내기 in flutter"
author: "oowgnoj"
header-img: "img/post-bg-universe.jpg"
subtitle : 'flutter에서 http 요청을 보내는 방법을 정리합니다.'
category: development
date: 2020-03-12
photo: "https://flutter.dev/images/flutter-logo-sharing.png"
tags:
  - flutter
---


#### 1. http package 설치

- 플러터 앱에서 api 요청을 보내기 위해서 먼저 *`http`* package 를 설치해야 합니다.

*`/pubspec.yaml`\*에서 dependencies : 부분에 http:\*<*latest_version\*>* 을 추가해 줍니다.

```dart
dependencies:

flutter:

	sdk: flutter
	cupertino_icons: ^0.1.2
	flutter_icons: ^1.0.0+1
	http: ^0.12.0+4
```

**version : 2020년 3월, http: ^0.12.0+4**

- API request를 보낼 파일 상단에 http 모듈을 import 해줍니다.

```*dart*
import 'package:http/http.dart' as http;
```

#### 2. api request 함수 작성

http 요청을 보내는 함수를 작성합니다.

- 기본적인 get 요청 형태입니다.

```*dart*
Future<http.Response> fetch() async{

return http.get('<https://jsonplaceholder.typicode.com/albums/1>');

}
```

`Future `class는 비동기 작업을 할 때 쓰이는 클래스 입니다. 추후에 callback의 결과값을 담는 클래스라고 생각하시면 될 것 같습니다. response를 파싱해 앱 내에서 데이터를 사용하기 위해 위해 **클래스**를 생성해줘야 합니다. 다음에서 자세히 살펴보겠습니다.

#### *클래스 생성

User 정보를 가져오는 Api 와 User class로 예를 들어보겠습니다. 먼저 *`models`* 파일에서 User Class를 정의한 부분에 JSON을 받아 새로운 instance를 생성하는 생성자를 추가해야 합니다.

```*dart*
class User {

	int userId;
	int id;
	String userName;
	String userAdress;

	//user 생성자
	User({this.userId, this.Id, this.userName, this.userAdress});
	
	// factory 패턴 생성자
	factory User.fromJson(Map<String, dynamic> json){
	return User(
		userId: json['userId'],
		id : json['id'],
		userName : json['userName'],
		userAdress : json['userAdress']);
  }
}
```

이때 *`factory`* 키워드를 사용해 User 클래스의 fromJson 메서드를 정의합니다.

**팩토리 패턴 : 객체를 생성하기 위한 인터페이스를 정의하는데 어떤 클래스의 인스턴스를 만들지는 서브 클래스에서 정의하는 패턴.**

나머지 API request 를 보내는 코드를 작성해볼텐데요, User 정보를 가져올 때 query에 userId를 서버에 전달해줘야 한다고 가정을 해보겠습니다.

1. fetchUser 함수에 인자로(userId)를 받는다는 것을 명시해줍니다.
2. Queryparams 라는 Map을 정의하고 userId를 key-value 쌍으로 추가해줍니다 *`{'userId' : userId}`*
3. statusCode가 200을 받게 되면,

```*dart*
Future <User> fetchUser(userId) async {
	Map<String, String> queryParams = {'userId': userId }
	const uri = Uri.http('localhost', '/user', queryparams)
	final response = await http.get(uri);
	
	if(response.statusCode == 200){
	// 서버가 status codee 200을 반환한다면
	return User.fromJson(json.decode(response.body));
	}else{
	//error 분기
	throw Exception('failed to load user');
	}
}
```



<참조>

https://flutter.dev/docs/cookbook/networking/fetch-data