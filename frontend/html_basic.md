# HTML

## 블록 레벨 요소, 인라인 요소

1. 블록 요소
    - DIV
    - H1
    - P
2. 인라인 요소
    - SPAN
    - IMG

## 블록 요소의 특징

1. 사용 가능한 최대 가로 너비를 사용함

2. 크기를 지정 할 수 있다. (width: 100%; , height: 0; 으로 시작)

3. 수직으로 쌓임

4. margin, padding 위, 아래, 좌, 우 사용 가능하다.

5. 레이아웃을 잡는 요소로 사용

## 인라인 요소의 특징

1. 가로 너비를 전체를 사용하지 않고, 포함된 내용 만큼만 가로 너비를 사용함

2. 크기를 지정 할 수 없다. (width: 0; height: 0; 으로 시작)

3. 수평으로 쌓임

4. margin, padding 위, 아래는 사용 할 수 없다. (좌우에는 반영 됨)

5. 텍스트를 다루는 용도로 사용

### display: inline/block

```css
span {
    display: block;
    width: 10px;
    height: 20px;
}
``` 

위와 같이 `display: block` 과 같은 속성/값을 사용하면 인라인 요소를 블록 요소처럼 보이도록 할 수 있음.

`display: inline` 또한 어떤 요소를 인라인 요소처럼 보이도록 지정하는 css 속성/값이다.

## Body 내 구조 개념

### Header 

`<header>` 요소는 소개나 탐색을 돕는 것의 그룹을 나타냅니다. 일부 제목 요소들을 포함 할 수도 있지만, 로고나 구획의 제목, 탐색 폼과 같은 것들이 포함될 수 있음.

### Footer

`<footer>` 요소는 가장 가까운 구획화 콘텐츠나 구획화 루트의 푸터를 나타냅니다. 푸터는 일반적으로 작성자 구획, 저작권 데이터, 관련된 문서의 링크에 대한 정보를 포함합니다.

### H1 ~ H6

`<h1> - <h6>` 요소는 6단계의 문서 제목을 구현합니다. 구획 단계는 `<h1>` 이 가장 높고 `<h6>` 은 가장 낮습니다.

제목 폰트의 크기를 줄이기 위해 낮은 단계를 사용하는것보다는, CSS 의 `font-size` 속성을 사용하세요.

제목 단계를 건너뛰는 것을 피하고, 첫번째 단계의 제목은 한 페이지에 하나만 사용하세요


### Main

`<main>` 요소는 문서나 앱의 주요 콘텐츠를 나타냅니다. 주요 콘텐츠 영역은 문서의 핵심 주제나 애플리케이션의 핵심 기능성에 대해 부연, 또는 직접적으로 연관된 콘텐츠들로 이루어집니다.

### Article

`<article>` 독립적으로 구분되거나 재사용 가능한 영역을 설정

하나의 문서가 여러개의 `<article>` 을 가질 수 있습니다. 

### Section 

문서의 일반적인 영역을 설정

일반적으로 `<h1> ~ <h6>` 를 포함하여 식별합니다.

```css
section { display: block; }
```

## A

`<a>` 다른 페이지, 같은 페이지 위치, 파일, 이메일 주소, 전화번호 등 다른 URL로 연결 할 수 있는 하이퍼링크를 설정. (Anchor)

|속성|의미|값|기본값|특징
|---|---|---|---|--
|download|이 요소가 다른 리소스를 다운로드 하는 용도로 사용됨을 의미|불린(Boolean|
|href|링크 URL|URL||생략 가능
|hreflang|링크(URL)언어|ko, en...|
|rel|현재 문서와 링크 URL 의 관계|license, prev, next, ...|
|target|링크 URL의 표시 위치|_self, _blank|_self
|type|링크 URL의 MIME 타입| text/html ...

```css
a { display: inline; }
```

## Abbr

`<abbr>` 약어를 지정. 보통 title 속성을 사용하여 전체 글자나 설명을 제공

```html
Using <abbr title="HyperText Markup Language">HTML</abbr> is fun and easy !
```

```css
abbr { display: inline; }
```

## B

`<b>` 문체가 다른 글자의 범위를 설정

- 특별한 의미를 가지지 않음
- 읽기 흐름에 도움을 주는 용도로 사용
- 다른 태그가 적합하지 않는 경우 마지막 수단으로 사용
- 기본적으로 글자가 두껍게 (bold) 표시 됨

```css
b { display: inline; }
```

## Mark

`<mark>` 사용자의 관심을 끌기 위해 하이라이팅 할 때 사용

- 기본적으로 형광펜을 사용한 것 처럼 글자 배경이 노란색으로 표시됨

```css
mark { display: inline; }
```

## Em

`<em>` 단순한 의미 강조를 표시

- 중첩이 가능
- 중첩될수록 강조 의미가 강해짐
- 정보통신보조기기 등에서 구두 강조로 발음됨
- 기본적으로 이랠릭체로 표시됨

```css
em { display: inline; }
```

## Strong

`<strong>` 의미의 중요성을 나타내기 위해 사용.

- 기본적으로 글자가 두껍게 표시 됨.

```css
strong { display: inline; }
```

## Span

`<span>` 본질적으로 아무것도 나타내지 않는 콘텐츠 영역을 설정.

```css

span { display: inline; }
```

## Br

`<br/>` 줄바꿈을 설정

```css

br { display: inline; }
```

## Img

`<img />`

이미지를 삽입.

|속성|의미|값|특징|
|---|---|---|---|
|src|(필수)이미지의 URL| URL
|alt|(필수)이미지의 대체텍스트|
|width|이미지의 가로 너비
|height|이미지의 세로 너비
|srcset|브라우저에게 제시할 이미지의 URL과 크기의 목록을 정의| w, x
|sizes|미디어의 조건과 해당 조건일 떄의 이미지 크기를 정의
|crossorigin|가져오기가 CORS를 사용하여 수행되어야 하는지 여부| anonymous, use-credentials
|ismap|서버 측 이미지 맵으로 지정해 클릭하여 좌표를 쿼리스트링으로 서버에 전송할지 여부| 불린(boolean)| `<img/>` 가 유효한 href 속성을 가진 <a>의 하위 요소인 경우에만 해당
|usemap|클라이언트 측에 이미지 맵으로 지정|`<map>`의 ID 속성 값| `<a>, <button>`의 하위 요소인 경우 사용 불가

## Form

`<form>` 웹서버에 정보를 제출하기 위한 양식 범위를 정의

`<form>` 이 다른 `<form>`를 자식 요소로 포함 할 수 없음 

|속성|의미|값|기본값
|---|---|---|---
|action|전송할 정보를 처리할 웹페이지의 URL|URL
|autocomplete|사용자가 이전에 입력한 값으로 자동 완성 기능을 사용 할 것인지 여부|on, off| on
|method|서버로 전송할 HTTP 메소드| `GET`, `POST` | `GET`
|name|고유한 양식의 이름
|novaildate|서버로 전송시 양식 데이터의 유효성을 검사하지 않도록 설정
|target|서버로 전송 후 응답받을 방식을 지정 | `_self`, `_blank` | `_self`

## Input

`<input/>` 사용자에게 입력 받을 데이터 양식

