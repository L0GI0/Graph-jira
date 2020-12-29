import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import "./Style.css";
import { Layout, Menu, Space, Tag, Table, PageHeader, Button } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useReadCypher, useWriteCypher, Neo4jContext } from "use-neo4j";
import MainLayout from "../common/MainLayout";

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

const data = [
  {
    key: "1",
    firstName: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Users: React.FC = () => {
  const history = useHistory();
  const { driver } = useContext(Neo4jContext);
  const { loading, records } = useReadCypher(`MATCH (m:User) RETURN m`);

  const deleteUser = (nick: any) => {
    console.log(`DELETING ${nick}`);

    const session = driver?.session();

    session
      ?.run(
        `MATCH (p:User) where p.nickName="${nick}"
      OPTIONAL MATCH (p)-[r]-() //drops p's relations
      DELETE r,p`
      )
      .then((res: any) => {
        console.log("User deleted successfully");
        window.location.reload(false);
      })
      .catch((e: Error) => {
        console.log(`ERROR ${e.message}`);
      });
  };

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Nick name",
      dataIndex: "nickName",
      key: "nickName",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (age: any) => {
        return age.toString();
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "nickName",
      dataIndex: "nickName",
      render: (nick: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              deleteUser(nick);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  if (!loading && records) {
    console.log(`Records = ${records[0]}`);
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const users = records?.map((row) => {
    const user = row.get("m"); // movie.identity.toNumber() movie.lables : string [], movie.properties = Record<string, any>
    console.log(`User: ${user.properties}`);
    return user.properties;
  });

  const SettingsPageHeader: React.FC = () => (
    <LightPageHeader
      title="Users"
      extra={
        <Button
          type="primary"
          onClick={() => {
            history.push("/newUser");
          }}
        >
          Add
          <PlusOutlined />
        </Button>
      }
    />
  );

  const usersTable = (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <Table columns={columns} dataSource={users} />
    </Content>
  );

  return (
    <MainLayout
      pageHeader={<SettingsPageHeader />}
      customContentLayout={usersTable}
    />
  );
};

export default Users;
