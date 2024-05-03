import React, { createContext, useState, useContext } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreAndSettingsProvider = ({ children }) => {
    const [score, setScore] = useState({
        totalQuestions: 0,
        correctAnswers: 0
    });

    const [settings, setSettings] = useState({ difficulty: '', category: ''})

    const incrementCorrectAnswers = () => {
        setScore(prevScore => ({...prevScore, correctAnswers: prevScore.correctAnswers + 1 }))
    }

    const incrementTotalQuestions = () => {
        setScore(prevScore => ({...prevScore, totalQuestions: prevScore.totalQuestions + 1 }))
    }

    const resetScore = () => {
        setScore({ correctAnswers: 0, totalQuestions: 0 })
    }
    return (
        <ScoreContext.Provider value={{  score, incrementCorrectAnswers, incrementTotalQuestions, resetScore}}>
            {children}
        </ScoreContext.Provider>
    );
};
