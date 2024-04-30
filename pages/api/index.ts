import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).send({
        message: "Welcome To CMS Apis Home Page :)"
    })
}

export default handler