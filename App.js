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
import styles from './styles.js'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const CustomHeader =() => {
  return null
}

function HomeScreen({ navigation }) {
  return (
    <Home navigation={navigation} />
  )
}

function QuizStack () {
  return (
    <Stack.Navigator screenOptions={{ header: CustomHeader }}>
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
                iconName = 'play-sharp'

                return <Ionicons name={iconName} size={24} color={color} />
            },
            tabBarActiveTintColor: '#4B0082',
            tabBarInactiveTintColor: '#fff',
            tabBarStyle: { 
              backgroundColor: '#FF9051', 
              borderTopColor: 'transparent', 
              height: 60, 
              paddingBottom: 5, 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 1 }, 
              shadowOpacity: 0.2, 
              shadowRadius: 3,
              elevation: 5 
            },
            headerShown: false, 
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="QuizForm" component={QuizStack} />
        </Tab.Navigator>
      </ScoreAndSettingsProvider>
    </NavigationContainer>
  );
}