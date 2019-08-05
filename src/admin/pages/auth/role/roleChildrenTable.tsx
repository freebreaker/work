import * as React from 'react';
import { Table, Checkbox } from 'antd';

interface IRoleChildrenTableProps {
    tableName?: string,
    tableData: any[],
    roleGroupId: number,
    editData: (id: number | string, name:string,data: any) => void,
    editSelectData: (menus: any[]) => void
}

interface Detail {
    options: any[],
    allOptions: any[]
}

export class RoleChildrenTable extends React.Component<IRoleChildrenTableProps> {
    public state = {
        checkedList: [],
        indeterminate: false,
        checkAll: false,
        tableData:this.props.tableData
    };

    public componentWillReceiveProps(props:any){
        this.setState({
            tableData:props.tableData
        })
    }

    public onChange = (record:any,checkedList: any) => {

        const newTableData = this.state.tableData

        const checkedOptions = checkedList.map((item:number)=>{
            const checkedOption:any[] = record.details.allOptions.filter((Item:any)=>{
                return Item.id === item
            })
            return checkedOption[0]
        })

        newTableData.map((item)=>{
            if(item.key === record.key){
                item.details.options = checkedOptions
            }
        })

        this.props.editData(record.key,record.name,checkedList)

        this.setState({
            tableData:newTableData
        });
    };
    public onCheckAllChange = (record:any , e:any) => {

        const newTableData = this.state.tableData

        newTableData.map((item)=>{
            if(item.key === record.key){
                item.details.options = e.target.checked?item.details.allOptions:[]
                if(e.target.checked){
                    this.props.editData(record.key,record.name,item.details.allOptions.map((Item:any)=>Item.id))
                }else{
                    this.props.editData(record.key,record.name,[])
                }
            }
        })

        this.setState({
            tableData:newTableData
        });
    };
    public render() {
        const columns = [{
            title: '模块名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '全选',
            dataIndex: 'all',
            key: 'all',
            render: (details: Detail, record: any) => {
                if(this.state.tableData.length>0){
                    const target = this.state.tableData.find((item)=>item.key === record.key)
                    let status
                    let check = false
                    if(target.details.allOptions.length === target.details.options.length){
                        status = undefined
                        check = true
                    }else if(target.details.options.length === 0){
                        status = false
                    }else{
                        status = true
                    }
                    return (
                        <Checkbox
                            indeterminate={status}
                            onChange={this.onCheckAllChange.bind(this,record)}
                            checked={check}
                        />
                    )
                }
            }
        }, {
            title: '权限明细',
            dataIndex: 'details',
            key: 'details',
            render: (details: Detail, record: any) => {
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
                        <Checkbox.Group options={options} 
                        value={defalutOptions}
                        // defaultValue={defalutOptions}
                        onChange={this.onChange.bind(this,record)} />
                    </span>
                )
            },
        }];
        return (
            <div>
                <Table
                    columns={columns} dataSource={this.state.tableData}
                    locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                />
            </div>
        );
    }
}
