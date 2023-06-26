import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import css from '../../../css/css';
import { Entypo, Feather, FontAwesome}  from '@expo/vector-icons';

export default function MenuAreaRestrita(props)
{
    return (
        <View style={css.areaMenu}>
            <TouchableOpacity style={css.buttonLeft} onPress={()=>props.navigate('home')}>
                <FontAwesome name="home" color='#999' size={30} />
            </TouchableOpacity> 
            <Text style ={css.areaTitle}>{props.title}</Text>
            <TouchableOpacity style={css.buttonRight} onPress={()=>logout()}>
                <FontAwesome name="sign-out" color='#999' size={30} />
            </TouchableOpacity>                      
        </View>
    );
}