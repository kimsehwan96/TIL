# React

blah

## Wrapper Component

```jsx
import './Card.css';

function Card(props) {
    const classes = 'card ' + props.className
    return <div className={classes}>{props.children}</div>
}

export default Card;
```

props.children 은 예약된 props 내의 속성(?)이다. 

```jsx
import ExpenseDate from './ExpenseDate';
import Card from './Card'
import './ExpenseItem.css'

function ExpenseItem(props) {
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className="expense-item__description">
                <h2>{props.title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
        </Card>
    );
}

export default ExpenseItem;
```

여기서 Card 컴포넌트로 다른 컴포넌트 및 html 태그를 감쌌는데. Card 컴포넌트의 내부 요소들을 props.children 으로 전달 받을 수 있는 것.