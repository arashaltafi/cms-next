import styles from "../../../styles/Modal.module.css";

interface DeleteModalProps {
  hideDeleteModal: () => void
  deleteCourse: () => void
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <div className={styles.modal_container} id="delete-modal">
      <div className={styles.modal_bg} onClick={props.hideDeleteModal}></div>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_title}>ایا از حذف دوره مطمئن هستید؟</h1>
        <div className={styles.btn_groups}>
          <button
            className={styles.accept_btn}
            onClick={props.deleteCourse}
          >
            بله
          </button>
          <button
            className={styles.unaccept_btn}
            onClick={props.hideDeleteModal}>
            خیر
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
