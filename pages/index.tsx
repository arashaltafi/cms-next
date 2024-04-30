import Course from "../components/templates/index/Course";
import connectToDB from "../utils/db";
import coursesModel from "../models/Course"

const Index = () => {
  return (
    <Course />
  )
};

export async function getStaticProps(context: any) {
  connectToDB()
  const courses = await coursesModel.find({})
  
  console.log(courses);

  return {
    props: {}
  }
}

export default Index;
