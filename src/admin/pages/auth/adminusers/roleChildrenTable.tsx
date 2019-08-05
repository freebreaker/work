import * as React from 'react';
import { Table, Checkbox } from 'antd';

interface IRoleChildrenTableProps {
    tableName?: string,
    tableData: any[],
    roleGroupId:number,
    editData:(id:number,data:any) => void
}

interface Detail {
    options:any[],
    allOptions:any[]
}

export class RoleChildrenTable extends React.Component<IRoleChildrenTableProps> {

    public render() {
        const columns = [{
            title: '模块名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '权限明细',
            dataIndex: 'details',
            key: 'details',
            render: (details: Detail,record:any) => {
                const options = details.allOptions.map((item, index) => {
                    return {
                        label: item.authName,
                        value: item.id,
                    }
                })

                const defalutOptions = details.options.map((item, index) => {
                    return item.id
                })
                return (
                    <span>
                        <Checkbox.Group options={options} defaultValue={defalutOptions} onChange={(value)=>this.props.editData(record.key,value)}/>
                    </span>
                )
            },
        }];
        return (
            <div>
                <Table columns={columns} dataSource={this.props.tableData}
                    locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                />
            </div>
        );
    }
}
