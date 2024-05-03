import { View } from 'react-native';

// on importe les composant pour la Navigation
import { NavigationContainer } from '@react-navigation/native'

/// on importe le composant pour la bottom-navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// on importe les composants
import Home from './components/Home.js'
import QuizForm from './components/QuizForm.js'
import Quiz from './components/Quiz.js'
import { ScoreAndSettingsProvider } from './context/ScoreContext.js'
import style from './style.js'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function HomeScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Home navigation={navigation} />
    </View>
  )
}

function QuizStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="QuizFormStack" component={QuizForm} />
      <Stack.Screen name="Quiz" component={Quiz} />

    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <ScoreAndSettingsProvider>
        <Tab.Navigator
          // On choisit la color et le type d'icon lorsque l'icon est active
          screenOptions={({ route }) => ({
            tabBarIcon:({focused, color, size}) => {
              let iconName = "skull"

              if(route.name === 'Home')
                iconName = 'home'
              else if(route.name === 'QuizForm')
                iconName = 'settings'

                return <Ionicons name={iconName} size={24} color={color} />
            },
            tabBarActiveTintColor: '#ba0d7b',
            tabBarInactiveTintColor: '#333333'
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="QuizForm" component={QuizStack} />
        </Tab.Navigator>
      </ScoreAndSettingsProvider>
    </NavigationContainer>
  );
}