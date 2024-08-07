"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ChannelType } from "@prisma/client"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).refine(
    name => name != "general", {
    message: "Channel Name Can't be [general]"
  }
  ),
  type: z.nativeEnum(ChannelType)
})

export function CreateGroup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT
    },
  })



  return (

    <Dialog>
      <DialogTrigger className="w-full flex justify-start"><button>CreateGroup</button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 flex justify-center">Create Your Own Group</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form className="w-full space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Name</FormLabel>
                      <FormControl>
                        <Input className="w-full " placeholder="Your Group Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                          <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            Object.values(ChannelType).map((type)=>( 
                              <SelectItem className="w-full" key={type} value={type}>{type}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <Button onClick={async() => {
          if(form.getValues().name==="general"){
            form.setError('name',{
              message:"Channel Name Can't be [general]"
            })

          }
        }}>Submit</Button>
      </DialogContent>
    </Dialog>
  )
}
