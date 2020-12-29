import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./Style.css";
import { Layout, Menu, Space, Tag, Table } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  FireOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useReadCypher, useWriteCypher } from "use-neo4j";

const { Header, Sider, Content } = Layout;

const CustomLayout = styled(Layout)`
  height: 100vh;
`;

const CustomHeader = styled(Header)`
  border-bottom: 1px solid #f5f5f5;
`;

interface MainLayoutProps {
  pageHeader?: React.ReactNode | null;
  defaultContent?: React.ReactNode | null;
  customContentLayout?: React.ReactNode | null;
  contentRefProp?: React.RefObject<HTMLDivElement>;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  pageHeader,
  defaultContent,
  customContentLayout,
  contentRefProp,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPath("1");
    } else if (location.pathname === "/issues") {
      setCurrentPath("2");
    }
  }, [location]);

  return (
    <CustomLayout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[currentPath]}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => {
              history.push("/");
            }}
          >
            Users
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FireOutlined />}
            onClick={() => {
              history.push("/issues");
            }}
          >
            Issues
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <CustomHeader className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </CustomHeader>
        {pageHeader && pageHeader}
        {customContentLayout && customContentLayout}
      </Layout>
    </CustomLayout>
  );
};

export default MainLayout;
