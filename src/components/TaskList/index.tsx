import styles from './TaskList.module.css';
import { v4 as uuid } from 'uuid';

import { AiOutlinePlusCircle } from "react-icons/ai";

import clip from '../../assets/Clipboard.png'
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from '../Task';

interface Task {
    id: string;
    title: string;
    isComplete: boolean;
}

export function TaskList() {

    const [tasks, setTasks] = useState<Task[]>([])
    const [description, setDescription] = useState("")

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()

        const newTask = {
            id: uuid(),
            title: description,
            isComplete: false
        }
        setTasks(oldState => [...oldState, newTask])
        setDescription("");

    }
    function handleNewDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }
    function handleToggleTaskCompletion(id: string) {

        const newTasks = tasks.map(tasks => tasks.id === id ? {
            ...tasks,
            isComplete: !tasks.isComplete
        } : tasks);

        setTasks(newTasks)

    }

    function handleRemoveTask(id: string) {

        const filteredTasks = tasks.filter(tasks => tasks.id !== id);
        setTasks(filteredTasks);

    }

    const isTaskEmpty = tasks.length === 0
    const completedTasks = tasks.filter((task) => task.isComplete).length;
    const amountOfTasksCreated = tasks.length

    return (
        <div className={styles.tasks}>
            <form onSubmit={handleCreateNewTask} className={styles.createNewTaskForm}>
                <input
                    type="text"
                    placeholder='Adicione uma nova tarefa'
                    value={description}
                    onChange={handleNewDescriptionChange}
                    required
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
                        <span>{amountOfTasksCreated}</span>
                    </div>

                    <div>
                        <p>Concluídas</p>
                        <span>
                            {completedTasks} de {amountOfTasksCreated}
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
                            onComplete={handleToggleTaskCompletion}
                            onDelete={handleRemoveTask}
                        />
                    ))

                }
            </div>

        </div>
    )
}