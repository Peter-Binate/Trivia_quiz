import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function Quiz({ route, navigation }) {
    const { difficulty, category } = route.params;

    const [questions, setQuestions] = useState([]);  // Initialisé comme un tableau vide
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
        return <View style={styles.container}><Text>No questions loaded</Text></View>;
    }

    const question = questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question.question}</Text>
            {question.incorrect_answers.concat(question.correct_answer).sort().map((answer, index) => (
                <TouchableOpacity key={index} style={styles.answerButton} onPress={() => checkAnswer(answer, answer === question.correct_answer)}>
                    <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    function checkAnswer(selectedAnswer, isCorrect) {
        alert(isCorrect ? 'Correct!' : `Incorrect! You chose: ${selectedAnswer}. The correct answer was: ${question.correct_answer}`);
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            fetchQuestion(); // Rechargez de nouvelles questions
            console.log('nouvelle vague de questions')
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    answerButton: {
        marginVertical: 10,
        backgroundColor: '#dddddd',
        padding: 10
    },
    answerText: {
        fontSize: 18,
        textAlign: 'center'
    }
});
