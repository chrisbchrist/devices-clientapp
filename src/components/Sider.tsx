import React, {FunctionComponent} from 'react';
import {Icon, Layout, Menu} from "antd";

export const Sidebar: FunctionComponent<any> = ({ collapsed, toggleCollapse }) => {

    return (
        <Layout.Sider
            width={200}
            style={{ background: "#fff", minHeight: '100vh' }}
            collapsible
            collapsed={collapsed}
            onCollapse={toggleCollapse}
        >
            <div className="logo">
                <Icon className="logo__icon" type="laptop" /> { !collapsed ? <span className="logo-name">Deviceroo</span> : null}
            </div>
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0, background: '#263b4c' }}
            >
                <Menu.Item key="0">
                    <Icon type="home" />
                    <span>Home</span>
                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="mobile" />
                    <span>Devices</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="setting" />
                    <span>Settings</span>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
}