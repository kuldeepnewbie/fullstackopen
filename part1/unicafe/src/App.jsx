import { useState } from "react";

const Button = ({ click, name }) => {
  return (
    <button onClick={click}>{name}</button>
  )
};

const App = () => {
  //save click of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total,setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const giveFeedback = (type) => {
    let feedbackValue = 0;
    switch (type) {
      case 'Good':
        feedbackValue = feedbackValue + 1;
        setGood(good + 1);
        break;
      case 'Neutral':
        feedbackValue = feedbackValue + 0;
        setNeutral(neutral + 1);
        break;
      case 'Bad':
        feedbackValue = feedbackValue - 1;
        setBad(bad + 1);
        break;
      default:
        break;
    }
    setTotal(total + feedbackValue);
    setAverage(total + feedbackValue / (good + neutral + bad + 1));
  }
  return (
    <div>
      <h4>Give Feedback</h4>
      <Button name="Good" click={() => giveFeedback('Good')} />
      <Button name="Neutral" click={() => giveFeedback('Neutral')} />
      <Button name="Bad" click={() => giveFeedback('Bad')} />
      <h4>Statistics</h4>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {total}</p>
      <p>Feedback {average}</p>
    </div>
  )
}
export default App