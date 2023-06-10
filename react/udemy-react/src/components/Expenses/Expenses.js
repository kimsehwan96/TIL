import ExpenseItem from "./ExpenseItem";
import Card from '../UI/Card'
import './Expenses.css';

const Expenses = (props) => {
  return (
    <Card className="expenses">
      {props.expenses.map((ele) => {
        return (
          <ExpenseItem title={ele.title} date={ele.date} amount={ele.amount} />
        );
      })}
    </Card>
  );
}

export default Expenses;
