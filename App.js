import 'react-native-gesture-handler';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import themeReducer from './src/stores/themeReducer';

import AppLoading from 'expo-app-loading'; 
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';


import { MainLayout, CourseListing } from './src/screens';

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)}
    },
    close: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)}
    }
  },
  cardStyleInterpolator: ({ current: {progress }} ) => {
    return {
      cardStyle: {
        opacity: progress
      }
    }
  }
}


const store = createStore(
  themeReducer,
  applyMiddleware(thunk)
)

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true,
            headerShown: false
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}
        >
          <Stack.Screen name="Dashboard" component={MainLayout}/>

          <Stack.Screen
            name="CourseListing"
            component={CourseListing}
            options={() => options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
