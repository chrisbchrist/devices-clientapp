import React, {FunctionComponent, useState} from "react";
import { AddCard } from "./AddCard";
import { DeviceCard } from "./DeviceCard";
import { Device } from "../App";
import { Divider, Input } from "antd";
import { ClickParam } from "antd/lib/menu";
import {TypeFilter} from "./TypeFilter";
import { SortDropdown } from "./SortDropdown";
import {CheckboxValueType} from "antd/lib/checkbox/Group";

interface DeviceGridProps {
  devices: Device[];
  launchEdit: (device?: Device) => void;
}

const defaultFilters: CheckboxValueType[] = ["WINDOWS_WORKSTATION", "WINDOWS_SERVER", "MAC"];

const DeviceGridFC: FunctionComponent<DeviceGridProps> = ({
  devices,
  launchEdit
}) => {
  const [filters, setFilters] = useState<CheckboxValueType[]>(defaultFilters);
  const [sortBy, setSortBy] = useState<{ value: string; name: string }>({
      value: "None",
      name: "None"
  });


  const handleChangeFilters = (checkedValues: CheckboxValueType[]) => {
      setFilters(checkedValues);
  };

  const handleChangeSorter = ({ item, key}: ClickParam) => {
      setSortBy({value: key, name: item.node.innerText});
  };

  const getVisibleDevices = (devices: Device[]) => {
    if (filters === defaultFilters && sortBy.value === "None") {
      return devices;
    } else {
      return devices
        .filter(d => {
          return filters.includes(d.type);
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
          <div className="filter-wrapper">
           <TypeFilter filters={filters} onChange={handleChangeFilters}/>
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
