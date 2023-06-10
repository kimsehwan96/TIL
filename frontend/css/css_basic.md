# CSS

```css
div {
    font-size: 20px;
    color: red;
}
```

`div` 는 선택자
`font-size` , `color` 는 속성 (properties)
`20px` , `red` 는 값

## 선택자

선택자는 HTML의 특정한 요소를 선택하는 사인입니다. 

### 태그로 찾기

```css
h1 {
    color: red;
}

p {
    color: blue;
}
```

선택자 부분에 태그의 이름을 입력

### 클래스로 찾기

좀 더 명확하게 요소를 찾기 위해 클래스 선택자 존재

```css
.title {
    color: red;
}

.main-texst {
    color: blue;
}
```

`.class-name` 은 `class-name` 이라는 클래스를 선택하는 것

```html
<h1 class="title"> 제목 1  </h1>
<p class="main-text"> 본문 1 </p>
```

위와 같은 html 에서의 class 속성을 갖는 태그를 찾아서 반영하게 된다

## 속성

크기, 여백, 색상 같은 눈에 보이는 스타일을 지정할 수 있습니다.

### 크기

#### width (가로 너비)

요소의 가로 너비를 지정함 단위로는 px(pixels)를 사용함

```css
div {
    width: 300px;
}
```

#### height (세로 너비)

요소의 세로 너비를 지정함

```css
div {
    height: 100px;
}
```

#### font-size (글자 크기)

요소 내용(text)의 글자 크기를 지정합니다.

```css
div {
    font-size: 16px;
}
```

### 여백

#### margin (요소의 바깥 여백)

요소의 바깥 여백을 지정합니다.
바깥 여백은 요소와 요소 사이의 여백(거리, 공간)을 생성 할 떄 사용합니다.

```css
div {
    margin: 20px;
}
```

위 css 는 요소의 위, 아래, 좌, 우 모두 20px 의 여백을 지정하겠다는 의미이다. 세분화 하기 위해 한 방향씩 지정 할 수도 있다.

```css
div {
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
}
```

#### padding (요소의 내부 여백)

요소의 내부 여백을 지정합니다. 내부 여백은 자식 요소를 감싸는 여백을 의미합니다.

```css
div {
    padding: 20px;
}
```

margin 과 같이 한 방향씩 지정 할 수 있습니다.

```css
div {
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
}
```

## 색상

### color (글자 색상)

요소 내용의 글자 색상을 지정합니다.

```css
div {
    color: red;
}
```

### background (요소 색상)

요소의 배경 색상을 지정합니다.

```css
div {
    background-color: red;
    /* background <- 단축속성 */
}
```

## 복합선택자

### 일치 선택자

```css

span.orange {
    color: red;
}
```

```html
<span class="orange"> orange </span>
```

### 자식 선택자

```css

ul > .orange {
    color: red;
}
```

```html
<ul>
    <li> hi </li>
    <li class="orange"> orange </li> <!-- 선택 -->
</ul>
```

ul 의 자식이면서 orange 클래스를 선택

### 후손 선택자

```css

div .orange {
    color: red;
}
```

```html

<div>
    <ul>
        <li class="orange"> orange </li>  <!-- 선택 -->
    </ul>
    <span class="orange"> orange </span>  <!-- 선택 -->
</div>
```

### 인접 형제 선택자

```css
.orange + li {
    color: red;
}
```

```html
 </ul>
    <li></li>
    <li class="orange"></li>
    <li></li>  <!-- 선택 -->
</ul>
```

### 일반 형제 선택자

```css
.orange ~ li {
    color: red;
}
```

```html
 </ul>
    <li></li>
    <li class="orange"></li>
    <li></li>  <!-- 선택 -->
    <li></li>  <!-- 선택 -->
    <li></li>  <!-- 선택 -->
</ul>
```

## 가상 클래스 선택자  (Pseudo classes selector)

### Hover 

`E:hover`

E 에 마우스 포인터가 올라가 있는 동안에만 선택 

```css
a:hover {
  font-weight: bold;
  font-size: 20px;
}
```

위 예제는 a 태그를 사용하는 요소에 마우스를 올리는 경우 반영이 됨

### Active

`E:active`

E 요소를 마우스로 클릭하는 동안에만 E를 선택

```css
.box:active {
  width: 200px;
  background: yellowgreen;
}
```

### Focus

`E:focus`

E 요소가 포커스 된 동안에만 E 선택

대화형 콘텐츠에서 사용 가능

```html
<input type="text">
```

```css
input {
  width: 100px;
  outline: none;
  boder: 1px solid lightgrey;
  padding: 5px 10px;
  transition: 0.4s;
}

input:focus{
  border-color: red;
  width: 200px;
}
```

위와 같이 하면 input 태그 요소 안에서 무언가 작업 할 때를 focus 상태로 인식하기 떄문에, 테두리 선이 빨간색으로 변하면서 너비도 변화한다.


## First Child

`E:first-child`

E 가 형제 요소 중 첫번째 요소라면 선택

```css
.fruits li:first-child {
    color: red;
}
```

```html
<ul class="fruits">
    <li>a</li> <!-- 선택 -->
    <li>b</li>
    <li>c</li>
    <li>d</li>
</ul>
```

## Last Child

`E:last-child`

E 가 형제 요소 중 마지막 요소라면 선택

```css
.fruits li:last-child {
    color: red;
}
```

```html
<ul class="fruits">
    <li>a</li> 
    <li>b</li>
    <li>c</li>
    <li>d</li> <!-- 선택 -->
</ul>
```

## Nth Child

`E:nth-child(n)`

E 가 형제 요소 중 n 번째 요소라면 선택

## Nth of Type

`E:nth-of-type(n)`

E 의 타입(태그이름)과 동일한 타입인 형제 요소 중 E 가 n번째 요소라면 선택

```html
<div class="fruits">
  <div>딸기</div>
  <p>사과</p>
  <p>망고</p>
  <span>오렌지</span>
</div>
```

```css
.fruits {
  font-size: 20px;
}

.fruits p:nth-of-type(1) {
  color: red;
}
```