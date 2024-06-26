import { useState } from "react";
import AddCourseModal from "./AddCourseModal";
import styles from "../../../styles/Course.module.css";
import CoursesItem from "../../modules/coursesItem/CoursesItem";
import { useRouter } from "next/router";

type course = { _id: string, title: string }[]

interface CourseProps {
  data: course
}

const Course = (props: CourseProps) => {
  const [data, setData] = useState<course | undefined>(props.data)
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)

  const router = useRouter()

  const hideAddCourseModal = () => setShowAddCourseModal(false)

  const getCourses = async () => {
    const response = await fetch('/api/courses')
    const res = await response.json()

    if (response.status === 200) {
      setData(res.data)
    }

    router.push('/')
  }

  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>دوره ها</h2>
          <a
            className={styles.new_course_btn}
            onClick={() => setShowAddCourseModal(true)}
          >
            اضافه کردن دوره جدید
          </a>
        </div>
        <ul className={styles.courses_list}>
          {
            data?.map((data, index) => (
              <CoursesItem
                key={index}
                _id={data._id}
                title={data.title}
                image="https://arashaltafi.ir/arash.jpg"
                getCourses={getCourses}
              />
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
