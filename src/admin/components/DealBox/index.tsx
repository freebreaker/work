import * as React from 'react';
import { Tag } from "antd";

interface IAuditBoxProps {
    type: number
    onClick?:()=>void
}

export class DealBox extends React.Component<IAuditBoxProps> {

    public render() {
        const Boxes = [{
            color: "#108ee9",
            content: "未处理"
        }, {
            color: "#87d068",
            content: "已处理"
        }]
        return (
            <div>
                <Tag color={Boxes[this.props.type].color}>{Boxes[this.props.type].content}</Tag>
            </div>
        );
    }
}
