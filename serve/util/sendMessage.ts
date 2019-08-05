import { getUserId } from './index';
import axios from 'axios';

/** A cool guy. */
interface Data {
    content: string,
    /**
     * 消息推送目的：1：认证审核；2：发布审核；3：其他 ,. 
     */
    pushAim: string,
    title: string,
    /**
     * 消息类型：1->平台消息；2->系统通知：广播；3->系统通知：指定用户
     */
    type: number,
    /**
     * 用户Id，消息类型为系统通知：指定用户时必传
     */
    userId?: string
}

export const sendMessage = async (req, data: Data) => {

    const Authorization = req.headers['authorization']

    const { adminUserId } = await getUserId(Authorization)

    return axios({
        method: "post",
        url: `http://106.12.82.83:8080/api/v1/chongdu/message/${adminUserId}/add`,
        data: {
            content: data.content,
            pushAim: data.pushAim,
            title: data.title,
            type: data.type,
            userId: data.userId
        }
    }).then((res) => {
        return {
            success:res.data && res.data.code === 200
        }
    }).catch((err) => {
        console.log(err)
        return {
            success:false
        }
    })
}