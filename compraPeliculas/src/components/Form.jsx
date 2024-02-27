"use client"
import React, { useState, useEffect } from "react";
import styles from "../app/page.module.css";

const Form = () => {
    const [todo, setTodo] = useState({
        productName: "",
        brand: "",
        quantity: "",
        price: ""
    });

    const [todos, setTodos] = useState([
        { productName: "Titanic", brand: "Paramount Pictures", quantity: 1, price: 15 },
        { productName: "Avatar", brand: "20th Century Studios", quantity: 2, price: 25 },
        { productName: "El Padrino", brand: "Paramount Pictures", quantity: 1, price: 20 },
        { productName: "Pulp Fiction", brand: "Miramax Films", quantity: 1, price: 18 },
        { productName: "Forrest Gump", brand: "Paramount Pictures", quantity: 2, price: 22 },
        { productName: "The Shawshank Redemption", brand: "Columbia Pictures", quantity: 1, price: 17 },
        { productName: "The Dark Knight", brand: "Warner Bros. Pictures", quantity: 3, price: 30 },
        { productName: "Inception", brand: "Warner Bros. Pictures", quantity: 1, price: 20 },
        { productName: "The Godfather: Part II", brand: "Paramount Pictures", quantity: 2, price: 25 },
        { productName: "Schindler's List", brand: "Universal Pictures", quantity: 1, price: 18 }
    ]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const calculateTotal = () => {
            let totalPrice = 0;
            todos.forEach(todo => {
                totalPrice += todo.quantity * parseFloat(todo.price);
            });
            setTotal(totalPrice);
        };

        calculateTotal();
    }, [todos]);

    const handleChange = e => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        });
    };

    const handleQuantityChange = (index, quantity) => {
        const newTodos = [...todos];
        newTodos[index].quantity = quantity;
        setTodos(newTodos);
    };

    const handleClick = e => {
        e.preventDefault();
        if (Object.values(todo).some(value => value.trim() === "")) {
            alert("Todos los campos son obligatorios");
            return;
        }
        setTodos([...todos, todo]);
        setTodo({
            productName: "",
            brand: "",
            quantity: "",
            price: ""
        });
    };

    const deleteTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={e => e.preventDefault()}>
                <label>Nombre del producto</label><br />
                <input className={styles.form_input} type="text" name="productName" value={todo.productName} onChange={handleChange} /><br />
                <button onClick={handleClick}>Agregar</button>
            </form>
            <h2>Lista de Productos:</h2>
            <ul className={styles.todo_list}>
                {todos.map((item, index) => (
                    <li key={index} className={styles.todo_item}>
                        <div><strong>Nombre:</strong> {item.productName}</div>
                        <div><strong>Marca:</strong> {item.brand}</div>
                        <div>
                            <strong>Cantidad:</strong>{" "}
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                            />
                        </div>
                        <div><strong>Precio:</strong> {item.price}</div>
                        <button onClick={() => deleteTodo(index)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Total a pagar: ${total.toFixed(2)}</h2>
            </div>
        </div>
    );
};

export default Form;
