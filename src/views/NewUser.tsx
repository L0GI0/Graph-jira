import "antd/dist/antd.css";
import "./Style.css";
import { useHistory, useLocation } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useReadCypher, useWriteCypher, Neo4jContext } from "use-neo4j";
import MainLayout from "../common/MainLayout";

import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Layout,
  Menu,
  Space,
  Tag,
  Table,
  PageHeader,
  InputNumber,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const FormContainter = styled.div`
  /* align-items: center; */
  padding-top: 10vh;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: flex;
`;

const NewUserForm: React.FC = () => {
  const { driver } = useContext(Neo4jContext);
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log(values);

    const tagsString = values.user.tags.map((tag: any) => {
      return `"${tag}"`;
    });

    const session = driver?.session();
    console.log(
      `COMMAND: CREATE (m:User
        firstName: ${values.user.firstName},
        lastName: ${values.user.lastName},
        nickName: ${values.user.nickName},
        age: ${values.user.age},
        address: ${values.user.address},
        tags: ${tagsString})
        RETURN m`
    );
    session
      ?.run(
        `CREATE (m:User
        {firstName: "${values.user.firstName}",
        lastName: "${values.user.lastName}",
        nickName: "${values.user.nickName}",
        age: "${values.user.age}",
        address: "${values.user.address}",
        tags: [${tagsString}]})
        RETURN m`
      )
      .then((res: any) => {
        console.log("User added successfully");
        history.push("/");
      })
      .catch((e: Error) => {
        console.log(`ERROR ${e.message}`);
      });
  };

  // CREATE (m:User {firstName: 'John', lastName: "Brown"
  // nickName: "Mortify", age: 24,
  // address: ['New York No. 1 Lake Park'],tags: ["Python", "developer", "ML"]}) RETURN m
  const { Option } = Select;
  return (
    <FormContainter>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "firstName"]}
          label="First name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "lastName"]}
          label="Last name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "nickName"]}
          label="Nick name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[
            {
              type: "number",
              min: 0,
              max: 99,
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={["user", "address"]}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "tags"]}
          label="Tags"
          rules={[
            {
              required: true,
              message: "Please select related tags!",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Related labels">
            <Option value="Developer">Developer</Option>
            <Option value="Python">Python</Option>
            <Option value="React">React</Option>
            <Option value="C++">C++</Option>
            <Option value="JS">JS</Option>
            <Option value="Scala">Scala</Option>
          </Select>
        </Form.Item>
        {/* <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item> */}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </FormContainter>
  );
};

const { Header, Sider, Content } = Layout;

const CustomLayout = styled(Layout)`
  height: 100vh;
`;

const CustomHeader = styled(Header)`
  border-bottom: 1px solid #f5f5f5;
`;

const LightPageHeader = styled(PageHeader)`
  background-color: #fff;
`;

const NewUser: React.FC = () => {
  const history = useHistory();

  const { loading, records } = useReadCypher(`MATCH (m:User) RETURN m`);

  const SettingsPageHeader: React.FC = () => (
    <LightPageHeader
      title="New User"
      extra={
        <Button danger type="primary" onClick={() => history.push("/")}>
          Cancel
          <DeleteOutlined />
        </Button>
      }
    />
  );

  return (
    <MainLayout
      pageHeader={<SettingsPageHeader />}
      customContentLayout={<NewUserForm />}
    />
  );
};

export default NewUser;
