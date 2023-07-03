import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import css from '../../../css/css';
import { Entypo, Feather, FontAwesome}  from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MenuAreaRestrita(props)
{
    const navigation = useNavigation();

    const navegar = () => {      
        navigation.navigate('Navegar');
    };

    return (
        <View style={css.areaMenu}>
            <TouchableOpacity style={css.buttonLeft} onPress={navegar}>
                <Entypo name="location" color='#999' size={30} />
            </TouchableOpacity> 
            <Text style ={css.areaTitle}>{props.title}</Text>
                               
        </View>
    );
}