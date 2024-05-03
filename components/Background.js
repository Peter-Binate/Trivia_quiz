import React from 'react'
import { ScrollView } from 'react-native'
import styles from '../styles.js'
import { LinearGradient } from "expo-linear-gradient";

export default function Background({
    children,
}: {
    children: React.ReactNode
}) {
    return (
         <LinearGradient 
            style={styles.container}
            colors={["#9F7FFF", "#8055FE"]}
            start={{x: 0, y: 1}}
            end={{x: 0.5, y: 1}}

         >
           <ScrollView>{children}</ScrollView>
        </LinearGradient>
    )
}

