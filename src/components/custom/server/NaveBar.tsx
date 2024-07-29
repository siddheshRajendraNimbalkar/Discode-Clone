import db from "@/lib/db"
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerHeader from "./ServerHeader";

interface ServerNavBAr {
    serverID: string,
    userId: string | undefined
}

const NaveBar = async ({ serverID, userId }: ServerNavBAr) => {

    const server = await db.server.findUnique({
        where: {
            id: serverID
        },
        include: {
            channel: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            member: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });

    if(!server){
        redirect('/')
    }

    const textChannels = server?.channel.filter((channel) => {
        channel.type === ChannelType.TEXT
    })

    const audioChannels = server?.channel.filter((channel) => {
        channel.type === ChannelType.AUDIO
    })

    const videoChannels = server?.channel.filter((channel) => {
        channel.type === ChannelType.VIDEO
    })

    const member = server?.member.filter((member) => {
        member?.id === userId
    })

    let role = null;
     server.member.find((member)=>{
        if(member.profileId === userId){
            role = member.role
        }
    });
    return (
        <>
            <div>
               <ServerHeader server={server} role={role} />
            </div>
        </>
    )
}

export default NaveBar