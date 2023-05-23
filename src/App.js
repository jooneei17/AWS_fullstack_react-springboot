import './App.css';
import Todo from "./Todo";
import {useEffect, useState} from "react";
import {Container, List, Paper} from "@mui/material";
import AddTodo from "./AddTodo";
import {call} from "./service/ApiService";
import Navigation from "./Navigation";

function App() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([])

    useEffect(() => {
        call("/todo", "GET", null).then((response)=> setItems(response.data));
        setLoading(false);
        }, [])

    const addItem = (item) => {
        call("/todo", "POST", item).then((response)=> setItems(response.data));
    }

    const deleteItem = (item) => {
        call("/todo", "DELETE", item).then((response) => setItems(response.data));
    }

    const editItem = () => {
        setItems([...items]);
    }


    let todoItems =
        items.length > 0 && (
            <Paper style={{margin: 16}}>
                <List>
                    {items.map((item) =>
                        <Todo item={item}
                              key={item.id}
                              editItem={editItem}
                              deleteItem={deleteItem}
                        />)}
                </List>
            </Paper>
        )
  return (
    <div className="App">
        {loading ? (
            <h1>로딩 중 ... </h1>
        ) : (
            <div>
                <Navigation />
                <Container maxWidth="md" >
                    <AddTodo addItem={addItem} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        )}
    </div>
  );
}

export default App;
