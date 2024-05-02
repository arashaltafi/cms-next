import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDB from '../../../utils/db'
import coursesModel from '../../../models/Course'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToDB()
    if (req.method === "DELETE") {
        try {
            const { id } = req.query;
            
            if (!id || id.length < 10) {
                return res.status(400).send({
                    message: "Course id is not valid !!!"
                })
            }

            await coursesModel.findOneAndDelete({ _id: id })
            return res.status(200).send({
                message: "Course Removed Successfully :)"
            })
        } catch (error: any) {
            console.log('error:', error.message)
            return res.status(500).send({
                message: "UnKhown Internal Server Error !!!"
            })
        }
    } else {
        return res.status(400).send({
            message: "Please Send Request With Delete Method !!!"
        })
    }
}

export default handler