import rocketImg from '../../assets/rocket-icon.svg'
import { PlusCircle } from "@phosphor-icons/react";

type TaskProps = {
    name: string,
    isFinish: boolean
}


interface FormProps {
    handleCreateNewTask: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    newNameTask: string;
}

export const TopBar = (props: FormProps) => {


    return (
        <header className="flex flex-col h-44 bg-gray-700">
            <div className='w-full h-full flex justify-center items-center'>
                <img className='w-16 h-16' src={rocketImg} />
                <span className='text-blue font-bold text-5xl'>to</span>
                <span className='text-purple-dark font-bold text-5xl'>do</span>
            </div>
            <div className='flex justify-center items-end'>
                <form onSubmit={props.handleCreateNewTask} className="flex gap-2 -mb-4">
                    <input
                        required
                        value={props.newNameTask}
                        placeholder="Adicione uma nova tarefa"
                        className="bg-gray-500 rounded-md w-96 focus:outline-none px-4 py-4 text-base text-white font-inter"
                        onChange={props.handleInputChange}
                    />
                    <button
                        type="submit"
                        className="flex justify-center items-center gap-1 bg-blue-dark text-white rounded-md px-2 py-2 w-20 text-sm"
                    >
                        Criar <PlusCircle size={20} color="#f7f7f7" />
                    </button>
                </form>
            </div>
        </header>
    )
}