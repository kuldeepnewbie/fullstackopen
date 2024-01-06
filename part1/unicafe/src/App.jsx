import { useState } from "react";

const Button = ({ click, name }) => {
  return (
    <button onClick={click}>{name}</button>
  )
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='All' value={props.total} />
      <StatisticLine text='Average' value={((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / props.total} />
      <StatisticLine text='Percentage' value={(props.good / props.total) * 100} />
      </tbody>
    </table>
      // <p>Good {props.good}</p>
      // <p>Neutral {props.neutral}</p>
      // <p>Bad {props.bad}</p>
      // <p>All {props.total}</p>
      // <p>Average {((props.good * 1) + (props.neutral * 0) + (props.bad * -1)) / props.total}</p>
      // <p>Percentage {(props.good / props.total) * 100}%</p>
  )
}

const App = () => {
  //save click of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const giveFeedback = (type) => {
    const totalSum = total + 1;
    switch (type) {
      case 'Good':
        setGood(good + 1);
        break;
      case 'Neutral':
        setNeutral(neutral + 1);
        break;
      case 'Bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
    setTotal(totalSum);
  }
  return (
    <div>
      <h3>Give Feedback</h3>
      <Button name="Good" click={() => giveFeedback('Good')} />
      <Button name="Neutral" click={() => giveFeedback('Neutral')} />
      <Button name="Bad" click={() => giveFeedback('Bad')} />
      <h3>Statistics</h3>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
  )
}
export default App