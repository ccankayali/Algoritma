import React, { useEffect, useState } from 'react';
import { WordService } from '../service/WordService';
import { Link } from 'react-router-dom';

function Test() {
  const [words, setWords] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);

  useEffect(() => {
    async function fetchWords() {
      try {
        const data = await WordService.test(questionCount);
        setWords(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchWords();
  }, [questionCount]);

  const handleNextQuestion = async () => {
    const correctAnswer = (words[currentQuestionIndex] as { turkish: string }).turkish;
  
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      try {
        await WordService.checkAndIncreaseCorrectAnswers((words[currentQuestionIndex] as { _id: string })._id, userAnswer);
      } catch (error) {
        console.error('Error checking answer:', error);
      }
      setScore(score + 1);
    }

    if (currentQuestionIndex === words.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
    }
  };
  
  

  const handleChangeAnswer = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setUserAnswer(e.target.value);
  };

  const handleChangeQuestionCount = (e: { target: { value: string; }; }) => {
    setQuestionCount(parseInt(e.target.value));
  };


  if (words.length === 0) {
    return <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  if (showResult) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Test Sonucu</h2>
        <p>Toplam Soru Sayısı: {words.length}</p>
        <p>Doğru Sayısı: {score}</p>
        <p>Yanlış Sayısı: {words.length - score}</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'black', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Test</h2>
      <label>
        Soru Sayısı:
        <input type="number" value={questionCount} onChange={handleChangeQuestionCount} style={{ marginLeft: '10px' }} />
      </label>
      <p style={{ marginTop: '20px' }}>Soru {currentQuestionIndex + 1} / {words.length}</p>
      <img src={(words[currentQuestionIndex] as {image: string}).image} alt="Word" style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop: '20px' }} />
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{`${(words[currentQuestionIndex] as { english: string }).english}`}</p>
      <input type="text" value={userAnswer} onChange={handleChangeAnswer} style={{ marginTop: '20px', marginBottom: '20px' }} />
      <button onClick={handleNextQuestion} className="btn btn-primary">Sonraki Soru</button>
      <Link to="/Main" className='btn btn-primary' style={{ color: 'white', marginTop: '20px', textDecoration: 'none' }}>Anasayfa</Link>
    </div>
  );  
}

export default Test;
