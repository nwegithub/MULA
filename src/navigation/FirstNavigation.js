import React from 'react';
import Onboarding from "../screen/DigitalTraditational/Onboarding";
import VisitGallary from "../screen/DigitalTraditational/VisitGallary";
import Switch from '../screen/Switch';
import StartUp from '../screen/StartUp';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const FirstNavigation = () => {
    return(
        <Stack.Navigator
        screenOptions={{headerShown:false}}
        >
            <Stack.Screen name="Switch" component={Switch} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="VisitGallary" component={VisitGallary} />
            <Stack.Screen name="Start Up" component={StartUp} />

        
        </Stack.Navigator>
    )
}
export default FirstNavigation