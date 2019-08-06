import * as React from 'react';
import { Tag } from "antd";

interface IAuditBoxProps {
    type: number
}

export class AuditBox extends React.Component<IAuditBoxProps> {

    public render() {
        const Boxes = [{
            color: "#108ee9",
            content: "待审核"
        }, {
            color: "#87d068",
            content: "审核通过"
        }, {
            color: "#f50",
            content: "审核驳回"
        },{
            color: "#2db7f5",
            content: "已下架"
        }]
        return (
            <div>
                <Tag color={Boxes[this.props.type].color}>{Boxes[this.props.type].content}</Tag>
            </div>
        );
    }
}
