import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';  // Importation nécessaire pour la navigation
// On importe le score
import { useScore } from '../context/ScoreContext.js'

import style from '../style.js'

export default function Home() {
    const navigation = useNavigation();  // Utilisation du hook useNavigation

    // On récupère le score
    const { score, resetScore } = useScore()

    return (
         <View>
            <Text style={style.title}>Trivia quiz</Text>
            <Text style={style.score}>
                Score: {score.correctAnswers} bonnes réponses / {score.totalQuestions} questions
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('QuizForm')}
            >
                <Text>Start quiz</Text>
            </TouchableOpacity>

            {/* Ajout du bouton pour réinitialiser le score */}
            <TouchableOpacity
                onPress={() => resetScore()}
                style={style.resetButton}
            >
                <Text>Reset Score</Text>
            </TouchableOpacity>
        </View>
    )
}

