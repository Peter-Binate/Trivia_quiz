import { StyleSheet } from "react-native"

export default StyleSheet.create({
  color: '#fff',
  text: {
    fontFamily: 'Poppins-ExtraBold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  componentBlock: {
    paddingTop: 250
  },
  home: {
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#FF9051',
    padding: 20,
  },
  logoContainer: {
    width: '100%',
  },
  logo: {
    width: '70%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginHorizontal: '15%',
    marginTop: 80,
    marginBottom: 100,
  },
  bottomNavbar: {
    backgroundColor: '#FF9051'
  },
  title: {
    marginBottom: 50,  
    fontSize: 65,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  score: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },    
  Button: {
    padding: 24,
    marginTop: 20,
    borderRadius: 5,
  }, 
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  quizFormLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10, // Espacement entre le label et le Picker
  },
  quizFormPicker: {
    backgroundColor: '#8055FE',
    color: '#fff',
  },
  questionBlock: {
    marginTop: 100,
  },
    question: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    answerBlock: {
        marginTop: 20
    },
    answerButton: {
        marginVertical: 10,
        padding: 20,
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#fff' 
    },
    selectedAnswer: {
        borderWidth: 2, 
        borderRadius: 10, 
        backgroundColor: '#FF9051'
    },
    answerText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    }
})