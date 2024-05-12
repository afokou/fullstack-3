import { useState } from 'react'

const Button = ({ handleClick, label }) => {
  return <button onClick={handleClick}>{label}</button>
}

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  // calculate total feedback
  const total = good + neutral + bad

  if (total === 0) {
    return <p>No feedback given</p>
  }

  // calculate average score
  const average = (good - bad) / total

  // calculate percentage of positive feedback
  const positivePercentage = (good / total) * 100

  return (
    <table>
      <tbody>
      <StatisticLine label="Good" value={good} />
      <StatisticLine label="Neutral" value={neutral} />
      <StatisticLine label="Bad" value={bad} />
      <StatisticLine label="Total" value={total} />
      <StatisticLine label="Average" value={average} />
      <StatisticLine label="Positive" value={positivePercentage + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} label="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutral" />
      <Button handleClick={() => setBad(bad + 1)} label="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
