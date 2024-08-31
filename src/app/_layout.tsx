import { Stack } from "expo-router"

// Files
import TodoProvider from "@/context/GlobalContext"

const RootLayout = () => {
  return (
    <TodoProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
      </Stack>
    </TodoProvider>
  )
}

export default RootLayout
