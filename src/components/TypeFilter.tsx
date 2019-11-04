import React, {FunctionComponent} from 'react';
import {Dropdown, Icon, Menu} from "antd";

export const TypeFilter: FunctionComponent<any> = ({filter, onChange}) => {

    return (
        <Dropdown
            overlay={
                <Menu onClick={onChange}>
                    <Menu.Item key="All">All</Menu.Item>
                    <Menu.Item key="WINDOWS_WORKSTATION">
                        <Icon type="windows" /> Windows Workstation
                    </Menu.Item>
                    <Menu.Item key="WINDOWS_SERVER">
                        <Icon type="database" /> Windows Server
                    </Menu.Item>
                    <Menu.Item key="MAC">
                        <Icon type="apple" /> MacOS
                    </Menu.Item>
                </Menu>
            }
            trigger={["click"]}
        >
            <a className="ant-dropdown-link">
                <Icon type="eye" /> <strong>View:</strong> {filter.name}{" "}
                <Icon type="down" />
            </a>
        </Dropdown>
    )
}