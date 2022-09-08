import { Avatar, Badge } from "@mui/material"
import { useState } from "react"
import { User } from "../models/User"


export const UserAvatar = ({ user, selectedUser }: { user: User, selectedUser: string }) => {

    const [size] = useState(user.id === selectedUser ? '35px' : '30px')

    const userAvatarElement = <Avatar alt={user.id} src={user.avatar ?? ''} sx={{ width: size, height: size, bgcolor: user.color ?? '#' + Math.floor(Math.random() * 16777215).toString(16) }}>
    {user.username?.charAt(0)}
</Avatar>

    return (
        <>
            {user.online ?
                <Badge color="success" variant="dot" sx={{}} anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}>
                    {userAvatarElement}
                </Badge>
                :
                userAvatarElement
            }
        </>
    )
}