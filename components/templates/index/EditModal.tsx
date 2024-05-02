import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCashRegister, faTag, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/Modal.module.css";

interface EditModalProps {
    hideEditModal: () => void
}

const EditModal = (props: EditModalProps) => {
    return (
        <div className={styles.modal_container} id="edit-modal">
            <div className={styles.modal_bg} onClick={props.hideEditModal}></div>
            <div className={styles.modal_content}>

                <h1 className={styles.modal_title}>اطلاعات جدید را وارد کنید</h1>
                <form action="#" className={styles.edit_user_form}>
                    <div className={styles.input_field}>
                        <span><FontAwesomeIcon icon={faTag} /></span>
                        <input
                            type="text"
                            placeholder="نام دوره"
                        />
                    </div>
                    <div className={styles.input_field}>
                        <span><FontAwesomeIcon icon={faCashRegister} /> </span>
                        <input
                            type="text"
                            placeholder="قیمت دوره"
                        />
                    </div>
                    <div className={styles.input_field}>
                        <span><FontAwesomeIcon icon={faUser} /></span>
                        <input
                            type="text"
                            placeholder="مدرس دوره"
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
