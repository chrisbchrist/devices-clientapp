import React, {FunctionComponent} from 'react';
import {Dropdown, Icon, Menu} from "antd";

export const SortDropdown: FunctionComponent<any> = ({ sortBy, onChange }) => {

    return (
        <Dropdown
            overlay={
                <Menu onClick={onChange}>
                    <Menu.Item key="All">None</Menu.Item>
                    <Menu.Item key="system_name">
                        <Icon type="font-colors" /> Name
                    </Menu.Item>
                    <Menu.Item key="hdd_capacity">
                        <Icon type="hdd" /> HDD Capacity (Asc.)
                    </Menu.Item>

                </Menu>
            }
            trigger={["click"]}
        >
            <a className="ant-dropdown-link">
                <Icon type="sort-ascending" /> <strong>Sort By:</strong>{" "}
                {sortBy.name} <Icon type="down" />
            </a>
        </Dropdown>
    )
}