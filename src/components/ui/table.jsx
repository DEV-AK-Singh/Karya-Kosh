import React from "react";
import { format } from "date-fns"

export default function Table({date, tasks, setTasks }) {

  function Row(task, strikeTask, deleteTask) {
    return (
      <tr
        className="cursor-pointer tasks h-16"
        key={`${task.task}-${task.id}`}
        onClick={()=>{strikeTask(task.id);}}
      >
        <td
          className={`select-none text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900 decoration-red-600  decoration-2 ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.task}
        </td>
        <td
          className={`select-none text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900 decoration-red-600  decoration-2 ${
            task.completed ? "line-through" : ""
          }`}
        >
          <p className="border border-red-600 rounded-full text-xs">{task.priority}</p>
        </td>
        <td
          className={`select-none text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900`}
        >
          <input type="checkbox" className="accent-red-600" onChange={()=>{deleteTask(task.id)}}/>
        </td>
      </tr>
    );
  }

  const deleteTask = (id) => {
    console.log(`${id} will be deleted soon..`);
    setTimeout(()=>{
      const UpdatedTasks = tasks.filter((task) => task.id != id);
      setTasks(UpdatedTasks);
    },1000)
  };

  const strikeTask = (id) => {
    console.log(id);
    const UpdatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(UpdatedTasks);
  };

  return (
    <div className="overflow-auto h-[400px] mt-2 no-scrollbar rounded-lg shadow-md shadow-red-600">
      {tasks.length ? (
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="sticky top-0 bg-gray-200 ">
              <th className="text-start whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Tasks
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Priority
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 w-full">
            {tasks.length > 0
              ? tasks.map((task) => {
                  return (task.date==format(date, "PPP"))?Row(task, strikeTask, deleteTask):'';
                })
              : ""}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="font-bold">No Task Listed..</h1>
        </div>
      )}
    </div>
  );
}
