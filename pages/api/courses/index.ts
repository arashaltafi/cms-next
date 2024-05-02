import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '../../../utils/db'
import coursesModel from '../../../models/Course'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToDB()

    if (req.method === "POST") {
        try {
            const { title } = req.body;
            if (!title || title.trim() == '' || title.lenght < 5) {
                res.status(400).send({
                    message: "Title is not valid!"
                })
            }

            await coursesModel.create({ title })

            res.status(201).send({
                message: "Course Created Successfully :)"
            })
        } catch (error) {
            res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    } else if (req.method === "GET") {
        try {
            const courses = await coursesModel.find({}, { _id: 0, title: 1 }).sort({ _id: -1 })
            res.status(200).send({
                data: courses
            })
        } catch (error) {
            res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    }
}

export default handler