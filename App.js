import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./src/Screens/HomeScreen";
import RestaurantScreen from "./src/Screens/RestaurantScreen";
import CartScreen from "./src/Screens/CartScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{
            title: 'Taste the Best',
            headerStyle: {
              backgroundColor: '#FF4B3A',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              color: '#FFFFFF',
              fontFamily: 'Arial',
              letterSpacing: 1,
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen 
          name="RestaurantScreen" 
          component={RestaurantScreen}
          options={{
            title: '',  // This will be set dynamically based on restaurant name
            headerRight: () => null, // This will be overridden by the component
          }}
        />
        <Stack.Screen 
          name="CartScreen" 
          component={CartScreen}
          options={{ title: 'Shopping Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
