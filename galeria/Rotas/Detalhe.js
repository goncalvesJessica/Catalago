
import { View, StyleSheet, TouchableOpacity, Pressable, Text } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { getFirestore, getDocs, collection, updateDoc , Doc, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAeGHNQwupMyl599alphPrf2RWgB7Eqq38",
    authDomain: "galeria-5da11.firebaseapp.com",
    projectId: "galeria-5da11",
  
  });

export default function Detalhe({ navigation }) {

    const [nome, setNome] = useState("");
    const [id, seId]= useState("");
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState('');


    const Editar = async () => {

        // Crie uma referência ao nó 'produtos' no Realtime Database
        const db = getFirestore(firebaseApp);
        const produtosRef = collection(db, "Produto");

    }

    return (
        <View style={styles.container}>
            <View style={styles.cadastro}>
                <Text style={styles.textoC}>Detalhe </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                />
                <View>
                    <TextInput
                        style={styles.inputS}

                    />
                </View>

                <View>
                    <TextInput
                        style={styles.inputD}
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.inputV}
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.inputQ}
                    />
                </View>
                <TouchableOpacity style={styles.botaos}>
                    <Text>Editar</Text>
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
    cadastro: {
        fontSize: 30,
        color: 'white',
        left: 185,

    },
    textoC: {
        fontSize: 22,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        right: 35,
        top: 95,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 9,
        top: 150,
        right: 170,
        width: 380,
    },
    inputD: {
        borderWidth: 1,
        padding: 70,
        borderRadius: 9,
        top: 200,
        right: 170,
        width: 380,
    },
    inputS: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 9,
        top: 180,
        right: 170,
        width: 380,
    },
    inputV: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 9,
        top: 210,
        right: 170,
        width: 380,
    },
    inputQ: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 9,
        top: 220,
        right: 170,
        width: 380,
    },
    botaos: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: '#ff8ab1',
        width: 200,
        marginTop: 250,
        right: 60,
    },
})