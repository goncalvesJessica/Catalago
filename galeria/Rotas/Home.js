import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable, Text } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>

            <View>
            <TouchableOpacity style={{top:300}}>
                <Pressable style={styles.botao} onPress={() => navigation.navigate('Cadastrar')}>
                    <Text style={styles.texto}>CADASTRAR</Text>
                </Pressable>

            </TouchableOpacity>
        </View>
            <View>

            <TouchableOpacity style={{top:400}} >
                <Pressable style={styles.botao} onPress={() => navigation.navigate('configFirebase')}>
                    <Text style={styles.texto}>CATALAGO</Text>
                </Pressable>

            </TouchableOpacity>
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E8A2D9",

    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: 'white',
        width: 200,
        left: '25%'
    },
    texto: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },

});