export const getPetTypeOptions=(data:any,level:number)=>{

    if(level===1){
        return null
    }

    // if(level===2){

    //     const filteredData = data.filter((item: any, index: number) => {
    //         return item.id === 1
    //     })
    //     const Options=filteredData.map((item:any,index:number)=>{
    //         return {
    //             value:item.id,
    //             label:item.name
    //         }
    //     })
    //     return Options
    // }

    if(level === 3 || 2){

        const filteredData = data.filter((Item:any,Index:number)=>(Item.level === 1))

        const Options = filteredData.map((item: any, index: number) => {
    
            const ChildrenPidFiltered = data.filter((Item:any,Index:number)=>(item.id === Item.pid))
    
            const ChildrenPidResult = ChildrenPidFiltered.map((PItem:any,PIndex:number)=>{
                return {
                    value:PItem.id.toString(),
                    label:PItem.name
                }
            })
    
            return {
                value:item.id.toString(),
                label:item.name,
                children:ChildrenPidResult
            }
        })
        
        return Options
    }


}