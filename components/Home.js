import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';  // Importation nécessaire pour la navigation
// On importe le score
import { useScore } from '../context/ScoreContext.js'
import trivia_logo from "../assets/images/trivia_logo.png";
import styles from '../styles.js'
import Background  from "./Background.js"


export default function Home() {
    const navigation = useNavigation();  // Utilisation du hook useNavigation

    // On récupère le score
    const { score, resetScore } = useScore()

    return (
         <Background>
            {/* <Text style={styles.title}>Trivia quiz</Text> */}
            <View style={styles.logoContainer}>
                <Image
                    source={trivia_logo}
                    style={styles.logo}
                />
            </View>
            

            <Text style={styles.score}>
                Score:
            </Text>
            <Text style={styles.score}>
                {score.correctAnswers} bonnes réponses / {score.totalQuestions} questions
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('QuizForm')}
                style={{...styles.Button, backgroundColor: '#FF9051'}}
            >
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>

            {/* Ajout du bouton pour réinitialiser le score */}
            <TouchableOpacity
                onPress={() => resetScore()}
                style={{...styles.Button, backgroundColor: '#AA8DFF'}}
            >
                <Text style={styles.buttonText}>Reset Score</Text>
            </TouchableOpacity>
        </Background>
    )
}

