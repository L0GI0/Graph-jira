import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import "./Style.css";
import {
  Layout,
  Menu,
  Space,
  Tag,
  Table,
  PageHeader,
  Button,
  Form,
  Select,
} from "antd";
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

const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
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

const Issues: React.FC = () => {
  const history = useHistory();
  const { driver } = useContext(Neo4jContext);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [selectedAsignee, selectAsignee] = useState(
    form.getFieldValue("asignee")
  );
  const { records } = useReadCypher(
    `MATCH (m:Issue)<-[:AUTHOR]-(author) RETURN {author: author.nickName, tags: author.tags, title: m.title, desc: m.desc} as issue`
  );
  const { records: users } = useReadCypher(`MATCH (m:User) RETURN m`);

  const { first, loading } = useReadCypher(
    `MATCH (m:Issue)<-[:ASIGNEE]-(asignee) RETURN asignee`
  );

  const currentAsignee = first?.get("asignee");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentAsignee) {
    console.log(`Current asignee : ${currentAsignee.properties.nickName}`);
  }

  console.log(`${records}`);
  //   `MATCH (m:Issue)<-[:AUTHOR]-(author) RETURN {author: author.nickName, title: m.title, desc: m.desc} as issue`;

  //   MATCH (wallstreet:Movie { title: 'Wall Street' })<-[:ACTED_IN]-(actor)
  //   RETURN actor.name

  const asignUser = (title: any) => {
    console.log(`DELETING ${title}`);
    form.validateFields().then((values) => {
      // do something with values
      console.log("ASIGNEE = " + values.asignee);
      const session = driver?.session();
      if (currentAsignee) {
        session
          ?.run(
            `MATCH (m:Issue { title: "${title}" })<-[r:ASIGNEE]-(a:User { nickName: "${currentAsignee?.properties.nickName}"}) DELETE r`
          )
          // MATCH (m:Issue)<-[:ASIGNEE]-(asignee) RETURN asignee
          .then((res: any) => {
            console.log("User unasigned successfully");
            window.location.reload(false);
          })
          .catch((e: Error) => {
            console.log(`ERROR ${e.message}`);
          });
      }
      const session2 = driver?.session();
      session2
        ?.run(
          `MATCH (a:User), (b:Issue)
          WHERE a.nickName = "${values.asignee}" AND b.title = "${title}"
          CREATE (a)-[r:ASIGNEE]->(b)
          RETURN r`
        )
        // MATCH (m:Issue)<-[:ASIGNEE]-(asignee) RETURN asignee
        .then((res: any) => {
          console.log("User asigned successfully");
          window.location.reload(false);
        })
        .catch((e: Error) => {
          console.log(`ERROR ${e.message}`);
        });
    });
  };

  const unasignUser = (title: any) => {
    form.validateFields().then((values) => {
      // do something with values
      console.log("ASIGNEE = " + values.asignee);
      const session = driver?.session();
      if (currentAsignee) {
        session
          ?.run(
            `MATCH (m:Issue { title: "${title}" })<-[r:ASIGNEE]-(a:User { nickName: "${currentAsignee?.properties.nickName}"}) DELETE r`
          )
          // MATCH (m:Issue)<-[:ASIGNEE]-(asignee) RETURN asignee
          .then((res: any) => {
            console.log("User unasigned successfully");
            window.location.reload(false);
          })
          .catch((e: Error) => {
            console.log(`ERROR ${e.message}`);
          });
      }
    });
  };

  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: any) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      render: (text: any) => text,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      width: "15%",
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
      title: "Assignee",
      dataIndex: "author",
      width: "15%",
      key: "author",
      render: (author: any) => {
        return (
          <Form
            form={form}
            initialValues={{
              asignee: currentAsignee?.properties.nickName || "None",
            }}
          >
            <Form.Item
              name="asignee"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please select related tags!",
              //     type: "array",
              //   },
              // ]}
            >
              <Select
                placeholder={"None"}
                onChange={() => selectAsignee(form.getFieldValue("asignee"))}
              >
                {users?.map((row) => {
                  const user = row.get("m");
                  return (
                    <Option
                      value={user.properties.nickName}
                      disabled={author === user.properties.nickName}
                    >
                      {user.properties.nickName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        );
      },
    },
    {
      title: "Action",
      key: "title",
      dataIndex: "title",
      width: "13%",
      render: (title: any) => (
        <Space size="middle">
          {form.getFieldValue("asignee") === "None" ? (
            <></>
          ) : currentAsignee?.properties.nickName !==
            form.getFieldValue("asignee") ? (
            <a onClick={() => asignUser(title)}>Assign</a>
          ) : (
            <a onClick={() => unasignUser(title)}>Unasign</a>
          )}
          <a>Close</a>
        </Space>
      ),
    },
  ];

  if (!loading && records) {
    console.log(`Records = ${records[0]}`);
  }

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  const issues = records?.map((row) => {
    const issue = row.get("issue"); // movie.identity.toNumber() movie.lables : string [], movie.properties = Record<string, any>
    console.log(`Issue: ${issue}`);
    return issue;
  });

  const SettingsPageHeader: React.FC = () => (
    <LightPageHeader
      title="Issues"
      //   extra={
      //     <Button
      //       type="primary"
      //       onClick={() => {
      //         history.push("/newUser");
      //       }}
      //     >
      //       Add New Issue
      //       <PlusOutlined />
      //     </Button>
      //   }
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
      <Table columns={columns} dataSource={issues} />
    </Content>
  );

  return (
    <MainLayout
      pageHeader={<SettingsPageHeader />}
      customContentLayout={usersTable}
    />
  );
};

export default Issues;
