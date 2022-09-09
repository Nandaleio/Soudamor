import { Box, Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { supabase } from "../Auth/supabaseClient"
import { TodoItem } from "../models/todoEntity"
import { AddTodo } from "./AddTodo"
import { DetailsTodo } from "./DetailsTodo"
import { ListTodo } from "./ListTodo"


export const Todo = () => {

  const [todos, setTodos] = useState<TodoItem[] | null>([]);


  const loadTodos = () => {
    supabase.from('todos').select(`*`).then((res) => {
      console.log("getting all Todo items", res)
      if (res && res.data) {
        setTodos(res.data)
      }
    })
  }


  useEffect(() => {
    loadTodos();
   

    supabase
      .from('todos')
      .on('*', (payload) => {
        console.log('Change received!', payload)

        loadTodos();
      })
      .subscribe();


  }, [])

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);

  const openModal = (id: number) => {
    setOpen(true)
    setSelectedId(id)
  }

  return (
    <>
      <Box marginTop="20px" display="flex" alignItems="center">

        <Stack direction="column" spacing={2}>

          <AddTodo />

          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap ' }}>
            <Grid item><ListTodo items={todos?.filter(t => t.step === 0)} setSelectedId={openModal} /></Grid>
            <Grid item><ListTodo items={todos?.filter(t => t.step === 1)} setSelectedId={openModal} /></Grid>
            <Grid item><ListTodo items={todos?.filter(t => t.step === 2)} setSelectedId={openModal} /></Grid>
          </Grid>

          <DetailsTodo id={selectedId} open={open} handleClose={() => { setOpen(false) }} />
        </Stack>
      </Box>
    </>
  )
}