import { Button, ButtonGroup, Chip, Stack, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { supabase } from "../Auth/supabaseClient"

type TodoItem = {
  id: number
  title: string
  created_at: Date
  type: "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined
}

export const Todo = () => {

  const [todos, setTodos] = useState<TodoItem[] | null>([]);

  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => {
    try {
      supabase.from('todos').select(`*`).then((res) => setTodos(res.data))
    } catch (error: any) {
      alert(error.message)
    }
  }

  const addTodo = (type: string) => {
    try {
      
      supabase.from('todos').insert([
          { title: newTodoTitle, type: type },
        ]).then((newItem) => {
          if(!newItem.error && newItem.data) setTodos([...todos ?? [], newItem.data[0]]);
        });

      setNewTodoTitle("");

    } catch (error: any) {
      alert(error.message)
    }
  }

  const removeTodo = (id: number) => {
    try {
      supabase.from('todos').delete().eq('id', id)
        .then((res) => todos && setTodos(todos.filter((idTodo) => idTodo.id !== id)));
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <>

      <TextField label="Add todo" value={newTodoTitle} onChange={(e: any) => setNewTodoTitle(e.target.value)} />
      <ButtonGroup variant="contained">
        <Button onClick={() => addTodo("error")} color="error">+</Button>
        <Button onClick={() => addTodo("warning")} color="warning">+</Button>
        <Button onClick={() => addTodo("secondary")} color="secondary">+</Button>
        <Button onClick={() => addTodo("success")} color="success">+</Button>
        <Button onClick={() => addTodo("primary")} color="primary">+</Button>
        <Button onClick={() => addTodo("info")} color="info">+</Button>
      </ButtonGroup>

      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: "20px" }}>
        {todos && todos.map((row: TodoItem) => (
          <Chip label={row.title} color={row.type} onDelete={() => removeTodo(row.id)} />
        )
        )}
      </Stack>
    </>
  )
}