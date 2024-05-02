import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import style from '../style.js'

export default class Home extends React.Component  {
    render() {
        return (
            <View>
                <Text style={style.title}>Trivia quiz</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('QuizForm')}
                >
                    <Text>Start quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}