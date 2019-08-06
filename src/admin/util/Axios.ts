import { Modal } from 'antd';
import axios from 'axios';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        console.log(token)
        if (token) {
            config.headers.Authorization = token;
        }
        return config
    },
    (error) => {
        return Promise.reject
    }
)

axios.interceptors.response.use(
    (res: any) => {
        if (res.data.status === 409) {  // 超时
            window.localStorage.clear()
            Modal.warning({
                title:res.data.msg,
                onOk:()=>window.location.href = "/"
            })
        }
        if (res.data.status === 401 && !res.data.success) {  // 没有权限
            Modal.warning({
                title:res.data.msg,
            })
            res.data = null
            return
        }
        if (res.data.status === 500 && !res.data.success) {  // 服务器出错
            Modal.warning({
                title:res.data.msg,
            })
            res.data = null
            return
        }
        return res.data
    },
    (error) => {
        return Promise.reject
    }
)


export default axios;
