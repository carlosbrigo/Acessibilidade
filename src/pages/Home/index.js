import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';
import css from '../../css/css';

export default function Home({ navigation }) {
    return (
        <SafeAreaView styles={css.containerTop}>
            <StatusBar style="light" />
            <TouchableOpacity style={css.buttonGeral} onPress={() => navigation.navigate('AreaRestrita')}>
                <Text style={css.buttonTextGeral}>Administrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={css.buttonGeral} onPress={() => navigation.navigate('Rastreio')}>
                <Text style={css.buttonTextGeral}>Navegar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}