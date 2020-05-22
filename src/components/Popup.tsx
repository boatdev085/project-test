import React, { useState } from "react";
import { Button, Modal, Select, Form, Input } from "antd";
interface PopupProps {
  statePopup: {
    visible: boolean;
    status: string;
    form?: {
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      province: string | number;
      khet: string | number;
      khwang: string | number;
      zipcode: string | number;
    };
  };
  setPopup: Function;
  useProvince: any;
  fetchUserData: Function;
}
const Popup = ({
  statePopup,
  setPopup,
  useProvince,
  fetchUserData,
}: PopupProps) => {
  const [form] = Form.useForm();
  const [useLoad, setLoad] = useState(false);
  const confirmData = async () => {
    setLoad(true);
    if (statePopup.status === "insert") {
      const response = await fetch("/api/user/insert", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statePopup.form),
      }).then((res) => res.json());
      if (response === "success") {
        fetchUserData();
      }
    }
    if (statePopup.status === "edit") {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statePopup.form),
      }).then((res) => res.json());
      if (response === "success") {
        fetchUserData();
      }
    }
    setLoad(false);
    setPopup({
      form: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        province: "",
        khet: "",
        khwang: "",
        zipcode: "",
      },
      status: "insert",
      visible: false,
    });
  };
  const handleOnChange = (e: any) => {
    setPopup({
      ...statePopup,
      form: { ...statePopup.form, [e.target.id]: e.target.value },
    });
  };
  const handleOnChangeSelect = (value: string, id: string) => {
    setPopup({
      ...statePopup,
      form: { ...statePopup.form, [id]: value },
    });
  };
  const checkJoinData = (field: any, table: string) => {
    if (!useProvince || !useProvince[table]) return [];
    const filterData = useProvince[table].filter((f: any) => {
      return f[field] === statePopup.form?.province;
    });
    return filterData || [];
  };
  const findZipCode = () => {
    if (statePopup.form?.khwang) {
      const findData = useProvince.khwang.find(
        (f: any) => f.khwang_id === statePopup.form?.khwang
      );
      if (findData) {
        return findData.zipcode;
      }
    }
    return "";
  };
  return (
    <Form
      form={form}
      {...{
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }}
      layout={"horizontal"}
    >
      <Modal
        visible={statePopup.visible}
        title="Add user"
        // onOk={this.handleOk}
        onCancel={() => {
          if (!useLoad) {
            setPopup({ ...statePopup, visible: false });
          }
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              if (!useLoad) {
                setPopup({ ...statePopup, visible: false });
              }
            }}
          >
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={useLoad}
            onClick={confirmData}
          >
            add
          </Button>,
        ]}
      >
        <Form.Item label="Username">
          <Input
            id="username"
            placeholder="enter username"
            value={statePopup.form?.username || ""}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item label="first name">
          <Input
            id="firstName"
            placeholder="enter name"
            value={statePopup.form?.firstName || ""}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item label="last name">
          <Input
            id="lastName"
            placeholder="enter last name"
            value={statePopup.form?.lastName || ""}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item label="email">
          <Input
            id="email"
            placeholder="enter email"
            value={statePopup.form?.email || ""}
            onChange={handleOnChange}
          />
        </Form.Item>
        <label>address :</label>
        <Form.Item label="province">
          <Select
            id="province"
            value={statePopup.form?.province || ""}
            onChange={(e: any) => handleOnChangeSelect(e, "province")}
            placeholder="select province"
          >
            {useProvince &&
              useProvince.province &&
              useProvince.province.map((item: any) => {
                return (
                  <Select.Option
                    key={`province_${item.id}`}
                    value={item.province_id}
                  >
                    {item.province_name}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item label="khet">
          <Select
            id="khet"
            value={statePopup.form?.khet || ""}
            onChange={(e: any) => handleOnChangeSelect(e, "khet")}
            placeholder="select khet"
            disabled={
              checkJoinData("province_id", "khet").length === 0 ? true : false
            }
          >
            {checkJoinData("province_id", "khet").map((item: any) => {
              return (
                <Select.Option key={`khet_${item.id}`} value={item.khet_id}>
                  {item.khet_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="khwang">
          <Select
            id="khwang"
            value={statePopup.form?.khwang || ""}
            onChange={(e: any) => handleOnChangeSelect(e, "khwang")}
            placeholder="select khwang"
            disabled={
              checkJoinData("khet_id", "khwang").length === 0 ? true : false
            }
          >
            {checkJoinData("khet_id", "khwang").map((item: any) => {
              return (
                <Select.Option key={`khwang_${item.id}`} value={item.khwang_id}>
                  {item.khwang_name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="zip code">
          <Input
            id="zipcode"
            placeholder="enter zip code"
            onChange={handleOnChange}
            disabled={true}
            value={findZipCode()}
          />
        </Form.Item>
      </Modal>
    </Form>
  );
};
export default Popup;
