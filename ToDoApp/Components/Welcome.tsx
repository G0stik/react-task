import { Text, View } from "react-native"

type Props = {
    id: number,
    name: string,
    state: boolean
}

export default function Header(props: Props){
    return (<View>
    <Text>My To Do</Text>
    <Text>prvy task ID: {props.id}</Text>
    <Text>Popis: {props.name}</Text> 
    <Text>Stav: {props.state ? "Completed" : "Not done"}</Text>
    </View>
    )
}
