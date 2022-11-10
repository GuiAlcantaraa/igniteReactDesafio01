import styles from './Task.module.css'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";


interface Task {
    id: string;
    title: string;
    isComplete: boolean;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;

}

export function Task({ id, title, isComplete, onComplete, onDelete }: Task) {

    return (
        <div className={styles.task}>
            <button
                className={styles.checkContainer}
                onClick={() => onComplete(id)}
            >
                {isComplete ? <BsFillCheckCircleFill /> : <div />}
            </button>

            <p className={isComplete ? styles.textCompleted : ""}>
                {title}
            </p>


            <button
                className={styles.deleteButton}
                onClick={() => onDelete(id)}
            >
                <TbTrash size={20} />
            </button>
        </div>
    )
}