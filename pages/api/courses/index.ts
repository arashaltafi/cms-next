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
            const courses = await coursesModel.find({}, { _id: 0, title: 1 }).sort({ _id: -1 })
            return res.status(200).send({
                data: courses
            })
        } catch (error: any) {
            console.log('error:', error.message)
            return res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    }
}

export default handler