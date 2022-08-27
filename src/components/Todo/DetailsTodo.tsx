import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "../Auth/supabaseClient"
import { TodoItem } from "../models/todoEntity"




export const DetailsTodo = ({ id, open, handleClose }: { id: number, open: boolean, handleClose: any }) => {


  const [todoItem, setTodoItem] = useState<TodoItem>();

  useMemo(() => {
    supabase.from('todos')
      .select('*')
      .eq('id', id)
      .then((item) => {
        console.log(item)
        if (item.data) setTodoItem(item.data[0])
      })

  }, [id])

  const removeTodo = () => {
    try {
      if (id) {
        supabase.from('todos')
          .delete().eq('id', id)
          .then((res) => { 
            console.log("Item deleted: ", id)
            handleClose();
          });
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  const saveTodo = () => {
    try {
      if (id) {
        supabase.from('todos')
          .update({ description: todoItem?.description })
          .eq('id', id)
          .then((res) => { 
            console.log("Item saved: ", id)
            handleClose();
          });
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setTodoItem();
  };


  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{todoItem?.title}</DialogTitle>

        <DialogContent>
          <TextField
            multiline
            rows={4}
            defaultValue={todoItem?.description}
            onChange={handleChange}
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => removeTodo()}>Save</Button>
          <Button onClick={() => saveTodo()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )

}