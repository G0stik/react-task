
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, 
        KeyboardAvoidingView, Platform, Keyboard} from 'react-native';
import Task from './Components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [inputColor, setInputColor] = useState('#C0C0C0');

  const handleAddTask = () => {
    if(task){
      Keyboard.dismiss();
      setTaskItems([...taskItems, {text: task, completed: false}]);
      setTask('');
      setInputColor('#C0C0C0');
    }
  }

  const handleDeleteTask = (id) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(id, 1);
    setTaskItems(itemsCopy);
  }

  const handleCompleteTask = (id) => {
    let itemsCopy = [...taskItems];
    itemsCopy[id].completed = !itemsCopy[id].completed;
    setTaskItems(itemsCopy);
  };

  const handleTextChange = (text) => {
    setTask(text);
    setInputColor(text ? '#000' : '#C0C0C0'); 
  };

  const handleEditTask = (id, newText) => {
    let itemsCopy = [...taskItems];
    itemsCopy[id].text = newText;
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>My Tasks</Text>

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}>

          <TextInput 
            style={[styles.input, {color: inputColor}]} 
            placeholder={'Here goes your task'} 
            value={task} 
            onChangeText={handleTextChange} 
          />

          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Add Task</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (<Task 
                        key={index} 
                        id={index} 
                        textField={item.text} 
                        completed={item.completed} 
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
                        onComplete={handleCompleteTask}/>);
              })
            }
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCDCDC'
  },
  sectionTitle:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  tasksWrapper:{
    paddingTop: 50,
    paddingHorizontal: 20
  },
  items:{
    marginBottom: 20
  },
  writeTaskWrapper:{
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  addWrapper:{
    width: 100,
    height: 50,
    backgroundColor: '#66D6FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2
  },
  addText:{
    fontSize: 15,
    color: '#000',
    width: 100,
    textAlign: 'center',
    paddingVertical: 10
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#C0C0C0',
    borderColor: '#000',
    borderWidth: 2,
    flex: 1,
    marginRight: 10,
  }
});

