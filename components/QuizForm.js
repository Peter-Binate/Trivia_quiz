import React, {useState, useEffect} from 'react'
import { Picker } from '@react-native-picker/picker';
import {View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'

import styles from '../styles.js'
import Background from './Background.js'

export default function QuizForm({ navigation }) {
    const [difficulty, setDifficulty] = useState('')
    // État pour stocker la catégorie actuellement sélectionnée
    const [category, setCategory] = useState('')
    // État pour stocker la liste des catégories récupérées de l'API
    const [categories, setCategories] = useState([])
    // État pour stocker le statut de chargement
    const [loading, setLoading] = useState(true)

    // On charge les catégories au chargement de la page
    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => {
                // On récupère les categories de l'api
                setCategories(data.trivia_categories)
                 // On définit la catégorie initiale pour éviter une valeur non définie
                // setCategory(data.trivia_categories[0].id.toString());
                // On arrête l'indicateur de chargement une fois les données chargées
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching categories:', error)
                setLoading(false)
            })
    }, [])

    // On choisit une catégorie et une difficulté aléatoires
    const chooseRandomcategoryAndDifficulty = () => {
        if (!difficulty) {
            const difficulties = ['any', 'easy', 'medium', 'hard']
            setDifficulty(difficulties[Math.floor(Math.random() * difficulties.length)])
        }

        if (!category) {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            setCategory(randomCategory.id.toString());
        }
    }

    // Afficher un indicateur de chargement pendant que les données sont en cours de récupération
    if (loading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>;
    }

    return(
        <Background style={styles.container}>
            <Text style={styles.quizFormLabel}>Select Difficulty:</Text>
            <Picker
                selectedValue={difficulty}
                onValueChange={(itemValue) =>
                    setDifficulty(itemValue)
                }
                style={styles.quizFormPicker}
            >
                <Picker.Item style={styles.quizFormPicker} label="Any Difficulty" value="any" />
                <Picker.Item style={styles.quizFormPicker} label="Easy" value="easy" />
                <Picker.Item style={styles.quizFormPicker} label="Medium" value="medium" />
                <Picker.Item style={styles.quizFormPicker} label="Hard" value="hard" />
            </Picker>

            <Text style={styles.quizFormLabel}>Select Category:</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.quizFormPicker}
            >
                <Picker.Item style={styles.quizFormPicker} label="Any Category" value="any" />
                {categories.map((categorie) => (
                <Picker.Item style={styles.quizFormPicker} key={categorie.id} label={categorie.name} value={categorie.id.toString()} />
                ))}
            </Picker>
            
            {/* Bouton pour démarrer le quiz avec les options sélectionnées */}
            <TouchableOpacity 
                style={{...styles.Button, backgroundColor: '#FF9051'}}
                onPress={() => {
                    // Sélectionne une catégorie et une difficulté aléatoires par défaut
                    chooseRandomcategoryAndDifficulty();
                    navigation.navigate('Quiz', { difficulty, category });
                    console.log(difficulty, category);
                }}
            >
                <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
        </Background>
    )
}