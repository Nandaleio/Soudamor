import { Box, Button, ButtonGroup, Checkbox, Chip, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, styled, TextField, Tooltip, tooltipClasses, TooltipProps } from "@mui/material"
import { useEffect, useState } from "react"
import { supabase } from "../Auth/supabaseClient"
import { AddTodo } from "./AddTodo"


type TodoItem = {
  id: number
  title: string
  created_at: Date
  description: string
  step: number
  type: "default" | "error" | "primary" | "secondary" | "info" | "success" | "warning" | undefined
}

export const Todo = () => {

  const [todos, setTodos] = useState<TodoItem[] | null>([]);


  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => {
    try {
      supabase.from('todos').select(`*`).then((res) => {
        if (res && res.data) {
          setTodos(res.data)
          setToDoList(res.data.filter(t => t.step === 0));
          setDoingList(res.data.filter(t => t.step === 1));
          setDoneList(res.data.filter(t => t.step === 2));
        }
      })
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

  const [toDoList, setToDoList] = useState<TodoItem[] | null>([]);
  const [doingList, setDoingList] = useState<TodoItem[] | null>([]);
  const [doneList, setDoneList] = useState<TodoItem[] | null>([]);

  const changeStep = (id: number, value: number) => {
    supabase.from('todos')
      .update({ step: value })
      .eq('id', id).then(() => { });
  }

  const customList = (items: TodoItem[] | null) => (
    <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items?.map((value: TodoItem) => {
          return (
            <ListItem key={value.id} sx={{ backgroundColor: value.type, color: "white" }}>

              {value.step > 0 && <ListItemButton onClick={() => changeStep(value.id, value.step - 1)}>{"<"}</ListItemButton>}

                <ListItemText>{value.title}</ListItemText>

              {value.step < 2 && <ListItemButton onClick={() => changeStep(value.id, value.step + 1)}>{">"}</ListItemButton>}
            </ListItem>
          );
        })}
        <ListItem />
      </List>



    </Paper>
  )





  return (
    <>
      <Box marginTop="20px" display="flex" alignItems="center">

        <Stack direction="column" spacing={2}>

          <AddTodo/>
          


          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap ' }}>
            <Grid item>{customList(toDoList)}</Grid>
            <Grid item>{customList(doingList)}</Grid>
            <Grid item>{customList(doneList)}</Grid>
          </Grid>

        </Stack>
      </Box>
    </>
  )
}