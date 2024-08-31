import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// Files
import TaskCard from "@components/TaskCard"
import AddTaskInput from "@/components/AddTaskInput"
import { useTodoContext } from "@/context/GlobalContext"

interface Todo {
  id: string
  title: string
  completed: boolean
}

const Index = () => {
  const { todos } = useTodoContext()

  return (
    <SafeAreaView className="h-full bg-bg">
      <View className="px-4">
        <View className="my-4">
          <Text className="font-semibold text-3xl text-secondary">
            Todo App
          </Text>
          <Text className="font-medium text-sm text-n">
            Get Things Done, One Task at a Time.
          </Text>
        </View>
        <AddTaskInput />
      </View>
      <View className="bg-[#eee] flex-1 rounded-t-3xl border border-b-0 border-primary">
        <FlatList
          data={todos}
          keyExtractor={(item: Todo) => item.id}
          renderItem={({ item }) => <TaskCard todo={item} />}
          ListEmptyComponent={() => (
            <View>
              <Text className="text-center text-sm text-n">
                No tasks available. Add some tasks to get started!
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View className="mx-4 my-1 rounded-full h-[2px] bg-n/30"></View>
          )}
          ListHeaderComponent={() => (
            <Text className="text-secondary px-4 text-3xl font-medium mb-4 mt-6">
              Tasks
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default Index
