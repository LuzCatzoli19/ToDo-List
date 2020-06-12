/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import moment from 'moment';

function TodoItem({pressHandler, item}) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <Text style={styles.item}>{item.text}</Text>
    </TouchableOpacity>
  );
}

function AddTodo({submitHandler}) {
  const [text, setText] = React.useState('');

  const changeHandler = (val) => {
    setText(val);
  };

  const pressHandler = () => {
    submitHandler(text);
    setText('');
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="New Activity"
        onChangeText={changeHandler}
        value={text}
      />

      <TouchableOpacity style={styles.button} onPress={pressHandler}>
        <Text style={styles.text}>Add activity</Text>
      </TouchableOpacity>
    </View>
  );
}

function MotivationScreen({route, navigation}) {
  const {quote1} = route.params;
  const {quote2} = route.params;
  const {quote3} = route.params;
  const {quote4} = route.params;
  const {quote5} = route.params;
  return (
    <SafeAreaView style={styles.styleTwo}>
      <View>
        <View style={styles.quoteOne}>
          <Text>{JSON.stringify(quote1)}</Text>
        </View>
        <View style={styles.quoteTwo}>
          <Text>{JSON.stringify(quote4)}</Text>
        </View>
        <View style={styles.quoteThree}>
          <Text>{JSON.stringify(quote3)}</Text>
        </View>
        <View style={styles.quoteFour}>
          <Text>{JSON.stringify(quote5)}</Text>
        </View>
        <View style={styles.quoteFive}>
          <Text>{JSON.stringify(quote2)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({navigation}) {
  const [todos, setTodos] = React.useState([]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key !== key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 0) {
      setTodos((prevTodos) => {
        return [{text, key: Math.random().toString()}, ...prevTodos];
      });
    } else {
      Alert.alert('Ups', 'Empty activity', []);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>To Do List</Text>
        </View>
        <Text style={styles.textDdl}>
          Today: {moment().format('MMMM Do YYYY')}
        </Text>
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Motivation', {
                quote1: 'Easy peasy lemon squeezy',
                quote2: 'Hey warrior, keep going',
                quote3: 'Fight for your fairy tail',
                quote4:
                  'Awesome things will happen today, if you choose not to be a miserable cow',
                quote5: 'You can start over at anytime',
              })
            }>
            <Text>If you need some motivation, click here </Text>
          </TouchableOpacity>

          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={HomeScreen} />
        <Stack.Screen name="Motivation" component={MotivationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginHorizontal: 16,
    //  marginVertical: 50,
    backgroundColor: '#FFD5D0',
  },

  text: {
    color: '#4B343C',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  textDdl: {
    marginVertical: 15,
    marginHorizontal: 15,
    color: '#4B343C',
    fontSize: 20,
    textAlign: 'left',
  },
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: '#F69584',
    color: '#4B343C',
  },
  title: {
    textAlign: 'center',
    color: '#4B343C',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  item: {
    padding: 5,
    marginTop: 10,
    borderColor: '#4B343C',
    borderWidth: 5,
    borderRadius: 20,
    borderStyle: 'dotted',
    color: '#4B343C',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  quoteOne: {
    width: 60,
    height: 120,
    backgroundColor: '#FFD5D0',
  },
  quoteFive: {
    width: 80,
    height: 80,
    backgroundColor: '#F1D3C9',
    color: 'white',
  },
  quoteTwo: {
    width: 150,
    height: 200,
    backgroundColor: '#F69584',
  },
  quoteThree: {
    width: 100,
    height: 120,
    backgroundColor: '#FFD5D0',
  },
  quoteFour: {
    width: 100,
    height: 90,
    backgroundColor: '#F69584',
  },

  styleOne: {
    flexDirection: 'row',
    //flexWrap: 'wrap',
    backgroundColor: '#4B343C',
    flex: 1,
  },
  styleTwo: {
    flexDirection: 'column',
    backgroundColor: '#4B343C',
    flex: 1,
  },
  button: {
    marginTop: 20,
  },
});

export default App;
