import styles from './Task.module.css'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";


interface Task {
    id: number;
    title: string;
    isComplete: boolean;
    onComplete: (id: number) => void;

}



export function Task({ id, title, isComplete }: Task) {


    console.log(isComplete)
    return (
        <div className={styles.task}>
            <button className={styles.checkContainer}>
                {isComplete ? <BsFillCheckCircleFill /> : <div />}
            </button>

            <p className={isComplete ? styles.textCompleted : ""}>
                {title}
            </p>


            <button className={styles.deleteButton}>
                <TbTrash size={20} />
            </button>
        </div>
    )
}