import { TopBar } from "./components/TopBar/TopBar";
import taskImg from './assets/task.svg';
import { ChangeEvent, FormEvent, useState } from "react";
import { Trash, RadioButton, Check } from "@phosphor-icons/react";
function App() {



  type TaskProps = {
    name: string,
    isFinish: boolean

  }

  const [newNameTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const haveTasks = tasks.length === 0;

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask: TaskProps = {
      name: newNameTask,
      isFinish: false
    }

    setTasks((prevArray) => [...prevArray, newTask]);
    setNewTask("");
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleDeleteTask(taskToDelete: string) {

    const taskWithoutDeletedOne = tasks.filter(task => {
      return task.name !== taskToDelete;
    })
    setTasks(taskWithoutDeletedOne)
  }

  function handleCheckChangeInput(taskProps: TaskProps) {
    const updatedTasks = tasks.map((task) => {
      if (task.name === taskProps.name) {
        return { ...task, isFinish: !task.isFinish };
      }
      return task;
    });
    setTasks(updatedTasks);

    console.log(tasks)
  }

  return (
    <div className="w-screen h-screen bg-gray-600">
      <TopBar
        newNameTask={newNameTask}
        handleInputChange={handleInputChange}
        handleCreateNewTask={handleCreateNewTask}
      />
      <section className="w-[700px] h-80 mx-auto mt-14">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-blue text-base">Tarefas criadas</span>
            <p className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center p-3.5 text-sm text-white">
              {tasks.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-purple text-base">Concluídas</span>
            <p className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center p-3.5 text-sm text-white">
              0
            </p>
          </div>
        </div>
        {haveTasks && (
          <>
            <div className="h-[2px] w-full bg-gray-300 rounded-t-3xl shadow-xl mt-2" />


            <div className="flex flex-col gap-2 justify-center items-center mt-24">
              <img className="w-20 h-20 mb-4" src={taskImg} alt="No tasks" />
              <span className="text-base text-gray-300">Você ainda não tem tarefas cadastradas</span>
              <span className="text-base text-gray-300">Crie tarefas e organize seus itens a fazer</span>
            </div>
          </>
        )}

        {
          !haveTasks && (
            <div className="flex flex-col gap-y-4 mt-12">
              {tasks.map((task) => (
                <div
                  className="w-full bg-gray-500 flex gap-3 justify-between items-start px-4 py-5 rounded-lg"
                  key={task.name}
                >
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        onChange={() => handleCheckChangeInput(task)}
                        checked={task.isFinish}
                        type="checkbox" // Usando checkbox
                      />

                      {task.isFinish && (
                        <RadioButton className="text-white w-6 h-6" />
                      )}
                    </label>
                  </div>
                  <p className={`text-white ${task.isFinish && "line-through"}`}>{task.name}</p>
                  <button onClick={() => handleDeleteTask(task.name)}>
                    <Trash className="text-gray-300 w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )
        }

      </section>
    </div>
  )
}

export default App
