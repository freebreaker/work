import * as React from 'react';
import {
  Table, Button, Drawer, Input, message, Select, Checkbox
} from 'antd';
// import moment from 'moment';
import './index.less';
import axios from '../../../util/Axios';
import { RoleChildrenTable } from './roleChildrenTable';
const { Option } = Select;
const { TextArea } = Input;
export default class RolePage extends React.Component<any, any> {

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
    apiVisible: false,
    api:"",
    apiChildren:"",
    apiChildrenName:"",
    apiName:"",
    editVisible: false,
    addVisible: false,
    value: 2,  // 默认选择的一级分类
    imageUrl: "",
    defaultRoleName: "", // 编辑商品名字
    defalutSizeValue: 6, // 编辑商品体型
    editSizeVisible: false,  // 编辑商品体型选项是否显示
    tableData: [],
    resTableData: [],
    resRoleTableData: [],
    showImage: false,
    imageSrc: "",
    roleChildrenTableData: [],
    roleGroupId: 1,
    submitMenu: [],
    menus: [],
    menuName: "",
    menuUrl: "",
    menuAddMenuChildren: [],
    menusList: [],
  };

  public componentDidMount() {
    const That = this
    axios({
      method: "get",
      url: "/role/list"
    }).then((res: any) => {
      if (res.length > 0) {
        const tableData = res.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            name: item.roleName,
          }
        })
        That.setState({
          "tableData": tableData,
          resTableData: res,
          resRoleTableData: res

        })
      }
    })
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

  public addRole = () => {
    const That = this
    this.showDrawer()
    axios({
      method: "get",
      url: "/role/allmenus"
    }).then((res: any) => {
      const roleChildrenTableData = []
      if (res) {
        const object = res
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const item = object[key];
            roleChildrenTableData.push({
              "key": key,
              name: item.menuName,
              details: {
                options: [],
                allOptions: item.allMenuChildren
              },
              menuChildrenIds: ""
            })
          }
        }
        That.setState({
          "roleChildrenTableData": roleChildrenTableData
        })
      }
    })
  }


  public addApi = () => {
    // const That = this
    this.setState({
      apiVisible: true
    })
  }

  public setChildrenApis = (value:string)=>{
    this.setState({
      apiChildren:value
    })
  }

  public setChildrenApiNames = (value:string)=>{
    this.setState({
      apiChildrenName:value
    })
  }

  public addMenu = (record: any) => {
    const That = this
    axios({
      method: "get",
      url: `/menu/list?roleGroupId=${record.key}`
    }).then((res: any) => {
      if (res) {
        That.setState({
          addVisible: true,
          menus: res,
          roleGroupId: record.key,
        })
      }
    })
  }

  public editRole = (record: any) => {
    const That = this
    axios({
      method: "get",
      url: `/role/menus?id=${record.key}`,
    }).then((res: any) => {
      if (res) {
        const roleChildrenTableData = res.map((item: any, index: number) => {
          return {
            key: item.id,
            name: item.menuName,
            details: {
              options: item.menuChildren,
              allOptions: item.allMenuChildren
            },
            menuChildrenIds: item.menuIds
          }
        })
        That.setState({
          editVisible: true,
          defaultRoleName: record.name,
          roleGroupId: record.key,
          "roleChildrenTableData": roleChildrenTableData
        })
      }
    })


  }

  public showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  public deleteRole = () => {

    const selectedRowKeys = this.state.selectedRowKeys

    axios({
      method: "post",
      url: "/role/delete",
      data: {
        ids: selectedRowKeys
      }
    }).then((res: any) => {
      if (res) {
        message.success("删除成功")
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        message.error("删除失败")
      }
    })

  }


  public editSubmitRole = (id: number | string, name: string, data: number[]) => {
    console.log(id, name, data)
    const { submitMenu }: { submitMenu: any[] } = this.state

    const targetMenu = submitMenu.map((item) => {
      if (item.id === id) {
        return {
          id,
          name,
          ids: data
        }
      } else {
        return item
      }
    })

    const target = submitMenu.find((item) => {
      return item.id === id
    })

    if (target) {
      this.setState({
        submitMenu: targetMenu
      })
    } else {
      targetMenu.push({
        "id": id,
        name,
        ids: data,
      })
      this.setState({
        submitMenu: targetMenu
      })
    }
  }

  public editSubmitMenus = (menus: any[]) => {

    const data: any[] = this.state.roleChildrenTableData

    menus.map((item: string) => {
      data.map((Item: any, index: number) => {
        if (item === Item.key) {
          data[index].details.options = data[index].details.allOptions
        } else {
          return
        }
      })
    })

    this.setState({
      roleChildrenTableData: data
    })

  }

  public submitRole = () => {
    axios({
      method: "post",
      url: "/role/edit",
      data: {
        editArr: this.state.submitMenu
      }
    }).then((res: any) => {
      if (res) {
        message.success("修改成功")
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        message.error("修改失败")
      }
    })
  }

  public onMenuSelectChange = (value: string, option: any) => {
    axios({
      method: "get",
      url: `/menu/path?name=${value}`,
    }).then((res: any) => {
      if (res) {
        this.setState({
          menusList: res,
          menuUrl: value,
          menuName: option.props.children
        })
      }
    })
  }


  public onCheckboxSelectChange = (value: any[]) => {
    this.setState({
      menuAddMenuChildren: value
    })
  }

  /**
   * 添加菜单权限
   */
  public sumitAddMenu = () => {
    const { menuName, roleGroupId, menuUrl, menuAddMenuChildren } = this.state
    axios({
      method: "post",
      url: "/menu/add",
      data: {
        "roleGroupId": roleGroupId,
        "menuName": menuName,
        "menuUrl": menuUrl,
        "menuAddMenuChildren": menuAddMenuChildren
      }
    }).then((res: any) => {
      if (res) {
        message.success("添加成功")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        message.error("添加失败")
      }
    })
  }

  /**
   * 添加角api
   */
  public submitAddRole = () => {
    console.log(this.state)
    axios({
      method: "post",
      url: `/role/add`,
      data: {
        name: this.state.defaultRoleName,
        editArr: this.state.submitMenu
      }
    }).then((res) => {
      if (res) {
        message.success("添加成功")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        message.error("添加失败")
      }
    })
  }

  public submitAddApi = () => {
    const apiList = this.state.apiChildren.split(',')
    const apiChildrenNameList = this.state.apiChildrenName.split(',')
    axios({
      method:"post",
      url:"/menu/addApiAndChildren",
      data:{
        api:this.state.api,
        apiName:this.state.apiName,
        apiChildren:apiList,
        apiChildrenName:apiChildrenNameList,
      }
    }).then((res) => {
      if (res) {
        message.success("添加成功")
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      } else {
        message.error("添加失败")
      }
    })
  }
  public render() {

    const { selectedRowKeys, tableData, roleChildrenTableData, roleGroupId, menus, menusList } = this.state;

    let { filteredInfo }: any = this.state;

    filteredInfo = filteredInfo || {};

    const columns = [{
      title: '角色名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: any, record: any) => {
        return (
          <span>
            <a href="javascript:;" onClick={this.editRole.bind(this, record)} style={{ marginRight: 20 }}>查看子菜单权限</a>
            <a href="javascript:;" onClick={this.addMenu.bind(this, record)}>添加菜单权限</a>
          </span>
        )
      }
    }];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    const hasSelected = selectedRowKeys.length > 0;

    const selectOptions = menus.map((item: any, index: number) => {
      return (
        <Option value={item.path} key={index}>{item.name}</Option>
      )
    })

    const checkboxOptions = menusList.map((item: any, index) => {
      return {
        label: item.authName,
        value: item.id,
      }
    })

    return (
      <div>
        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <Button type="primary" onClick={this.addRole.bind(this)} style={{ marginRight: 20 }}>
            添加
          </Button>
          <Button type="primary" onClick={this.addApi.bind(this)} style={{ marginRight: 20 }}>
            添加api
          </Button>
          <Button type="danger" disabled={!hasSelected} onClick={() => {
            this.deleteRole()
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
            width={1000}
            title="添加角色"
            placement="right"
            closable={true}
            onClose={() => { this.setState({ visible: false, files: [] }) }}
            visible={this.state.visible}
          >
            <div style={{ marginBottom: 25 }}>
              <span>角色：</span>
              <Input style={{ width: "70%" }} placeholder="请输入角色名" onChange={(e: any) => { this.setState({ defaultRoleName: e.target.value }) }} />
            </div>
            <RoleChildrenTable tableData={roleChildrenTableData} roleGroupId={roleGroupId}
              editData={this.editSubmitRole.bind(this)}
              editSelectData={this.editSubmitMenus.bind(this)} />
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
                this.submitAddRole()
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
            title="添加api"
            placement="right"
            closable={true}
            onClose={() => { this.setState({ apiVisible: false, files: [] }) }}
            visible={this.state.apiVisible}
          >
            <div style={{ marginBottom: 25 }}>
              <span>菜单api：</span>
              <Input style={{ width: "70%" }} placeholder="请输入api" onChange={(e: any) => { this.setState({ api: e.target.value }) }} />
            </div>
            <div style={{ marginBottom: 25 }}>
              <span>api名字：</span>
              <Input style={{ width: "70%" }} placeholder="请输入api对应的菜单名 比如：用户管理" onChange={(e: any) => { this.setState({ apiName: e.target.value }) }} />
            </div>
            <TextArea
              style={{
                margin: "10px 0"
              }}
              placeholder="list,add,edit (必填)"
              rows={3} onChange={(e: any) => {
                this.setChildrenApis(e.target.value)
              }} />
                          <TextArea
              style={{
                margin: "10px 0"
              }}
              placeholder="圈子列表,添加圈子,编辑圈子 (必填)"
              rows={3} onChange={(e: any) => {
                this.setChildrenApiNames(e.target.value)
              }} />
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
              <Button onClick={() => { this.setState({ apiVisible: false }) }} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={() => {
                this.setState({ apiVisible: true })
                this.submitAddApi()
              }}
                type="primary">
                确定
                </Button>
            </div>
          </Drawer>
        </div>
        <div>
          <Drawer
            width={1000}
            title="编辑用户权限"
            placement="right"
            closable={true}
            onClose={() => {
              this.setState({ editVisible: false, files: [] })
            }}
            visible={this.state.editVisible}
          >
            <div style={{ marginBottom: 25 }}>
              <span>角色名：</span>
              <Input style={{ width: "70%" }} placeholder="请输入分类名" onChange={(e: any) => { this.setState({ defaultRoleName: e.target.value }) }}
                defaultValue={this.state.defaultRoleName}
                value={this.state.defaultRoleName}
              />
            </div>
            <RoleChildrenTable tableData={roleChildrenTableData} roleGroupId={roleGroupId} editData={this.editSubmitRole.bind(this)}
              editSelectData={this.editSubmitMenus.bind(this)} />
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
                this.submitRole()
              }}
                type="primary">
                确认
            </Button>
            </div>
          </Drawer>
          <Drawer
            width={500}
            title="添加菜单权限"
            placement="right"
            closable={true}
            onClose={() => {
              this.setState({ addVisible: false, })
            }}
            visible={this.state.addVisible}
          >
            <div style={{ marginBottom: 25 }}>
              <span>菜单名：</span>
              <Select style={{ width: 320 }} onChange={this.onMenuSelectChange.bind(this)}>
                {selectOptions}
              </Select>
            </div>
            <div style={{ marginTop: 25 }}>
              <span style={{ marginRight: 8 }}>子菜单: </span>
              {
                checkboxOptions.length > 0 ?
                  <Checkbox.Group options={checkboxOptions} onChange={this.onCheckboxSelectChange.bind(this)} style={{
                    display: "block",
                    marginTop: 16
                  }} />
                  :
                  <span>请先选择菜单</span>
              }
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
              <Button onClick={() => { this.setState({ addVisible: false }) }} style={{ marginRight: 8 }}>
                取消
              </Button>
              <Button onClick={this.sumitAddMenu.bind(this)}
                type="primary">
                确认
            </Button>
            </div>
          </Drawer>
        </div>
      </div >
    )
  }
}
