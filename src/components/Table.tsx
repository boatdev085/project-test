import React from "react";
import { Table, Button } from "antd";
interface TableUserProps {
  useUsers: any;
  setUsers: Function;
  setPopup: any;
}
const TableUser = ({ useUsers, setUsers, setPopup }: TableUserProps) => {
  const handleDeleteData = async (id: string) => {
    const response = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    if (response === "success") {
      setUsers(useUsers.filter((f: any) => f.user_id !== id));
    }
  };
  const handleEditData = async (item: any) => {
    setPopup({ visible: true, status: "edit", form: { ...item } });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      width: "10%",
      //   ...this.getColumnSearchProps('name'),
    },
    {
      title: "firstname",
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      //   ...this.getColumnSearchProps('age'),
    },
    {
      title: "lastname",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",

      //   ...this.getColumnSearchProps('address'),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: "10%",

      //   ...this.getColumnSearchProps('address'),
    },
    {
      title: "province",
      dataIndex: "province",
      key: "province",
      width: "10%",

      //   ...this.getColumnSearchProps('address'),
    },
    {
      title: "khet",
      dataIndex: "khet",
      key: "khet",
      width: "10%",

      //   ...this.getColumnSearchProps('address'),
    },
    {
      title: "khwang",
      dataIndex: "khwang",
      key: "khwang",
      width: "10%",

      //   ...this.getColumnSearchProps('address'),
    },
    {
      title: "zipcode",
      dataIndex: "zipcode",
      key: "zipcode",
      width: "10%",

      //   ...this.getColumnSearchProps('address'),
    },
    {
      title: "Action",
      key: "operation",
      render: (item: any) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "16px;" }}
            onClick={() => handleEditData(item)}
          >
            Edit
          </Button>
          <Button
            type="ghost"
            onClick={() => handleDeleteData(item.user_id || "")}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  return <Table columns={columns} dataSource={useUsers} />;
};
export default TableUser;
