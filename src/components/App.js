
// App.js
import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:4000/questions');
        const data = await response.json();
        console.log('Fetched questions:', data);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
  
    fetchQuestions();
  }, [/* dependencies */]);
  
  console.log('Rendered questions:', questions);
  

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} />
    </div>
  );
}

export default App;

