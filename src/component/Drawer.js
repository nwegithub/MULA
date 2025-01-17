import { createDrawerNavigator } from '@react-navigation/drawer';
import Artist from '../screen/DigitalTraditational/Artist/Artist';

import DrawerComponent from './DrawerComponent';
import ComingSoon from '../screen/ComingSoon';
import BottomTab from '../navigation/BottomTabNavigation'
import { colors } from '../constant/theme';
import Home from '../screen/DigitalTraditational/Home';
import AboutUs from '../screen/DigitalTraditational/AboutUs';


const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator
    drawerContent={(props) => <DrawerComponent {...props} />}
    screenOptions={{
      headerShown:false,
      swipeEnabled:false,
     
    }}
    >
      <Drawer.Screen name="BottomTab" component={BottomTab} />
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="About Us" component={AboutUs}/>
    </Drawer.Navigator>
  );
}
export default DrawerScreen 