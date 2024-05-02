import { useState } from "react";
import AddCourseModal from "./AddCourseModal";
import styles from "../../../styles/Course.module.css";
import CoursesItem from "../../modules/coursesItem/CoursesItem";

type course = { title: string }[]

interface CourseProps {
  data: course
}

const Course = (props: CourseProps) => {
  const [data, setData] = useState<course | undefined>(props.data)
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)

  const hideAddCourseModal = () => setShowAddCourseModal(false)

  const getCourses = async () => {
    const response = await fetch('/api/courses')
    const res = await response.json()

    if (response.status === 200) {
      setData(res.data)
    }
  }

  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>دوره ها</h2>
          <a
            href="#"
            className={styles.new_course_btn}
            onClick={() => setShowAddCourseModal(true)}
          >
            اضافه کردن دوره جدید
          </a>
        </div>
        <ul className={styles.courses_list}>
          {
            data?.map((data, index) => (
              <CoursesItem key={index} title={data.title} image="/images/courses/PWA.jpg" />
            ))
          }
        </ul>
      </section>

      {showAddCourseModal && (
        <AddCourseModal hideAddCourseModal={hideAddCourseModal} getCourses={getCourses} />
      )}
    </>
  );
};

export default Course;
