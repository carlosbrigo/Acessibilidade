import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import css from '../../css/css';

export default function Login({ navigation }) {

    return (
        <SafeAreaView style={css.menuSuperior}>
            <StatusBar style="light" />
            <Text>Aqui Login</Text>
            <TouchableOpacity style={css.buttonGeral} onPress={() => navigation.navigate('AreaRestrita')}>
                <Text style={css.buttonTextGeral}>Logar</Text>                    
            </TouchableOpacity>
        </SafeAreaView>
    );
}