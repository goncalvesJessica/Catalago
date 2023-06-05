import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { getFirestore, getDocs, collection, updateDoc , Doc, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {uuidv4} from 'uuid'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAeGHNQwupMyl599alphPrf2RWgB7Eqq38",
    authDomain: "galeria-5da11.firebaseapp.com",
    projectId: "galeria-5da11",
  
  });

export default function Cadastrar({ navigation }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState('');
    

    const Salvar = async () => {
     
      
        // Crie uma referência ao nó 'produtos' no Realtime Database
        const db = getFirestore(firebaseApp);
        const produtosRef = collection(db, "Produto");

       
      
        // Crie um novo objeto de produto com os dados do formulário
        const novoProduto = {
        id: uuidv4(),
          nome: nome,
          descricao: descricao,
          valor: valor,
          quantidade: quantidade,
          //imagem: imagem,
          
        };
      
        // Salve o novo produto no Firebase
        const novosProduto = await addDoc (produtosRef, novoProduto)
          .then(() => {
            // Limpe os campos do formulário após o envio bem-sucedido
            setNome('');
            setDescricao('');
            setValor('');
            setQuantidade('');
            //setImagem('');
            alert('Produto salvo com sucesso!');
            console.log('aaaaaaaaaaaa')
          })
          .catch((error) => {
            console.error('Erro ao salvar o produto:', error);
            alert('Ocorreu um erro ao salvar o produto. Por favor, tente novamente.');
          });
      };
      
    return (


        <View style={styles.container}>
            <View style={styles.cadastro}>
                <Text style={styles.textoC}>CADASTRO </Text>
            </View>
            <View style={{ top: 200 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    placeholder="PRODUTO"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setDescricao}
                    value={descricao}
                    placeholder="DESCRIÇÃO DO PRODUTO"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setValor}
                    value={valor}
                    placeholder="VALOR"
                    keyboardType="numeric" />
                <TextInput
                    style={styles.input}
                    onChangeText={setQuantidade}
                    value={quantidade}
                    placeholder="QUANTIDADE"
                    keyboardType="numeric" />
                <View>

                </View>
                <TouchableOpacity style={{ top: 20 }}>
                    <Pressable style={styles.botao} onPress={() => navigation.navigate('CameraApp')}>
                        <Text style={styles.texto}>TIRAR FOTO </Text>
                    </Pressable>

                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity style={{ top: 250 }}>
                    <Pressable style={styles.botaos} onPress={Salvar}>
                        <Text style={styles.texto}>SALVAR </Text>
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
    texto: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        marginTop: '25%'
    },
    input: {
        margin: 15,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 9,
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 15,
        backgroundColor: '#7faeff',
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
    botaos: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: '#ff8ab1',
        width: 200,
        left: '25%'
    },
});