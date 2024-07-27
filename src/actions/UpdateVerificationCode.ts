'use server'

import db from '@/lib/db'
import { v4 as uuidv4 } from 'uuid';

const UpdateVerificationCode = (params:any) => {
    try {
        const server = db.server.update({
            where:{
                id:params
            },
            data:{
                invitationCode:uuidv4()
            }
        })
    
        if(!server){
            return false
        }
    
        return server
    } catch (error) {
        console.log("[ERROR Update Verification Code]:",error)
        return error
    }
}

export default UpdateVerificationCode