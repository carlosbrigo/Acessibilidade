import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Locais from './Locais';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import css from '../../css/css';

export default function AreaRestrita({ navigation }) {

    const Tab = createMaterialBottomTabNavigator();

    return (

        <Tab.Navigator
            activeColor='#999'
            inactiveColor='#fff'
            barStyle={css.areaTab}
        >          
            <Tab.Screen
                name="Locais"
                component={Locais}
                options={{
                    tabBarIcon: () => (<Entypo name="users" color='#999' size={20} />)
                }}
            />            
        </Tab.Navigator>
    );
}