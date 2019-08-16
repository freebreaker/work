import * as React from 'react';
import { Tag } from "antd";

interface IAuditBoxProps {
    type: number
}

export class PositonBox extends React.Component<IAuditBoxProps> {

    public render() {
        const Boxes = [{
            color: "#108ee9",
            content: "banner"
        }, {
            color: "#87d068",
            content: "中间"
        }, {
            color: "#f50",
            content: "底部"
        },]
        return (
            <div>
                <Tag color={Boxes[this.props.type].color}>{Boxes[this.props.type].content}</Tag>
            </div>
        );
    }
}
