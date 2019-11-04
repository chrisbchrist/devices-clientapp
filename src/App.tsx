import React, {useState, useEffect, createContext, useCallback} from "react";
import "antd/dist/antd.min.css";
import "./App.css";
import {Layout, Menu, Modal, Avatar, Badge, Icon} from "antd";
import { DeviceForm } from "./components/DeviceForm";
import { openNotificationWithIcon } from "./util";
import axios from "axios";
import { Sidebar } from "./components/Sider";
import { DeviceGrid } from "./components/DeviceGrid";

const { Header, Content } = Layout;

const whyDidYouRender = require('@welldone-software/why-did-you-render');
whyDidYouRender(React);

//@ts-ignore
DeviceGrid.whyDidYouRender = true;

export interface Device {
  id: string;
  system_name: string;
  type: string & ("WINDOWS_WORKSTATION" | "WINDOWS_SERVER" | "MAC");
  hdd_capacity: string;
}

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const AppContext = createContext<any>({});

const App: React.FC = () => {
  const [siderCollapsed, setSiderCollapsed] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceToEdit, setDeviceToEdit] = useState<Device | null>(null);

  const toggleSiderCollapse = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);


  const launchEdit = useCallback((device?: Device) => {
    if (device) {
      setDeviceToEdit(device);
    } else {
      setDeviceToEdit(null);
    }
    setShowModal(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    apiClient
      .get("/devices")
      .then(res => {
        console.log(res.data);
        setDevices(res.data);
      })
      .catch(err => openNotificationWithIcon("error", "Fetch failed", "Oops!"));
  };

  const createDevice = async (device: Device) => {
    const { system_name, type, hdd_capacity } = device;

    return await apiClient.post("/devices", {
      system_name,
      type,
      hdd_capacity
    });
  };

  const removeDevice = async (id: string) => {
    return await apiClient.delete(`/devices/${id}`);
  };

  const updateDevice = async (updatedDevice: Device) => {
    const { id, ...rest } = updatedDevice;
    return await apiClient.put(`/devices/${id}`, { ...rest });
  };

  const context = {
    refetch: fetchData,
    createDevice,
    removeDevice,
    updateDevice
  };

  return (
    <Layout>
      <Layout hasSider={true}>
        <Sidebar
          collapsed={siderCollapsed}
          toggleCollapse={toggleSiderCollapse}
        />
        <Layout style={{ padding: 0 }}>
          <Header className="header">
            <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px" }}>
              <Menu.Item key="1"><Icon type="question-circle"/>Help</Menu.Item>
            </Menu>
            <div className="avatar-wrapper">
              <Badge count={1}>
                <Avatar shape="square" icon="user" size="large" />
              </Badge>
            </div>
          </Header>
          <div style={{ padding: "0 24px" }}>
            <Content
              style={{
                background: "#f0f2f5",
                padding: "24px 0",
                margin: 0,
                minHeight: 280,
              }}
            >
              <AppContext.Provider value={context}>
                <DeviceGrid
                  devices={devices}
                  launchEdit={launchEdit}
                />
                <Modal
                  width={500}
                  onCancel={toggleModal}
                  visible={showModal}
                  title={deviceToEdit ? "Edit Device" : "Add a Device"}
                  footer={null}
                >
                  <DeviceForm
                    closeModal={toggleModal}
                    deviceToEdit={deviceToEdit}
                  />
                </Modal>
              </AppContext.Provider>
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
