import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

const TodoContext = createContext()

export const useTodoContext = () => useContext(TodoContext)

const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([])

    const dispatch = (action) => {
        switch (action.type) {
            case 'SET_TODOS':
                setTodos(action.payload)
                return
            case "ADD_TODO":
                setTodos((pre) => [...pre, action.payload])
                return
            case 'TOGGLE_TODO':
                setTodos((pre) => {
                    let newTodos = pre.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
                    return newTodos
                })
                return
            case 'REMOVE_TODO':
                setTodos((pre) => pre.filter(todo => todo.id !== action.payload))
            default:
                return
        }
    }

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const savedTodos = await AsyncStorage.getItem('TODOS');
                if (savedTodos) {
                    dispatch({ type: 'SET_TODOS', payload: JSON.parse(savedTodos) });
                }
            } catch (error) {
                console.error('Failed to load todos:', error);
            }
        };

        loadTodos();
    }, []);

    useEffect(() => {
        const saveTodos = async () => {
            try {
                await AsyncStorage.setItem('TODOS', JSON.stringify(todos));
            } catch (error) {
                console.error('Failed to save todos:', error);
            }
        };

        saveTodos();
    }, [todos]);

    return (
        <TodoContext.Provider value={{ todos, dispatch }
        }>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider