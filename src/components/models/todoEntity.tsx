export type TodoItem = {
    id: number
    title: string
    created_at: Date
    description: string
    step: number
    type: "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined
  }