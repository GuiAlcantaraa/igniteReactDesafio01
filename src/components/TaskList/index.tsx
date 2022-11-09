import styles from './TaskList.module.css';
import { AiOutlinePlusCircle } from "react-icons/ai";

import clip from '../../assets/Clipboard.png'
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from '../Task';

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

export function TaskList() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [description, setDescription] = useState("")

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()

        const newTask = {
            id: Math.random(),
            title: description,
            isComplete: false
        }
        setTasks(oldState => [...oldState, newTask])
        setDescription("");

    }
    function handleNewDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }

    function handleDeleteTask(id: number) {
        console.log(id)
    }

    const isTaskEmpty = tasks.length === 0

    return (
        <div className={styles.tasks}>
            <form onSubmit={handleCreateNewTask} className={styles.createNewTaskForm}>
                <input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    value={description}
                    onChange={handleNewDescriptionChange}
                />

                <button type='submit'>
                    Criar
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>

            <section className={styles.tasks}>
                <div className={styles.amountOfTasks}>
                    <div>
                        <p>Tarefas criadas</p>
                        <span>70</span>
                    </div>

                    <div>
                        <p>Concluídas</p>
                        <span>
                            20 de 50
                        </span>
                    </div>
                </div>
            </section>


            <div className={styles.list}>
                {isTaskEmpty ?
                    <section className={styles.empty}>
                        <img src={clip} alt="" />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </section>

                    : tasks.map(task => (
                        <Task
                            key={task.id}
                            title={task.title}
                            id={task.id}
                            isComplete={task.isComplete}
                            onComplete={handleDeleteTask}
                        />
                    ))

                }
            </div>

        </div>
    )
}