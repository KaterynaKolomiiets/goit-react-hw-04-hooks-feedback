import "./App.css";
import { useState } from "react";
import SectionTitle from "./components/SectionTitle/SectionTitle";

import Statistics from "./components/Statistics";
import Notification from "./components/Notification";
import FeedbackOptions from "./components/FeedbackOptions";

const App = function () {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = ({ target: { name } }) => {
    switch (name) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;
      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;
      case "bad":
        setBad((prevState) => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedback = () => {
    let result = Math.round((good / countTotalFeedback()) * 100);
    return isNaN(result) ? "0%" : `${result}%`;
  };

  return (
    <div className="App container">
      <SectionTitle title={"Please leave feedback"}>
        <FeedbackOptions
          //  options={Object.keys(this.state)}
          options={["good", "neutral", "bad"]}
          onLeaveFeedback={handleClick}
        />
      </SectionTitle>

      {countTotalFeedback() ? (
        <SectionTitle title={"Statistics"}>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            Percentage={countPositiveFeedback()}
          />
        </SectionTitle>
      ) : (
        <Notification message={"No feedback given"} />
      )}
    </div>
  );
};

export default App;
