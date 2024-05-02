import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Modal.module.css";
import { useState } from "react";
import { showToast } from "../../../utils/Toast";

interface AddCourseModalProps {
    hideAddCourseModal: () => void,
    getCourses: () => void
}

const AddCourseModal = (props: AddCourseModalProps) => {
    const [title, setTitle] = useState<string>("")

    const addNewCourse = async (e: any) => {
        e.preventDefault()
        const response = await fetch("/api/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title.trim() })
        })
        const data = await response.json()
        if (response.status === 201) {
            showToast(data.message, "success")
            setTitle('')
            props.getCourses()
            props.hideAddCourseModal()
        } else {
            showToast(data.message, "error")
        }
    }

    return (
        <div className={styles.modal_container} id="add-new-course-modal">
            <div className={styles.modal_bg} onClick={props.hideAddCourseModal}></div>
            <div className={styles.modal_content}>

                <h1 className={styles.modal_title}>اضافه کردن دوره جدید</h1>
                <form
                    onSubmit={addNewCourse}
                    className={styles.edit_user_form}>
                    <div className={styles.input_field}>
                        <span><FontAwesomeIcon icon={faTag} /></span>
                        <input
                            type="text"
                            placeholder="عنوان دوره"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className={styles.update_btn}>
                        ایجاد دوره
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCourseModal
