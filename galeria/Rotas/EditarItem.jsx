import React, { useState } from 'react'
import {
    View, Text, StyleSheet, TextInput,
    Pressable, Alert, TouchableOpacity
} from 'react-native'

import themes from '../themes/index'
import { collection } from "firebase/firestore";
import { Ionicons, EvilIcons, Entypo } from "@expo/vector-icons";
import { doc, updateDoc, deleteDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from "firebase/app";


import { useNavigation } from '@react-navigation/native'
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAeGHNQwupMyl599alphPrf2RWgB7Eqq38",
    authDomain: "galeria-5da11.firebaseapp.com",
    projectId: "galeria-5da11",

});

export default function EditarItem({ route }) {

    const navigation = useNavigation()
    const [isOpen, setIsOpen] = useState(false)
    const [editarItem, setEditarItem] =
        useState(route.params)

    const validarItem = async () => {

        //Efetuando as validações dos formulários
        if (editarItem.nome === '') {
            Alert.alert('Atenção',
                'O campo nome  é obrigatório')

            return

        }
        if (editarItem.descricao === '') {
            Alert.alert('Atenção',
                'O campo descrição é obrigatório')

            return
        }
        if (parseFloat(editarItem.valor) <= 0) {
            Alert.alert('Atenção',
                'O valor do item deve ser informado')

            return
        }
        if (parseFloat(editarItem.quantidade) <= 0) {
            Alert.alert('Atenção',
                'A quantidade em estoque é inválida')

            return
        }
        //Lógica para alterar no Firebase
        const db = getFirestore(firebaseApp);

        
        const docR = doc(db, 'Produto', editarItem.id)
       

        updateDoc(docR, {

            nome: editarItem.nome,
            descricao: editarItem.descricao,
            valor: editarItem.valor,
            quantidade: editarItem.quantidade,


        }).then(() => {

            alert('Produto alterado com sucesso!');

        })
            .catch((error) => {
                console.error('Erro ao salvar o produto:', error);
                alert('Ocorreu um erro ao salvar o produto. Por favor, tente novamente.');
            });
        navigation.navigate('Home')
            

    }

    const onDelete = () => {
        
        if (Platform.OS !== 'web') {
            Alert.alert('Confirma a exclusão?',
                'Tem certeza que deseja excluir ?',
                [
                    { text: 'Não', style: 'cancel' },
                    {
                        text: 'Sim', onPress: () => { navigation.navigate('Home')
                            const db = getFirestore(firebaseApp);
                            const docR = doc(db, 'Produto', editarItem.id)
                            deleteDoc(docR)
                        }
                    }
                ]
            )
        } else {
            let confirma = confirm('Confirma a exclusão?')
            if (confirma) {
                const db = getFirestore(firebaseApp);
                const docR = doc(db, 'Produto', editarItem.id)
                deleteDoc(docR)
            }
        }

    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Editar Produtos
            </Text>

            <TextInput
                style={styles.input}
                placeholder='Nome do Item'
                maxLength={50}
                value={editarItem.nome}
                keyboardType='default'
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, nome: text })}
            />
            <TextInput
                style={styles.input}
                placeholder='Descrição'
                maxLength={50}
                value={editarItem.descricao}
                keyboardType='default'
                autoCapitalize={'characters'}
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, descricao: text })}
            />

            <TextInput
                style={styles.input}
                placeholder='Valor'
                keyboardType='numeric'
                maxLength={4}
                value={editarItem.valor}
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, valor: text })}
            />
            <TextInput
                style={styles.input}
                placeholder='Quantidade'
                keyboardType='numeric'
                value={editarItem.quantidade}
                onChangeText={(text) => setEditarItem(
                    { ...editarItem, quantidade: text })}
            />
            <View>
                <TouchableOpacity
                 onPress={validarItem} style={styles.botao}>
                   
                    <Text styles={styles.textoBotao} >Alterar</Text>
                    
                </TouchableOpacity>
                <Ionicons name="create-outline" style={styles.icone} size={20}  />


            </View>
            <Pressable onPress={onDelete} style={styles.botaoExcluir}>
                <Text styles={styles.textoBotao}>Excluir</Text>
            </Pressable>
            <Ionicons name="trash-outline" style={styles.iconeL} size={20}  />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8A2D9',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        marginTop: 75
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        borderColor: '#DDD',
    },
    input: {
        width: '90%',
        padding: 8,
        marginVertical: 4,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    botao: {
        backgroundColor: themes.colors.utility.info,
        borderRadius: 4,
        padding: 20,
        marginTop: 10,
        right: 60,
        
        
    },
    botaoExcluir: {
        backgroundColor: "#eb3446",
        borderRadius: 4,
        padding: 20,
        marginTop: -80,
        left: 60,
    },
    textoBotao: {
        backgroundColor: themes.colors.utility.info,
        fontWeight: 'bold',
       left:5,


    },
    icone:{
        color:"#000000",
        left:5,
        top:-40
    },
    iconeL:{
        color:"#000000",
        left:90,
        top:-40
    }
})