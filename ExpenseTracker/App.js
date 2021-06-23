import './src/config/firebase';
import React, {useContext, useEffect} from 'react';
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from './src/context/Auth';

import {Provider as ExpenseProvider} from './src/context/Expense';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SigninScreen,
  SignupScreen,
  HomeScreen,
  HistoryScreen,
  LoadingScreen,
  SignoutScreen,
} from './src/screens';
import {Icon} from 'react-native-elements';
import {primary} from './src/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  const options = {headerShown: false};
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SigninScreen} options={options} />
      <Stack.Screen name="Sign Up" component={SignupScreen} options={options} />
    </Stack.Navigator>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'History') {
            iconName = 'history';
          } else if (route.name === 'Account') {
            iconName = 'user-circle';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              type="font-awesome-5"
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: primary,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Account" component={SignoutScreen} />
    </Tab.Navigator>
  );
};

const ExpenseTrackerApp = () => {
  const {
    state: {token, isLoading},
    tryLocalSignin,
  } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return (
    <NavigationContainer>
      {/* <TabStack /> */}
      {isLoading ? <LoadingScreen /> : token ? <TabStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Main Component

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <ExpenseTrackerApp />
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
