# Do-it 2024-1 Spring Study Final Project

## 요구사항

### 목표

방명록을 작성하고, 작성된 방명록을 검색할 수 있는 웹사이트의 서버를 구축한다.

### 기능 명세

### 기능 1 - 방명록 작성

- 방명록은 웹사이트에 접속하는 누구나 작성 가능하다.
- 방명록은 formData 형태로 아래의 값들을 작성할 수 있다. 작성 후에는 Upload 버튼을 통해 전달한다. 아래의 [필수] 필드에 값이 존재하지 않는다면 전송할 수 없다.
    - [필수] 제목 ( title ) → String
    - [필수] 내용 ( content ) → String
- Upload 버튼 클릭 후에는, 서버로 다시 요청을 전달하여 모든 방명록을 다시 보여준다.

### 기능 2 - 방명록 리스트 보여주기

- 방명록 보여주기 기능은 기본적으로 상단에 존재하는 검색창의 키워드에 의해 view가 결정된다.
- 기본적으로 방명록 보여주기 기능은 날짜가 최신인 것이 가장 위에 존재하는 구조이다.
- 아무것도 적히지 않았을 때는, 전체 방명록 리스트를 보여준다.
- 키워드를 적은 후에 오른쪽 search 버튼을 클릭할 경우, 키워드가 포함된 방명록들만 보여진다.
    - 이 때, 키워드가 포함이라는 것은 제목 또는 내용에 해당 키워드가 존재하면 된다.
- 방명록 리스트로 보여지는 방명록들은 요약된 버전의 방명록이다.
- 오른쪽 따봉 버튼을 통해서, 방명록 좋아요를 누를 수 있다.

### 기능 3 - 방명록 단건 보여주기

- 방명록 리스트 상태에서 특정 방명록을 클릭하는 경우, 해당 방명록이 모달 형태로 등장한다.
- 여기서 보여지는 방명록은 postId를 제외한 방명록의 모든 필드를 view로 보여준다.
- 모달은 Close 버튼과 따봉 버튼이 하단에 존재한다.
- Close 버튼을 통해 닫을 수 있다.
- 따봉 버튼을 통해 방명록에 좋아요를 누를 수 있다.

### 기능 4 - 방명록 좋아요 누르기

- 방명록 1개에 대해서 좋아요를 누른다.
- 현재 모델에서는 중복 좋아요가 허가된다. ( 유저 식별 불가하므로 )

## API 명세서

### 방명록 등록하기: `POST`  /posts

**Request**

```json
{
  "title": String,
  "content": String
}
```

```json
{
  "title": "반갑다. 나다.",
  "content": "배고프다."
}
```

**Response - Success 200 OK**

```json
{
  "postId": Long
}
```

```json
{
  "postId": 12
}
```

### 방명록 여러 개 조회하기 : `GET`  /posts?keyword={keyword}

**Request**

- RequestParam : 방명록의 title 또는 content를 대상으로 사용되는 keyword 검색 값이다. 해당 값이 존재하는 모든 방명록을 결과로 전달한다.

**Response - Success 200 OK**

```json
{
  "result": [
    {
      "postId": Long,
      "title": String,
      "content": String,
      "likes": Integer
    },
    {
      "postId": Long,
      "title": String,
      "content": String,
      "likes": Integer
    },
    {
      "postId": Long,
      "title": String,
      "content": String,
      "likes": Integer
    }
  ]
}
```

```json
{
  "result": [
    {
      "postId": 6,
      "title": "커피와 함께하는 아침",
      "content": "서울 커피 왜캐 비싸요?",
      "likes": 10
    },
    {
      "postId": 3,
      "title": "서울의 봄",
      "content": "서울의 봄은 짧지만 아름다운 계절이다. 벚꽃이 만개하는 공원에서의 산책은 봄의 절정을 맞이하는 순간이다.",
      "likes": 2
    },
    {
      "postId": 1,
      "title": "개발자의 일상",
      "content": "MySQL에는 이모티콘이 utf8mb4부터 가능하네요. 신기합니다. 서울 가고 싶어라",
      "likes": 6
    }
  ]
}
```

### 방명록 단건 조회하기 : `GET`  /posts/{postId}

**Request**

- PathVariable : 방명록 Id를 바탕으로 방명록 1개의 자세한 정보를 확인한다.

**Response - Success 200 OK**

```json
{
  "postId": Long,
  "title": String,
  "content": String,
  "createdAt": LocalDateTime,
  "likes": Integer
}
```

```json
{
  "postId": 1,
  "title": "아침뭐먹지",
  "content": "콘푸로스트? 콘프로스트?나 먹자",
  "createdAt": "2024-05-22T08:30:00",
  "likes": 10
}
```

### 방명록 좋아요 누르기 : `PUT` /posts/{postId}/likes

**Request**

None

**Response - Success 200 OK**

```json
{}
```