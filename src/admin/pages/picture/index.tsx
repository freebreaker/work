import * as React from 'react';
import { useEffect, useState } from 'react'

import { apiGetPictureList } from '../api';


export const PictureList = (props: any) => {
    const [area, ] = useState("321001");

    useEffect(() => {
        apiGetPictureList(1,10).then((res:any)=>{
            if(res){
                console.log(res)
            }
        })
    },[]); 


    return (
        <div>
            {area}
        </div>
    )
}
