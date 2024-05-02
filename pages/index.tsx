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

export async function getStaticProps(context: any) {
  connectToDB()
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
}

export default Index;
