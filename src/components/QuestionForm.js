import React, { useState } from 'react';


function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctIndex: 0,
  });

  // Use handleChange in the JSX to handle input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
          correctIndex: parseInt(formData.correctIndex, 10),
        }),
      });

      if (response.ok) {
        const newQuestion = await response.json();
        onAddQuestion(newQuestion);
        setFormData({
          prompt: '',
          answer1: '',
          answer2: '',
          answer3: '',
          answer4: '',
          correctIndex: 0,
        });
      } else {
        console.error('Failed to add question:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange} // Use handleChange for input change
          />
        </label>
        {/* ... (other input fields) */}
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
