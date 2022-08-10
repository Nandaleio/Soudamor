import { TextField, ButtonGroup, Button, Box, Stack } from "@mui/material";
import { useState } from "react";
import { supabase } from "../Auth/supabaseClient";



export const AddTodo = () => {


    const [newTodoTitle, setNewTodoTitle] = useState("");

    const addTodo = (type: string) => {
        try {

            supabase.from('todos').insert([
                { title: newTodoTitle, type: type },
            ]).then((newItem) => {

            });

            setNewTodoTitle("");

        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <>
            <Stack direction="column" sx={{display: "flex", justifyContent: "center"}}>
                <TextField label="Add todo" value={newTodoTitle} onChange={(e: any) => setNewTodoTitle(e.target.value)} />
                <ButtonGroup variant="contained" sx={{display: "block", boxShadow: "0"}}>
                    <Button onClick={() => addTodo("#d32f2f")} color="error">+</Button>
                    <Button onClick={() => addTodo("#ed6c02")} color="warning">+</Button>
                    <Button onClick={() => addTodo("#9c27b0")} color="secondary">+</Button>
                    <Button onClick={() => addTodo("#2e7d32")} color="success">+</Button>
                    <Button onClick={() => addTodo("#1976d2")} color="primary">+</Button>
                    <Button onClick={() => addTodo("#0288d1")} color="info">+</Button>
                </ButtonGroup>
            </Stack>
        </>
    )
}