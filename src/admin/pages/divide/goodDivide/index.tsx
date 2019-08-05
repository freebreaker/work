import * as React from 'react';
import {
    Table, Button, Drawer, Radio, Cascader, Input, Icon, Upload, message, Modal, Checkbox
} from 'antd';
import { getPetTypeOptions } from '../../../util/petTypeOptions';
import './index.less';
import axios from '../../../util/Axios';
import { sendToQiniu, concatImageString } from '../../../util/sendToQiniu';
import moment from 'moment'

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;

const PopImage = (imgSrc: string) => (
    <img src={imgSrc} alt="" style={{ width: "100%" }} />
)

export default class GoodDivide extends React.Component<any, any> {

    public state = {
        files: [],
        updateId: 1, // edit id 要更新的id
        selectedRowKeys: [], // Check here to configure the default column
        selectedPetKeys: [],
        selectedPetTypeKeys: [],
        loading: false,
        filteredInfo: null,
        sortedInfo: "",
        visible: false,
        editVisible: false,
        value: 2,  // 默认选择的一级分类
        imageUrl: "",
        defaultProductName: "", // 编辑商品名字
        defalutSizeValue: 6, // 编辑商品体型
        editSizeVisible: false,  // 编辑商品体型选项是否显示
        tableData: [],
        resTableData: [],
        resPetTypeTableData: [],
        showImage: false,
        imageSrc: "",
        image: "",
        selectedPetOtherTypeKeys: [],
        pid: ""
    };


    public clearAll = () => {
        this.setState({
            files: [],
            updateId: 1, // edit id 要更新的id
            selectedRowKeys: [], // Check here to configure the default column
            selectedPetKeys: [],
            selectedPetTypeKeys: [],
            loading: false,
            filteredInfo: null,
            sortedInfo: "",
            visible: false,
            editVisible: false,
            value: 2,  // 默认选择的一级分类
            imageUrl: "",
            defaultProductName: "", // 编辑商品名字
            defalutSizeValue: 6, // 编辑商品体型
            editSizeVisible: false,  // 编辑商品体型选项是否显示
            showImage: false,
            imageSrc: "",
            image: "",
            selectedPetOtherTypeKeys: [],
            pid: ""
        })
    }

    public goodList = () => {
        const That = this
        axios({
            method: "get",
            url: "/good/list"
        }).then((res: any) => {
            if (res.goodList && res.goodList.length > 0) {
                const tableData = res.goodList.map((item: any, index: number) => {
                    let a = ''
                    for (const iterator of item.petTypeList) {
                        if (iterator) {
                            console.log(iterator.name)
                            a += ` ${iterator.name} `;
                        }
                    }
                    return {
                        key: item.id,  // key 应带对应data id 
                        name: item.name,
                        image: item.img ? item.img : "",
                        kinds: `${item.level}级分类`,
                        size: item.level === 3 ? res.goodList.filter((petItem: any) => petItem.id === item.pid)[0].name : "----",
                        status: item.status ? item.status : "----",
                        creatTime: item.ct ? moment(parseInt(item.ct, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        modifiedTime: item.mt ? moment(parseInt(item.mt, 10)).format('YYYY-MM-DD H:mm:ss') : "----",
                        petName: item.petTypeList.length > 0 ? a : "----",
                        operation: "",
                        pid: item.pid,
                        pettypeId: item.pettypeId
                    }
                })
                That.setState({
                    "tableData": tableData,
                    resTableData: res.goodList,
                    resPetTypeTableData: res.petTypeList
                })
            }
        })
    }

    public componentDidMount() {
        this.goodList()
    }

    public onSelectChange = (selectedRowKeys: any) => {
        this.setState({ selectedRowKeys });
    }

    public handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    public handleDelete = (key: any) => {
        console.log(key)
    }

    public addGoodType = () => {
        this.showDrawer()
    }

    public editGoodType = (record: any) => {
        console.log(record)
        this.setState({
            editVisible: true,
            editSizeVisible: record.size !== "----",
            defaultProductName: record.name,
            updateId: record.key,
            // defaultEdit
            value: record.kinds === "1级分类" ? 1 : 2,
            selectedPetTypeKeys: record.pid < 0 ? [] : [record.pettypeId.toString()],
            image: record.image,
            selectedPetKeys:[record.pid.toString()]
        })
    }

    public showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    public deleteGoodType = () => {
        
        const selectedRowKeys = this.state.selectedRowKeys

        axios({
            method: "post",
            url: "/good/delete",
            data: {
                ids: selectedRowKeys
            }
        }).then((res: any) => {
            if (res) {
                message.success("删除成功")
                this.goodList()
                this.clearAll()
            } else {
                message.error("删除失败")
            }
        })

    }

    public submitGoodType = () => {

        const That = this

        const { defaultProductName, selectedPetKeys, selectedPetTypeKeys, imageUrl, value, } = this.state

        const PID = selectedPetKeys[0] ? this.state.selectedPetKeys[0] : -1

        // const PETTYPEID = selectedPetTypeKeys[0] ? selectedPetTypeKeys[selectedPetTypeKeys.length - 1] : -1
        let PETTYPEID = ''

        selectedPetTypeKeys.forEach((item, index) => {
            if (index !== selectedPetTypeKeys.length - 1) {
                PETTYPEID += `${item},`
            } else {
                PETTYPEID += `${item}`
            }
        })

        axios({
            method: "post",
            url: "/good/add",
            data: {
                name: defaultProductName,
                pid: PID,
                pettypeId: PETTYPEID,
                img: imageUrl,
                level: value,
            }
        }).then((res: any) => {
            if (res) {
                message.success("添加成功")
                That.goodList()
                That.clearAll()
            } else {
                message.error("添加失败")
            }
        })
    }


    public editSubmitGoodType = () => {

        const { defaultProductName, imageUrl, updateId, value, selectedPetKeys, selectedPetTypeKeys, image } = this.state

        const PID = selectedPetKeys[0] ? parseInt(this.state.selectedPetKeys[0], 10) : -1

        let PETTYPEID = ''

        selectedPetTypeKeys.forEach((item, index) => {
            if (index !== selectedPetTypeKeys.length - 1) {
                PETTYPEID += `${item},`
            } else {
                PETTYPEID += `${item}`
            }
        })

        axios({
            method: "post",
            url: "/good/edit",
            data: {
                id: updateId,
                name: defaultProductName,
                image: imageUrl ? imageUrl : image,
                pid: PID,
                pettypeId: PETTYPEID,
                level: value,
            }
        }).then((res: any) => {
            if (res) {
                message.success("修改成功")
                this.goodList()
                this.clearAll()
            } else {
                message.error("修改失败")
            }
        })
    }

    public beforeUpload(file: any) {

        const FileList = this.state.files

        this.setState({
            files: [...FileList, file]
        })

        return false;
    }

    public handleUpload = ({ fileList, file }: { fileList: any, file: any }) => {

        const upToken = localStorage.getItem('uploadToken')  // 获得token

        if (upToken) {
            sendToQiniu(file, upToken,"ao") // 发送到七牛
        }

        const ImageString = concatImageString(fileList)


        this.setState({
            files: fileList,
            "imageUrl": ImageString,
        })

    }

    // public addCascader = () => {
    //     this.setState({
    //         selectedPetOtherTypeKeys:[1]
    //     })

    // }

    public render() {

        const { selectedRowKeys, editSizeVisible, defalutSizeValue, tableData, resPetTypeTableData, files,
            selectedPetTypeKeys, image, selectedPetKeys } = this.state;

        let { filteredInfo }: any = this.state;

        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '分类名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: (text: any, record: any) => {

                if (record.image !== "") {

                    const imageUrlList = record.image.split(',')

                    const images = imageUrlList.map((item: string, index: number) => (
                        <a href="javascript:void(0);" key={index} onClick={() => {
                            this.setState({
                                showImage: true,
                                imageSrc: item
                            })
                        }}>点击查看</a>
                    ))

                    return images

                } else {

                    return <span>暂无</span>

                }

            }
        }, {
            title: '商品种类',
            dataIndex: 'kinds',
            key: 'kinds',
            filters: [
                { text: '1级分类', value: '1' },
                { text: '2级分类', value: '2' },
            ],
            filteredValue: filteredInfo.kinds || null,
            onFilter: (Value: string, record: any) => record.kinds.toString().includes(Value),
        }, {
            title: '创建时间',
            dataIndex: 'creatTime',
            key: 'creatTime',
        }, {
            title: '最后修改时间',
            dataIndex: 'modifiedTime',
            key: 'modifiedTime',
        }, {
            title: '商品种类名称',
            dataIndex: 'petName',
            key: 'petName',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text: any, record: any) => {
                return (
                    <a href="javascript:;" onClick={this.editGoodType.bind(this, record)}>编辑</a>
                )
            }
        }];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const hasSelected = selectedRowKeys.length > 0;

        const Options = [
            { label: '主食', value: '1' },
            { label: '零食', value: '2' },
            { label: '保健', value: '3' },
            { label: '日用', value: '4' },
        ]

        const optplainOptions = [
            { label: '汪汪', value: '1' },
            { label: '喵喵', value: '2' },
            { label: '鸟', value: '3' },
            { label: '鱼', value: '4' },
            { label: '小宠物', value: '5' },
        ];

        const PetTypeOptions = getPetTypeOptions(resPetTypeTableData, 2)

        return (
            <div>
                <div style={{ marginBottom: 16, textAlign: "left" }}>
                    <Button type="primary" onClick={this.addGoodType.bind(this)} style={{ marginRight: 20 }}>
                        添加
                    </Button>
                    <Button type="danger" disabled={!hasSelected} onClick={() => {
                        this.deleteGoodType()
                    }}>
                        删除
                    </Button>

                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `选择了${selectedRowKeys.length}项` : ''}
                    </span>
                </div>
                <div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={tableData}
                        pagination={{ pageSize: 10 }}
                        onChange={this.handleChange}
                        locale={{ filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" }}
                    />
                </div>
                <div>
                    <Drawer
                        width={500}
                        title="添加商品类型"
                        placement="right"
                        closable={true}
                        onClose={() => { this.setState({ visible: false, files: [] }) }}
                        visible={this.state.visible}
                    >
                        <RadioGroup onChange={(e: any) => { this.setState({ value: e.target.value }) }} value={this.state.value}>
                            <Radio value={1}>根目录</Radio>
                            <Radio value={2}>商品种类</Radio>
                        </RadioGroup>
                        <div style={{ margin: "20px 0" }}>
                            {this.state.value === 2 ? <span>商品层级：</span> : ""}
                            {this.state.value === 2 ?
                                <Cascader style={{ width: "70%" }} 
                                options={Options} 
                                onChange={(val: any) => this.setState({ selectedPetKeys: val })} 
                                placeholder="选择上一层级" />
                                : ""}
                        </div>
                        <div>
                            <span>商品分类：</span>
                            <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => { this.setState({ defaultProductName: e.target.value }) }} />
                        </div>
                        {
                            this.state.value === 2 ?
                                <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
                                    <span>宠物种类：</span>
                                    <Checkbox.Group options={optplainOptions} value={selectedPetTypeKeys} onChange={(v: any) => this.setState({ selectedPetTypeKeys: v })} />
                                    <Cascader style={{ width: "70%", display: "none" }}
                                        options={PetTypeOptions}
                                        onChange={(val: any) => this.setState({ selectedPetTypeKeys: val })}
                                        changeOnSelect={true}
                                        placeholder="选择宠物种类" />
                                </div> : ""
                        }

                        {/* {
                            CascaderWrap
                        } */}

                        <div className="Box">
                            <span>商品图片：</span>

                            <Dragger className="Dragger"
                                fileList={files}
                                beforeUpload={this.beforeUpload.bind(this)}
                                onChange={this.handleUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                            </Dragger>
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={() => {
                                this.setState({ visible: true })
                                this.submitGoodType()
                            }}
                                type="primary">
                                确定
                            </Button>
                        </div>
                    </Drawer>
                </div>
                <div>
                    <Drawer
                        width={500}
                        title="编辑商品类型"
                        placement="right"
                        closable={true}
                        onClose={this.clearAll}
                        visible={this.state.editVisible}
                    >
                        <RadioGroup onChange={(e: any) => { this.setState({ value: e.target.value }) }} value={this.state.value}>
                            <Radio value={1}>根目录</Radio>
                            <Radio value={2}>商品种类</Radio>
                        </RadioGroup>
                        <div style={{ margin: "20px 0" }}>
                            {this.state.value === 2 ? <span>商品层级：</span> : ""}
                            {this.state.value === 2 ?
                                <Cascader style={{ width: "70%" }}
                                    value={selectedPetKeys}
                                    options={Options}
                                    onChange={(val: any) => this.setState({ selectedPetKeys: val })}
                                    placeholder="选择上一层级" />
                                : ""}
                        </div>
                        <div>
                            <span>商品分类：</span>
                            <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => { this.setState({ defaultProductName: e.target.value }) }}
                                defaultValue={this.state.defaultProductName}
                                value={this.state.defaultProductName}
                            />
                        </div>
                        {
                            this.state.value === 2 ?
                                <div style={{ margin: "20px 0", display: "flex", alignItems: "center" }}>
                                    <span>宠物种类：</span>
                                    <Checkbox.Group options={optplainOptions} value={selectedPetTypeKeys} onChange={(v: any) => this.setState({ selectedPetTypeKeys: v })} />
                                    <Cascader style={{ width: "70%", display: "none" }}
                                        options={PetTypeOptions}
                                        onChange={(val: any) => this.setState({ selectedPetTypeKeys: val })}
                                        changeOnSelect={true}
                                        placeholder="选择宠物种类" />
                                </div> : ""
                        }

                        <div className="Box">
                            <span>商品图片：</span>
                            <Dragger className="Dragger"
                                fileList={files}
                                beforeUpload={this.beforeUpload.bind(this)}
                                onChange={this.handleUpload}
                            >
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-hint">点击或拖拽图片至此处</p>
                            </Dragger>
                        </div>
                        {
                            image ?
                                <div>
                                    <img src={image} alt=""
                                        style={{ width: "70%", marginLeft: "16%" }} />
                                </div> : ""
                        }

                        {
                            editSizeVisible ?
                                <div>
                                    <span>体型：</span>
                                    <RadioGroup onChange={(e: any) => { this.setState({ defalutSizeValue: e.target.value }) }} value={defalutSizeValue}>
                                        <Radio value={6}>大型犬</Radio>
                                        <Radio value={7}>中型犬</Radio>
                                        <Radio value={8}>小型犬</Radio>
                                    </RadioGroup>
                                </div> : ""
                        }
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={() => { this.setState({ editVisible: false }) }} style={{ marginRight: 8 }}>
                                取消
                            </Button>
                            <Button onClick={() => {
                                this.editSubmitGoodType()
                            }}
                                type="primary">
                                确认
                            </Button>
                        </div>
                    </Drawer>
                    <Modal
                        visible={this.state.showImage}
                        onCancel={() => this.setState({ showImage: false })}
                        footer={null}
                    >
                        {PopImage(this.state.imageSrc)}
                    </Modal>
                </div>
            </div >
        )
    }
}
