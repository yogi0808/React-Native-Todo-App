import React, { useState } from "react"
import { View, TextInput, Alert } from "react-native"

// Files
import { useTodoContext } from "@/context/GlobalContext"

const AddTaskInput = () => {
  const [task, setTask] = useState<string | undefined>("")
  const { dispatch } = useTodoContext()

  return (
    <View className="w-full px-4 rounded-lg flex-row items-center border-2 border-primary/70 focus:border-primary my-6">
      <TextInput
        className="pr-4 py-2 text-lg flex-1 text-n"
        placeholder="Enter you'r task hear..."
        placeholderTextColor="#464646"
        cursorColor={"#464646"}
        selectionColor={"#747474"}
        value={task}
        onChange={(e) => setTask(e.nativeEvent.text)}
        onSubmitEditing={() => {
          if (!task || task.length < 3) {
            return Alert.alert(
              "Warning",
              "Text length must be at list 3 characters long."
            )
          }

          dispatch({
            type: "ADD_TODO",
            payload: {
              id: Date.now().toString(),
              title: task,
              completed: false,
            },
          })
          setTask("")
        }}
      />
    </View>
  )
}

export default AddTaskInput
