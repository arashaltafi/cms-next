import Course from "../components/templates/index/Course";
import connectToDB from "../utils/db";
import coursesModel from "../models/Course"
import { ToastContainer } from "react-toastify";

const Index = ({ courses }: { courses: { _id: string, title: string }[] }) => {
  return (
    <>
      <ToastContainer />
      <Course data={courses} />
    </>
  )
};

export async function getServerSideProps(context: any) {
  connectToDB()
  const { query } = context

  if (!query.title || query.title == '' || query.title.trim() == '') { //get all
    const courses = await coursesModel.find({}, { title: 1 }).sort({ _id: -1 })
    if (courses) {
      return {
        props: {
          courses: JSON.parse(JSON.stringify(courses))
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  } else { //search
    const coursesSearched =
      await coursesModel.find({ title: { $regex: query.title } }, { title: 1 }).sort({ _id: -1 })
    if (coursesSearched) {
      return {
        props: {
          courses: JSON.parse(JSON.stringify(coursesSearched))
        }
      }
    } else {
      return {
        notFound: true
      }
    }
  }
}

export default Index;
