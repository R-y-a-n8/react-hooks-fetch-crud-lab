import React, { useState } from 'react';

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [selectedValue, setSelectedValue] = useState(correctIndex);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDeleteQuestion(id); // Update state in the parent component
      } else {
        console.error('Failed to delete question:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleCorrectAnswerChange = async (event) => {
    const newCorrectIndex = parseInt(event.target.value, 10);

    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correctIndex: newCorrectIndex,
        }),
      });

      if (response.ok) {
        onUpdateCorrectAnswer(id, newCorrectIndex); // Update state in the parent component
        setSelectedValue(newCorrectIndex); // Update local state
      } else {
        console.error('Failed to update correct answer:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating correct answer:', error);
    }
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedValue} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
