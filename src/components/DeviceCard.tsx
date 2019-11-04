import React, {FunctionComponent, useCallback, useContext} from "react";
import {Card, Icon, Popconfirm, Menu, Dropdown} from "antd";
import { Device } from "../App";
import { AppContext } from "../App";
import {openNotificationWithIcon} from "../util";

interface DeviceCardProps {
  device: Device;
  launchEdit: (device?: Device) => void;
}

const WindowsLogo = () => (<svg viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg" version="1.1" height="40" width="40">
    <path style={{ fill: '#f8682c'}} d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313z"/>
    <path style={{ fill: '#91c300'}} d="m39.996,6.9059,47.318-6.906,0,41.527-47.318,0.37565z"/>
    <path style={{ fill: '#00b4f1'}} d="m35.67,45.931,0.0277,34.453-35.67-4.9041-0.002-29.78z"/>
    <path style={{ fill: '#ffc300'}} d="m87.326,46.255-0.0111,41.34-47.318-6.6784-0.0663-34.739z"/>
</svg>);

export const osDictionary = {
  WINDOWS_WORKSTATION: {
    icon: {
        component: WindowsLogo
    },
    color: "#ce2043",
    displayName: "Windows Workstation"
  },
  WINDOWS_SERVER: {
    icon: {
        type: "windows"
    },
    color: "#1890ff",
    displayName: "Windows Server"
  },
  MAC: {
    icon: {
        type: "apple",
        style: {
            color: "#888",
        }
    },
    displayName: "macOS"
  }
};

// Mock options
const menu = (
    <Menu>
        <Menu.Item key="1">
            <Icon type="lock" />
            {" "} More actions 1
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="eye" />
            {" "} More actions 2
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="user" />
            {" "} More actions 3
        </Menu.Item>
    </Menu>
);

const DeviceCardFC: FunctionComponent<DeviceCardProps> = ({ device, launchEdit }) => {

    const memoizedEdit = useCallback(() => launchEdit(device), [launchEdit, device]);

    const ctx = useContext(AppContext);

    const del = () => {
        const { removeDevice, refetch } = ctx;
        removeDevice(device.id)
            .then((res: any) => {
                console.log(res);
                refetch();
            })
            .catch((err: any) => {
                openNotificationWithIcon("error", "Operation failed", "Oops!")
            })
    };

  return (
    <Card
      style={{ width: 300 }}
      title={<span className="device-name">{device.system_name}</span>}
      actions={[
        <Popconfirm
          title="Permanently delete this device?"
          onConfirm={del}
          onCancel={() => console.log("Canceled")}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="delete" key="setting" />
        </Popconfirm>,
        <Icon type="edit" key="edit" onClick={memoizedEdit}/>,
          <Dropdown overlay={menu}><Icon type="ellipsis" key="ellipsis" /></Dropdown>
      ]}
    >
      <Card.Meta
        avatar={
          <Icon
              {... osDictionary[device.type].icon}
            theme="filled"
            className="card__icon"
          />
        }
        title={
          <h4 className="card__os">{osDictionary[device.type].displayName}</h4>
        }
        description={
          <span className="card__hdd">
            <Icon
              style={{ opacity: 0.6, marginRight: 5 }}
              type="hdd"
              theme="filled"
            />{" "}
            {parseInt(device.hdd_capacity).toLocaleString() + " GB"}
          </span>
        }
      />
    </Card>
  );
};

export const DeviceCard = React.memo(DeviceCardFC);
