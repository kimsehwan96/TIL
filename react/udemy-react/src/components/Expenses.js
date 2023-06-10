import ExpenseItem from "./ExpenseItem";
import './Expenses.css';

function Expenses(props) {
  return (
    <div className="expenses">
      {props.expenses.map((ele) => {
        return (
          <ExpenseItem title={ele.title} date={ele.date} amount={ele.amount} />
        );
      })}
    </div>
  );
}

export default Expenses;
