import React, {useState, useEffect} from 'react'
import { Picker } from '@react-native-picker/picker';
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native'


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
        <View style={styles.container}>
            <Text style={styles.label}>Select Difficulty:</Text>
            <Picker
                selectedValue={difficulty}
                onValueChange={(itemValue) =>
                    setDifficulty(itemValue)
                }
            >
                <Picker.Item label="Any Difficulty" value="any" />
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
            </Picker>

            <Text style={styles.label}>Select Category:</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Any Category" value="any" />
                {categories.map((categorie) => (
                <Picker.Item key={categorie.id} label={categorie.name} value={categorie.id.toString()} />
                ))}
            </Picker>
            
            {/* Bouton pour démarrer le quiz avec les options sélectionnées */}
            <Button title="Start Quiz" onPress={() => {
                // Sélectionne une catégorie et une difficulté aléatoires par défaut
                chooseRandomcategoryAndDifficulty();
                navigation.navigate('Quiz', { difficulty, category });
                console.log(difficulty, category);
            }} />
        </View>
    )
}

// Styles du composant pour la mise en forme
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center' // Centre les éléments verticalement dans le conteneur
    },
    label: {
      fontSize: 18,
      marginBottom: 10, // Espacement entre le label et le Picker
    }
  });