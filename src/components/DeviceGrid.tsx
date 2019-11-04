import React, {FunctionComponent, useState} from "react";
import { AddCard } from "./AddCard";
import { DeviceCard } from "./DeviceCard";
import { Device } from "../App";
import { Divider, Dropdown, Icon, Menu, Input } from "antd";
import { ClickParam } from "antd/lib/menu";
import {TypeFilter} from "./TypeFilter";
import { SortDropdown } from "./SortDropdown";

interface DeviceGridProps {
  devices: Device[];
  launchEdit: (device?: Device) => void;
  whyDidYouRender?: any;
}

const DeviceGridFC: FunctionComponent<DeviceGridProps> = ({
  devices,
  launchEdit
}) => {
  const [filter, setFilter] = useState<{ value: string; name: string }>({
    value: "All",
    name: "All"
  });
  const [sortBy, setSortBy] = useState<{ value: string; name: string }>({
      value: "All",
      name: "None"
  });

  const handleChangeFilter = ({ item, key }: ClickParam) => {
    console.log(item);
    setFilter({ value: key, name: item.node.innerText });
  };

  const handleChangeSorter = ({ item, key}: ClickParam) => {
      setSortBy({value: key, name: item.node.innerText});
  }

  const getVisibleDevices = (devices: Device[]) => {
    if (filter.value === "All" && !sortBy) {
      return devices;
    } else {
      return devices
        .filter(d => {
          return filter.value !== "All" ? d.type === filter.value : d;
        })
        .sort((a, b) => {
          switch(sortBy.value) {
              case "hdd_capacity":
                  return parseInt(a.hdd_capacity) < parseInt(b.hdd_capacity) ? -1 : 1;
              case "system_name":
                  return a.system_name > b.system_name ? 1 : -1;
              default:
                  return 0;
          }
        });
    }
  };

  return (
    <div>
      <div className="card-grid">
        <h2 className="grid-title">Manage Devices ({devices.length})</h2>
        <div className="options">
          <div className="option-box">
           <TypeFilter filter={filter} onChange={handleChangeFilter}/>
          </div>
          <Divider type={"vertical"} />
          <div className="option-box">
            <SortDropdown sortBy={sortBy} onChange={handleChangeSorter}/>
          </div>
            <div className="search-wrapper">
                <Input.Search placeholder="Search Devices" onSearch={() => alert("I just look good")}/>
            </div>
        </div>
      </div>
      <div className="card-grid">
        <AddCard onClick={() => launchEdit()} />
        {getVisibleDevices(devices).map((device: Device, i: number) => (
          <div className="card-wrapper" key={device.system_name + i}>
            <DeviceCard launchEdit={launchEdit} device={device} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const DeviceGrid = React.memo(DeviceGridFC);
