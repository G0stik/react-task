
import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput} from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';

type TaskProps = {
    id: number,
    completed: boolean,
    textField: string,
    onDelete: (id: number) => void,
    onEdit: (id: number, newText: string) => void
    onComplete: (id: number) => void
};

const Task = (props: TaskProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(props.textField);

    const handleDelete = () => {
        Alert.alert(
            "Delete Task",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => props.onDelete(props.id) }
            ],
            { cancelable: false }
        );
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        props.onEdit(props.id, newText);
        setIsEditing(false);
    };

    const handleComplete = () => {
        props.onComplete(props.id);
    };

    return(
        <View style={[styles.item, props.completed && styles.itemCompleted]} > 
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square} onPress={handleComplete}> </TouchableOpacity>
                {isEditing ? (
                    <TextInput 
                        style={styles.itemText}
                        value={newText}
                        onChangeText={setNewText}
                    />
                ):(
                    <Text style={[styles.itemText, props.completed && styles.itemTextCompleted]}>
                        Task: {props.textField} {"\n"}
                        State: {props.completed ? "Done" : "Not Done"}
                    </Text>
                )}
            </View >
            <View style={styles.iconContainer}>
                {isEditing ? (
                    <TouchableOpacity onPress={handleSaveEdit}>
                        <Icon name="save" size={24} color="#000" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleEdit} >
                        <Icon name="edit" size={24} color="#000" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleDelete} >
                    <Icon name="delete" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFEA75',
        padding: 15,
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        
    },
    itemCompleted: {
        backgroundColor: '#66FF78',
    },
    itemTextCompleted: {
        color: 'red',
        textDecorationLine: 'line-through'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 2,
        marginRight: 15
    },
    itemText: {
        maxWidth: '75%',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Task;