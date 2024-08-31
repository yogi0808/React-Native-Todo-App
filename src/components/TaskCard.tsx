import React from "react"
import { Text, Pressable, Alert, StyleSheet, ToastAndroid } from "react-native"

// Files
import Checkbox from "expo-checkbox"
import { useTodoContext } from "@/context/GlobalContext"

interface TaskProp {
  todo: {
    id: string
    title: string
    completed: boolean
  }
}

const TaskCard = ({ todo }: TaskProp) => {
  const { dispatch } = useTodoContext()

  const AsyncAlert = () => {
    return new Promise((resolve, reject) => {
      Alert.alert("Alert", "Are you sure you want to delete this task.", [
        {
          text: "Cancel",
          onPress: () => reject("Delete Canceled."),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch({ type: "REMOVE_TODO", payload: todo.id })
            return resolve("yes")
          },
        },
      ])
    })
  }
  return (
    <Pressable
      style={styles.container}
      onLongPress={() => {
        AsyncAlert()
          .then(() => {
            ToastAndroid.show("Task Deleted Successfully.", ToastAndroid.SHORT)
          })
          .catch(() => {})
      }}
    >
      <Checkbox
        value={todo.completed}
        color="#34312F"
        className="w-6 h-6"
        onValueChange={() =>
          dispatch({ type: "TOGGLE_TODO", payload: todo.id })
        }
      />
      <Text
        className={todo.completed ? "line-through" : ""}
        style={styles.text}
        numberOfLines={2}
      >
        {todo.title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 16,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    color: "#464646",
    textAlign: "center",
    flex: 1,
  },
})

export default TaskCard
