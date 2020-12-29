import React from "react";
import "./App.css";
import { useReadCypher, useWriteCypher } from "use-neo4j";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./common/MainLayout";
import {
  PageHeader,
  Tabs,
  Layout,
  Row,
  Col,
  Button,
  Tooltip,
  Space,
  Typography,
  Popover,
  Form,
  Input,
} from "antd";
import styled from "styled-components";
import Users from "./views/Users";
import NewUser from "./views/NewUser";
import Issues from "./views/Issues";

import {
  ArrowLeftOutlined,
  StarOutlined,
  DownloadOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  StarFilled,
  LoadingOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

const LightPageHeader = styled(PageHeader)`
  background-color: #fff;
`;

const WrappingDiv = styled.div`
  white-space: normal;
  max-width: 70vw;
`;

const SettingsPageHeader: React.FC = () => (
  <LightPageHeader
    title="Users"
    extra={
      <Button type="primary" onClick={() => console.log("clicked")}>
        Add
        <PlusOutlined />
      </Button>
    }
  />
);

function App() {
  // const { loading, error, first, records } = useReadCypher(
  //   "MATCH (n) RETURN count(n) AS count"
  // );
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  // const count = first?.get("count");
  // // const count = records[0]?.get("count"); // same as above
  // console.log("count = " + count);
  // return <div className="App">{`There are ${count} in the database`}</div>;
  return (
    <div className="app">
      <Router basename="/">
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/newUser" exact component={NewUser} />
          <Route path="/issues" exact component={Issues} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
