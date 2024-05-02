import { useState } from "react";
import styles from "../../../styles/Course.module.css";
import EditModal from "../../templates/index/EditModal";
import DeleteModal from "../../templates/index/DeleteModal";
import { showToast } from "../../../utils/Toast";

interface CoursesItemProps {
  _id: string,
  title: string,
  image: string,
  getCourses: () => void
}

const CoursesItem = (props: CoursesItemProps) => {
  const [titleUpdate, setTitleUpdate] = useState<string>("")

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hideEditModal = () => setShowEditModal(false);
  const hideDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteCourse = async () => {
    const response = await fetch(`/api/courses/${props._id}`, {
      method: "DELETE"
    })
    const data = await response.json()

    if (response.status === 200) {
      showToast(data.message, "success")
      hideDeleteModal()
      props.getCourses()
    } else {
      showToast(data.message, "error")
      hideDeleteModal()
    }
  }

  const editCourse = async () => {
    const response = await fetch('/api/courses', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: props._id, title: titleUpdate.trim() })
    })
    const data = await response.json()
    setTitleUpdate('')
    hideEditModal()

    if (response.status === 200) {
      showToast(data.message, "success")
      props.getCourses()
    } else {
      showToast(data.message, "error")
    }
  }

  return (
    <>
      <li className={styles.courses_item}>
        <div className={styles.courses_img_title}>
          <img
            src={props.image}
            alt="course-item-img"
            className={styles.courses_img}
          />
          <h5 className={styles.courses_name}>{props.title}</h5>
        </div>
        <div className={styles.courses_btns}>
          <a
            className={styles.courses_btn_edit}
            onClick={() => {
              setTitleUpdate(props.title)              
              setShowEditModal(true)
            }}
          >
            {" ویرایش "}
          </a>
          <a
            className={styles.courses_btn_delete}
            onClick={() => setShowDeleteModal(true)}
          >
            {" حذف "}
          </a>
        </div>
      </li>
      {showEditModal &&
        <EditModal
          title={titleUpdate}
          setTitle={setTitleUpdate}
          hideEditModal={hideEditModal}
          editCourse={editCourse}
        />}
      {showDeleteModal &&
        <DeleteModal hideDeleteModal={hideDeleteModal} deleteCourse={handleDeleteCourse} />
      }
    </>
  );
};

export default CoursesItem;
