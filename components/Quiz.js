import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useScore } from '../context/ScoreContext'
import Background  from "./Background.js"
import styles from '../styles.js'

export default function Quiz({ route }) {
    const { difficulty, category } = route.params;

    const { incrementCorrectAnswers, incrementTotalQuestions } = useScore()

    const [questions, setQuestions] = useState([]);  // Initialisé comme un tableau vide
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [totalQuestionsLoaded, setTotalQuestionsLoaded] = useState(0) // State pour suivre le total des questions chargées
    const [selectedAnswer, setSelectedAnswer] = useState(null) // State pour suivre la réponse sélectionnée
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchQuestion();
    }, []);

    const fetchQuestion = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=20&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&type=multiple`);
            if (!response.ok) {
                throw new Error(`Network response was not ok, status ${response.status}`);
            }
            const json = await response.json();
            if (json.results.length > 0) {
                setQuestions(json.results);
                setCurrentQuestionIndex(0);
            } else {
                setError('No questions found');
            }
        } catch (e) {
            setError(`Failed to fetch the question: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>;
    }

    if (error) {
        return <View style={styles.container}><Text>{error}</Text></View>;
    }

    if (questions.length === 0) {
        return <View style={styles.container}><Text style={styles.question}>No questions loaded</Text></View>;
    }

    const question = questions[currentQuestionIndex]
    const questionNumber =  totalQuestionsLoaded + 1
    return (
        <Background>
            <View style={styles.questionBlock}>
                <Text style={styles.question}>Question {questionNumber}:</Text>
                <Text style={styles.question}>{question.question}</Text>
            </View>
            
            <View style={styles.answerBlock}>
                {question.incorrect_answers.concat(question.correct_answer).sort().map((answer, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[
                            styles.answerButton,
                            selectedAnswer === answer && styles.selectedAnswer // Applique le style sélectionné si la réponse est celle choisie
                        ]}
                        onPress={ () => setSelectedAnswer(answer)}
                    >
                        <Text style={styles.answerText}>{answer}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            {/* Ajoutez un bouton pour valider la réponse */}
            <View style={styles.validationButtonContainer}>
                <TouchableOpacity 
                    style={{...styles.Button, backgroundColor: '#AA8DFF'}}
                    onPress={() => checkAnswer()} disabled={!selectedAnswer}
                >
                    <Text style={styles.buttonText}>Validate Answer</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );

    function checkAnswer() {
        const isCorrect = selectedAnswer === question.correct_answer;
        alert(isCorrect ? 'Correct!' : `Incorrect! You chose: ${selectedAnswer}. The correct answer was: ${question.correct_answer}`);
        if (isCorrect) {
            // On incrémente le score si la réponse est correcte
            incrementCorrectAnswers();
        }

        // Incrémente le nombre total de questions
        incrementTotalQuestions(); 

        // On passe à la question suivante
        const nextQuestionIndex = currentQuestionIndex + 1;

        // Incrementer le nombre de questions chargées
        setTotalQuestionsLoaded(prev => prev + 1)

        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            fetchQuestion(); // Rechargez de nouvelles questions
            console.log('nouvelle vague de questions')
        }
        // On réinitialise la réponse sélectionnée pour la question suivante
        setSelectedAnswer(null);
    }
}