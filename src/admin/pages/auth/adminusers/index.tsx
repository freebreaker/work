import * as React from 'react';
import {
  Table, Button, Drawer, Input, message, Select, Checkbox, Modal, Radio
} from 'antd';
// import moment from 'moment';
import './index.less';
import axios from '../../../util/Axios';
import { RoleChildrenTable } from './roleChildrenTable';
import moment from 'moment'
import 'moment/locale/zh-cn';

import { apiAddAdminUsers, apiEditAdminUser } from '../../api';

moment.locale('zh-cn');

const { Option } = Select;

export default class AdminUsersPage extends React.Component<any, any> {

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
    editGroupModal: false,
    editGroupData: [],
    groupData: [],
    radioValue: "",
    adminId: 1,
    name: "",
    pwd: "",
    realName: "",
    phone: "",
    groupId: 1,
    editPasswordAndRealName: false,
    editId:0
  };

  public componentDidMount() {
    const That = this
    axios({
      method: "get",
      url: "/adminusers/list"
    }).then((res: any) => {
      if (res.length > 0) {
        const tableData = res.map((item: any, index: number) => {
          return {
            key: item.id,  // key 应带对应data id 
            name: item.name,
            realName: item.realName,
            phone: item.phone,
            createdAt: moment(item.createdAt).format('LLLL'),
            lastLoginAt: moment(item.lastLoginAt).format('LLLL'),
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
    this.setState({
      visible: true,
      editPasswordAndRealName: false,
      name: "",
      pwd: undefined,
      realName: "",
      phone: ""
    })
  }

  public addAdminUser = () => {
    // const { name, pwd, groupId } = this.state
    const { name, pwd, realName, phone, editPasswordAndRealName ,editId} = this.state
    // axios({
    //   method: "post",
    //   url: `/adminusers/add`,
    //   data: {
    //     name,
    //     pwd,
    //     groupId
    //   }
    // })

    if (name === "") {
      message.error("用户名不能为空！")
      return
    }

    if (pwd === "") {
      message.error("密码不能为空！")
      return
    }

    const P = editPasswordAndRealName ? apiEditAdminUser(editId,name, pwd, realName, phone) : apiAddAdminUsers(name, pwd, realName, phone)


    P.then((res: any) => {
      if (res) {
        message.success("操作成功")
        if(res.success){
          localStorage.setItem("token",res.token)
        }
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        message.error("操作失败")
      }
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
      console.log(res)
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

  public deleteRole = () => {

    const selectedRowKeys = this.state.selectedRowKeys

    axios({
      method: "post",
      url: "/adminusers/delete",
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


  public editSubmitRole = (id: number, data: number[]) => {

    const { submitMenu }: { submitMenu: any[] } = this.state

    const targetMenu = submitMenu.map((item) => {
      if (item.id === id) {
        return {
          id,
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
        ids: data,
      })
      this.setState({
        submitMenu: targetMenu
      })
    }



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
        console.log(res)
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

  public editGroup = (record: any) => {
    this.setState({
      visible: true,
      editId:parseInt(record.key,10),
      editPasswordAndRealName: true,
      name: record.name,
      pwd: record.pwd,
      realName: record.realName,
      phone: record.phone
    })
    // const That = this
    // axios({
    //   method: "get",
    //   url: `/role/list`
    // }).then((res) => {
    //   if (res) {
    //     That.setState({
    //       editGroupModal: true,
    //       editGroupData: res,
    //       adminId: record.key
    //     })
    //   }
    // })
  }

  public handleOk = () => {
    const { radioValue, adminId } = this.state
    axios({
      method: "post",
      url: `/adminusers/group`,
      data: {
        groupId: radioValue,
        "adminId": adminId
      }
    }).then((res) => {
      if (res) {
        message.success("操作成功")
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        message.error("操作失败")
      }
    })
  }

  public handleCancel = () => {
    this.setState({
      editGroupModal: false
    })
  }

  public radioChange = (e: any) => {
    console.log(e.target.value)
    this.setState({
      radioValue: e.target.value
    })
  }

  public addRadioChange = (e: any) => {
    this.setState({
      groupId: e.target.value
    })
  }

  public render() {

    const { selectedRowKeys, tableData, roleChildrenTableData, roleGroupId, menus, menusList } = this.state;

    let { filteredInfo }: any = this.state;

    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      }, {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '最后登陆时间',
        dataIndex: 'lastLoginAt',
        key: 'lastLoginAt',
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text: any, record: any) => {
          return (
            <span>
              <a onClick={this.editGroup.bind(this, record)} style={{ marginRight: 20 }}>编辑</a>
            </span>
          )
        }
      }
      // {
      //   title: '昵称',
      //   dataIndex: 'nickname',
      //   key: 'nickname',
      // },
      // {
      //   title: '用户类型',
      //   dataIndex: 'usertype',
      //   key: 'usertype',
      // }, {
      //   title: '绑定手机',
      //   dataIndex: 'phone',
      //   key: 'phone',
      // },
      // {
      //   title: 'IP',
      //   dataIndex: 'ip',
      //   key: 'ip',
      // },
      // {
      //   title: '注册时间',
      //   dataIndex: 'registertime',
      //   key: 'registertime',
      // },
      // {
      //   title: '最后登陆时间',
      //   dataIndex: 'lastlogintime',
      //   key: 'lastlogintime',
      // },
      // {
      //   title: '创建时间',
      //   dataIndex: 'createtime',
      //   key: 'createtime',
      // }, {
      //   title: '操作',
      //   dataIndex: 'operation',
      //   key: 'operation',
      //   render: (text: any, record: any) => {
      //     return (
      //       <span>
      //         <a href="javascript:;" onClick={this.editGroup.bind(this, record)} style={{ marginRight: 20 }}>改变角色</a>
      //       </span>
      //     )
      //   }
      // }
    ];

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

    const radios = this.state.editGroupData.map((item: any, index) => {
      return (
        <Radio.Button value={item.id} key={index}>{item.roleName}</Radio.Button>
      )
    })

    const addRadios = this.state.groupData.map((item: any, index) => {
      return (
        <Radio.Button value={item.id} key={index}>{item.roleName}</Radio.Button>
      )
    })

    return (
      <div>
        <div style={{ marginBottom: 16, textAlign: "left" }}>
          <Button type="primary" onClick={this.addRole.bind(this)} style={{ marginRight: 20 }}>
            添加
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
            width={500}
            title={this.state.editPasswordAndRealName ? "编辑用户" : "添加用户"}
            placement="right"
            closable={true}
            onClose={() => { this.setState({ visible: false, files: [] }) }}
            visible={this.state.visible}
          >
            <div>
              <span>设用户名：</span>
              <Input style={{ width: "70%" }}
                required={true} placeholder="请输入用户名"
                value={this.state.name}
                onChange={(e: any) => { this.setState({ name: e.target.value }) }} />
            </div>
            <div style={{ margin: "25px 0" }}>
              <span>登录密码：</span>
              <Input.Password style={{ width: "70%" }} required={true} placeholder="请输入密码" onChange={(e: any) => { this.setState({ pwd: e.target.value }) }} />
            </div>
            <div>
              <span>真实姓名：</span>
              <Input style={{ width: "70%" }} placeholder="请输入真实姓名"
                value={this.state.realName}
                onChange={(e: any) => { this.setState({ realName: e.target.value }) }} />
            </div>
            <div style={{ margin: "25px 0" }}>
              <span>设手机号：</span>
              <Input style={{ width: "70%" }} placeholder="请输入手机号"
                value={this.state.phone}
                onChange={(e: any) => { this.setState({ phone: e.target.value }) }} />
            </div>
            {/* <div>
              <span>设角色：</span>
              <Radio.Group defaultValue={1} buttonStyle="solid"
                onChange={this.addRadioChange.bind(this)}
              >
                {
                  addRadios
                }
              </Radio.Group>
            </div> */}

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
                this.addAdminUser()
              }}
                type="primary">
                确定
                </Button>
            </div>
          </Drawer>
        </div>
        <div>
          <Drawer
            width={800}
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
            <RoleChildrenTable tableData={roleChildrenTableData} roleGroupId={roleGroupId} editData={this.editSubmitRole.bind(this)} />
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
          <Modal
            title="选择角色"
            visible={this.state.editGroupModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <div>
              <Radio.Group defaultValue="a" buttonStyle="solid"
                onChange={this.radioChange.bind(this)}
              >
                {
                  radios
                }
              </Radio.Group>
            </div>
          </Modal>
        </div>
      </div >
    )
  }
}
