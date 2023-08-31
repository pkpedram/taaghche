// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// USE REDIS FOR LATER CACHES

type Data = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST'){
   try {
    // CACHE DATA IN REDIS
     res.status(200).json({body: 'cached success'})
   } catch (error) {
    // GET DATA FROM REDIS
    res.status(500).json({body: 'مشکلی پیش آمده است'})
   }
  }else{

    res.status(200).json({ body: ''})
  }



}
