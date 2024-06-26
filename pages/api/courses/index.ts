import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '../../../utils/db'
import coursesModel from '../../../models/Course'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToDB()

    if (req.method === "POST") {
        try {
            const { title } = req.body;
            if (!title || title.trim() == '' || title.lenght < 5) {
                return res.status(400).send({
                    message: "Title is not valid !!!"
                })
            }

            await coursesModel.create({ title })

            return res.status(201).send({
                message: "Course Created Successfully :)"
            })
        } catch (error: any) {
            console.log('error:', error.message)
            return res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    } else if (req.method === "GET") {
        try {
            const { title } = req.query
            if (!title || title == '' || typeof (title) !== "string" || title.trim() == '') { //get all
                const courses = await coursesModel.find({}, { title: 1 }).sort({ _id: -1 })
                return res.status(200).send({
                    data: courses
                })
            } else { //search
                const courses = await coursesModel.find({ title: { $regex: title } }, { title: 1 }).sort({ _id: -1 })
                return res.status(200).send({
                    data: courses
                })
            }
        } catch (error: any) {
            console.log('error:', error.message)
            return res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    } else if (req.method === "PUT") {
        try {
            const { id, title } = req.body;

            if (!id || id.length < 10) {
                return res.status(400).send({
                    message: "Course id is not valid !!!"
                })
            }

            if (!title || title.length < 0) {
                return res.status(400).send({
                    message: "Course title is not valid !!!"
                })
            }

            await coursesModel.findOneAndUpdate(
                { _id: id },
                { title: title }
            )
            return res.status(200).send({
                message: "Course Updated Successfully :)"
            })
        } catch (error: any) {
            console.log('error:', error.message)
            return res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    } else {
        return res.status(400).send({
            message: "This Method Dosen't Support !!!"
        })
    }
}

export default handler