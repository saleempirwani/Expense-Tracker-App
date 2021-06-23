import React, {useState, useContext} from 'react';
import {Context as AuthContext} from '../context/Auth';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Input, Button, Image, Text} from 'react-native-elements';
import Logo from '../assets/logo.png';
import {MarginV} from '../components';
import {primary} from '../theme';

const AuthForm = ({isSignin, navigate}) => {
  const {
    state: {loading, error},
    reset_error,
    signin,
  } = useContext(AuthContext);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // some specification
  let text1, text2, accountText;

  if (isSignin) {
    text1 = 'Sign In';
    text2 = 'Sign Up';
    accountText = "Don't have an account? Signup";
  } else {
    text1 = 'Sign Up';
    text2 = 'Sign In';
    accountText = 'Already have an account? Signin';
  }

  return (
    <View style={styles.container}>
      <Image
        style={{...styles.image, ...styles.center}}
        source={Logo}
        resizeMode="contain"
        PlaceholderContent={<ActivityIndicator />}
      />
      <MarginV margin={15} />

      <Text h2 style={styles.center}>
        {text1}
      </Text>

      <MarginV margin={10} />
      <Input
        keyboardType="email-address"
        onChangeText={setUserEmail}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your email"
        leftIcon={{type: 'font-awesome', name: 'envelope'}}
      />
      <Input
        onChangeText={setUserPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter your password"
        leftIcon={{type: 'font-awesome', name: 'lock'}}
      />

      {error ? (
        <>
          <Text style={styles.error}>{error}</Text>
          <MarginV margin={5} />
        </>
      ) : null}

      <MarginV margin={10} />
      <Button
        onPress={() => signin({userEmail, userPassword}, isSignin)}
        title={text1}
        icon={{
          name: 'login',
          size: 30,
          color: 'white',
        }}
        iconRight
        loading={loading}
        buttonStyle={{backgroundColor: primary}}
      />
      <MarginV margin={10} />
      <Text
        onPress={() => {
          reset_error();
          navigate(text2);
        }}
        style={{color: '#4169e1'}}>
        {accountText}
      </Text>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  center: {
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 80,
  },
  error: {color: 'crimson', alignSelf: 'center'},
});
