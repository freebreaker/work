import * as React from 'react';
import { Tag } from "antd";

interface IRelateTypeBoxProps {
    type: number
}

export class RelateTypeBox extends React.Component<IRelateTypeBoxProps> {

    public render() {
        const Boxes = [{
            color: "#108ee9",
            content: "宠物"
        }, {
            color: "#87d068",
            content: "商品"
        }, {
            color: "#f50",
            content: "服务"
        },]
        return (
            <div>
                <Tag color={Boxes[this.props.type].color}>{Boxes[this.props.type].content}</Tag>
            </div>
        );
    }
}
