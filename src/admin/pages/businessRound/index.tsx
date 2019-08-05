import * as React from 'react';
import { useEffect, useState } from 'react'
import {
    Breadcrumb, Form, Input, Cascader, Button,message ,Radio 
} from 'antd';
import { apiPublishBusinessArea, apiGetBusinessRound } from '../api';


interface IBusinessRoundProps {
    title?: string,
    form: {
        getFieldDecorator: any
        getFieldsError: any
        validateFieldsAndScroll: any
    }
}

const BreadTitle = (
    <Breadcrumb style={{ textAlign: "left", marginBottom: 25 }}>
        <Breadcrumb.Item>商圈管理</Breadcrumb.Item>
        <Breadcrumb.Item>
            <a href="">发布商圈</a>
        </Breadcrumb.Item>
    </Breadcrumb>
)

function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const BusinessRoundWrap = (props: IBusinessRoundProps) => {
    const [area, ] = useState("321001");
    const [round, setRound] = useState("")
    const [rounds,setRounds] = useState([{
        cityCode:"",
        cityName:""
    }])
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 4 },
    };

    const options = [
        {
            value: '321000',
            label: '扬州',
            children: [
                {
                    value: '321001',
                    label: '全市',
                },
                {
                    value: '321002',
                    label: '广陵区',
                },
                {
                    value: '321003',
                    label: '邗江区',
                },
                {
                    value: '321012',
                    label: '江都区',
                },
                {
                    value: '321023',
                    label: '宝应县',
                },
                {
                    value: '321081',
                    label: '仪征市',
                },
                {
                    value: '321084',
                    label: '高邮市',
                },
            ],
        },
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err: any, values: { businessArea :string[] }) => {
            const {businessArea} = values
            if (!err) {
                console.log('Received values of form: ', values);
                apiPublishBusinessArea(businessArea,round).then((res:any)=>{
                    if (res) {
                        message.success("发布成功")
                        setTimeout(() => {
                            window.location.reload()
                        }, 500);
                    } else {
                        message.error("发布失败")
                    }
                })
            }
        });
    };

    useEffect(() => {
        apiGetBusinessRound().then((res:any)=>{
            if(res){
                setRounds(res)
            }
        })
    },[]); 

    const roundsWrap =rounds.map((item:any,index:number)=>{
        return (
            <Radio.Button key={index} value={item.tradingAreaName}>{item.tradingAreaName}</Radio.Button>
        )
    })

    return (
        <div>
            {BreadTitle}
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item label="地区" hasFeedback={true}>
                    {props.form.getFieldDecorator('businessArea', {
                        initialValue: ["321000", area],
                        setFieldsValue: area,
                        rules: [{ required: true, message: '请输入商圈!' }],
                    })(
                        <Cascader
                            style={{ textAlign: "left" }}
                            options={options}
                            placeholder="请选择地区"/>
                    )}
                </Form.Item>
                <Form.Item label="商圈" hasFeedback={true}>
                    <Input required={true} placeholder="商圈" value={round} onChange={(e:any)=>setRound(e.target.value)}/>
                </Form.Item>
                <Form.Item label="已有商圈" 
                style={{
                    textAlign:"left"
                }}
                wrapperCol={{
                    span:12
                }}>
                <Radio.Group value={round} buttonStyle="solid" onChange={(e:any)=>setRound(e.target.value)}>
                    {
                        roundsWrap
                    }
                </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block={true} htmlType="submit"
                        className="login-form-button" style={{ marginLeft: "50%" }}
                        disabled={hasErrors(props.form.getFieldsError())}>
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const BusinessRound = Form.create({ name: 'validate_other' })(BusinessRoundWrap);

export default BusinessRound