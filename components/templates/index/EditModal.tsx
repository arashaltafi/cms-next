import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Modal.module.css";
import { Dispatch, SetStateAction } from "react";
import { showToast } from "../../../utils/Toast";

interface EditModalProps {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    hideEditModal: () => void,
    editCourse: () => void,
}

const EditModal = (props: EditModalProps) => {
    const handleEditCourse = (e: any) => {
        e.preventDefault()
        if (!props.title || props.title == '' || props.title.trim() == '') {
            showToast("نام دوره نمی تواند خالی باشد", "error")
        } else {
            props.editCourse()
        }
    }

    return (
        <div className={styles.modal_container} id="edit-modal">
            <div className={styles.modal_bg} onClick={props.hideEditModal}></div>
            <div className={styles.modal_content}>

                <h1 className={styles.modal_title}>اطلاعات جدید را وارد کنید</h1>
                <form
                    onSubmit={handleEditCourse}
                    className={styles.edit_user_form}>
                    <div className={styles.input_field}>
                        <span><FontAwesomeIcon icon={faTag} /></span>
                        <input
                            type="text"
                            placeholder="نام دوره"
                            value={props.title}
                            onChange={(e) => props.setTitle(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.update_btn}>
                        اپدیت دوره
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditModal
