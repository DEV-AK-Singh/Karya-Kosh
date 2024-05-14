import './App.css'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import Table from './components/ui/table'

import { v4 as uuidv4 } from 'uuid';

function PopoverWithForm({task,addTask,priority,setPriority,setTask}){
  const [trigger,setTrigger] = useState(false);
  return (
    <Popover open={trigger}>
      <PopoverTrigger/>
      <Button className='w-full font-bold shadow-sm mt-2' onClick={()=>{setTrigger(!trigger)}}>Add New Task</Button>
      <PopoverContent className='p-0'>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="task" name="task" placeholder="Enter Task Title" onChange={(e)=>{setTask(e.target.value)}}/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Select onValueChange={(value)=>{setPriority(value)}}>
                  <SelectTrigger id="task-details">
                    <SelectValue placeholder="Select Task Priority" />
                  </SelectTrigger>
                  <SelectContent position="popper" >
                    <SelectItem value="Highest">Highest</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Lowest">Lowest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={()=>{setTrigger(false)}}>Cancel</Button>
          <Button className="font-bold" onClick={()=>{
            if(task && priority){
              addTask();
            }
            setTrigger(false);  
          }}>Save Task</Button>
        </CardFooter>
      </PopoverContent>
    </Popover>
  )
}

function DatePicker({date,setDate}){
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-red-600 border-2 shadow-md",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date : {date}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

function App() {
  
  const [date, setDate] = useState('');
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('');
  const [id, setId] = useState('');
  const [tasks, setTasks] = useState([]);

  function addTask(){
    let newTask = {id:id,task:task,priority:priority,completed:false,date: format(date, "PPP")};
    setTasks([newTask,...tasks]);
    setId(uuidv4());
    setTask('');
    setPriority('');
  }

  useEffect(()=>{
    let today = new Date();
    setDate(today);
    setId(uuidv4());
  },[]);

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks)); 
  },[tasks])

  return (
    <div className='flex flex-col justify-center items-center h-screen overflow-y-auto'>
      <div className='flex flex-col max-w-[400px] w-full px-8'>
        <h1 className='text-3xl my-8 text-center font-bold' style={{textShadow:'1px 1px 2px red'}}>Karya-<span className='text-red-600' style={{textShadow:'1px 1px 2px black'}}>Kosh</span></h1>
        <DatePicker date={date} setDate={setDate}/>
        <PopoverWithForm task={task} addTask={addTask} priority={priority} setPriority={setPriority} setTask={setTask}/>
        <Table date={date} tasks={tasks} setTasks={setTasks}/>
      </div>
    </div>
  )
}

export default App
