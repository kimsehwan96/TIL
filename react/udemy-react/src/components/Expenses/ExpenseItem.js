import { useState } from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card'
import './ExpenseItem.css'

const ExpenseItem = (props) => {

    const [title, setTitle] = useState(props.title); // This should be called in React Component Function !!

    const clickHandler = () => {
        setTitle("Updated!!")
        console.log(title); // 바로 업데이트된 값을 사용 할 수 없는데, 이는 setTitle 함수가 title 값의 변경을 "예약"하기 때문이다.
    }
    return (
        <Card className="expense-item">
            <ExpenseDate date={props.date}/>
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">${props.amount}</div>
            </div>
            <button onClick={clickHandler}>Change title</button>
        </Card>
    );
}

export default ExpenseItem;