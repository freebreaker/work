import * as qiniu from 'qiniu-js';
import md5 from 'md5';

/**
 * 
 * @param file 上传文件
 * @param token 七牛云token
 * @param type type === "ao" 图标图（分类）  type==="ak" 广告图
 */
export function sendToQiniu(file: any, token: string,type?:string) {

    const putExtra = {
        fname: "",
        params: {},
        mimeType: [] || null
    };

    const config = {
        useCdnDomain: true,
        region: qiniu.region.z2
    };

    const fileUid = md5(file.uid) + file.name

    let adminId:string|null = localStorage.getItem("adminId")

    const timeStamp = new Date().getTime().toString()

    if(adminId){
        while(adminId.length < 36){
            adminId+="x"
        }
    }else{
        alert("请重新登陆")
    }


    const fileName = `${adminId}${timeStamp}${type}12`

    console.log("name:",fileName)

    const observable = qiniu.upload(file,fileUid, token, putExtra, config)

    observable.subscribe({
        next(res: any) {
            // ...
        },
        error(err: any) {
            // ...
        },
        complete(res: any) {
            // ...
            console.log(res)
        }
    })
}

export const concatImageString = (FileList: any) => {

    const publicQiniuCloud = "https://ui.chongdu.com/"

    if (FileList.length > 0) {

        const concatImageArr:string[] = []

        FileList.map((item: any, index: number) => {
            if (item.url) {
                concatImageArr.push(item.url)
            } else {
                concatImageArr.push(`${publicQiniuCloud}${md5(item.uid)}${item.name}`)
            }
        })

        return concatImageArr.toString()

    } else {
        return ""
    }
}

