import {useEffect, useState} from "react";
import "./App.css";
import Todo from "./Todo";
import { Container, List, Paper } from "@mui/material";
import AddTodo from "./AddTodo";
import {call} from "./service/ApiService";

function App() {
  const [items, setItems] = useState([
    // { id: 1, done: true, title: "제목1" },
    // { id: 2, done: false, title: "제목2" },
  ]);

    useEffect(()=> {
        // const requestOptions = {
        //     method : "GET",
        //     headers: {"Context-Type": "application/json"},
        // }
        // fetch("http://localhost:8080/todo", requestOptions)
        //         .then(response => response.json())
        //         .then(
        //             response => {setItems(response.data)},
        //             error => {
        //
        //             }
        //         )
        call("/todo", "GET", null).then((response) => setItems(response.data));
    }, [items])


    const addItem = (item) => {
    // item.id = "ID-" + item.length;
    // item.done = false;
    // setItems([...items, item]);
    // console.log(items);
        call("/todo", "POST", item).then((response) => setItems(response.data));
  };

    const deleteItem = (item) => {
    // const newItems = items.filter((e) => e.id !== item.id);
    // setItems([...newItems]);
      call("/todo", "DELETE", item).then((response) => setItems(response.data));
    };

    const editItem = (item) => {
        call("/todo", "PUT", item).then((response) => setItems(response.data));
    }

    const editEventHandler = (e) => {
        setItems({...items, title : e.target.value});
        // editItem();
    };



    const checkboxEventHandler = (e) => {
        items.done = e.target.checked;
        // setItem({...item, done : e.target.checked});
        editItem(items);
    }




  let todoItems =
    items.length > 0 &&
    items.map((item) => (
      <Paper style={{ margin: 16 }}>
        <List>
          <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem}/>
        </List>
      </Paper>
    ));
  // let str = [];
  // for (let i = 0; i < items.length; i++) {
  //   str.push(<Todo item={items[i]} />);
  // }
  return (
    <div className="App">
      {/* <Todo
      // number={10}
      // item={item}
      // onEvent={function () {
      //   console.log("message");
      // }}
      /> */}
      {/* <Todo number={20} /> */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem}/>
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
