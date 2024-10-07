import { NextApiRequest, NextApiResponse } from "next";
import React from "react";




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {



    const sortBy = req.query.sortBy;
    const sortDir = req.query.sortDir;
    const limit = req.query.limit;
    
    // console.log('This is React query');
    // console.log(req.query);
    // console.log('This is Sortby query');
    // console.log(req.query.sortBy);


    //const { sortBy = 'market_cap',  } = req.query;
    const dataURL=`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.NEXT_APP_API_KEY}&sort=${sortBy}&limit=${limit}&sort_dir=${sortDir}`
    
    const coinData = await fetch(dataURL)
        .then(response => response.json())
    
    res.status(200).json({ coinData })
}  