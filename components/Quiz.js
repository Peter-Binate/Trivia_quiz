import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'

export default function Quiz({ route, navigation }) {
    // Décompression des paramètres passés via la navigation
    const { difficulty, category } = route.params;

    // Déclaration de l'état pour stocker la question actuelle
    const [question, setQuestion] = useState(null);
    // État pour contrôler l'affichage de l'indicateur de chargement
    const [loading, setLoading] = useState(true);
    // État pour stocker un message d'erreur éventuel
    const [error, setError] = useState(null);

    // On charge une question de l'api
    useEffect(() => {
        // Appel de la fonction de fetch des données
        fetchQuestion()
    }, [])

    // Fonction asynchrone pour faire la requête à l'API
    const fetchQuestion = async (retryCount = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${encodeURIComponent(category)}&difficulty=${encodeURIComponent(difficulty)}&type=multiple`);
            if (!response.ok) {
                // S'il y a trop de requête à l'api 
                if (response.status === 429 && retryCount < 5) {
                    // On ajoute un délais entre les tentaives qui augmente exponentiellement
                    setTimeout(() => fetchQuestion(retryCount + 1), 2000 * Math.pow(2, retryCount)); // Attendez 2, 4, 8, etc., secondes avant de réessayer
                    return;
                }
                throw new Error(`Network response was not ok, status ${response.status}`);
            }
            const json = await response.json();
            if (json.results.length > 0) {
                setQuestion(json.results[0]);
            } else {
                setError('No questions found');
            }
        } catch (e) {
            setError(`Failed to fetch the question: ${e.message}`);
        } finally {
            setLoading(false);
        }
    }
    

    // Loading
    if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>;
    }

    // Condition pour afficher un message d'erreur si nécessaire
    if (error) {
        return <View style={styles.container}><Text>{error}</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question.question}</Text>
            {/* Mélange et affichage des réponses incorrectes avec la réponse correcte */}
            {question.incorrect_answers.concat(question.correct_answer).sort().map((answer, index) => (
                <TouchableOpacity key={index} style={styles.answerButton} onPress={() => checkAnswer(answer, answer === question.correct_answer)}>
                <Text style={styles.answerText}>{answer}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )

    function checkAnswer(selectedAnswer, isCorrect){
        // Affiche une alerte indiquant si la réponse est correcte ou non
        alert(
            isCorrect 
                ? 'Correct!' 
                : `Incorrect! You chose: ${selectedAnswer}. The correct answer was: ${question.correct_answer}`
        )
        // Récupère une nouvelle question
        fetchQuestion();
    }
}

// Styles utilisés dans le composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // Centre les éléments verticalement dans le conteneur
    alignItems: 'center', // Centre les éléments horizontalement
  },
  question: {
    fontSize: 20,
    marginBottom: 20, // Espacement après la question
    textAlign: 'center' // Centre le texte de la question
  },
  answerButton: {
    marginVertical: 10, // Espacement vertical entre les boutons de réponse
    backgroundColor: '#dddddd', // Couleur de fond des boutons de réponse
    padding: 10 // Padding interne des boutons de réponse
  },
  answerText: {
    fontSize: 18, // Taille de la police pour les réponses
    textAlign: 'center' // Centre le texte dans le bouton
  }
});