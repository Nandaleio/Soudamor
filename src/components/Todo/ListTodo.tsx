import { List, ListItem, ListItemButton, Paper } from "@mui/material";
import { supabase } from "../Auth/supabaseClient";
import { TodoItem } from "../models/todoEntity";



export const ListTodo = ({items, setSelectedId}: {items: TodoItem[] | undefined, setSelectedId: any}) => {


    const changeStep = (item: TodoItem, value: number) => {
        supabase.from('todos')
          .update({ step: value })
          .eq('id', item.id).then(() => {
            console.log(`change item ${item.id} step to ${value}`);
          });
      }

    return (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items?.map((value: TodoItem) => {
                    return (
                        <ListItem key={value.id} sx={{ backgroundColor: value.type, color: "white" }}>

                            {value.step > 0 && <ListItemButton onClick={() => changeStep(value, value.step - 1)}>{"<"}</ListItemButton>}

                            <ListItemButton onClick={() => setSelectedId(value.id)}>{value.title}</ListItemButton>

                            {value.step < 2 && <ListItemButton onClick={() => changeStep(value, value.step + 1)}>{">"}</ListItemButton>}
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    )
}


