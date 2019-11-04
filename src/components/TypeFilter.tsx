import React, {FunctionComponent} from 'react';
import {Button, Checkbox, Icon, Popover} from "antd";
import {CheckboxValueType} from "antd/lib/checkbox/Group";

interface TypeFilterProps {
    filters: CheckboxValueType[];
    onChange: (checkedValues: CheckboxValueType[]) => void;
}

const options = [
    {
        label: <><Icon type="windows"/> Windows Workstation</>,
        value: "WINDOWS_WORKSTATION"
    },
    {
        label: <><Icon type="database"/> Windows Server</>,
        value: "WINDOWS_SERVER"
    },
    {
        label: <><Icon type="apple"/> MacOS</>,
        value: "MAC"
    }
];

export const TypeFilter: FunctionComponent<TypeFilterProps> = ({filters, onChange}) => {

    return (
        <div>
            <Popover content={(
                <div>
                    <Checkbox.Group options={options} value={filters} onChange={onChange}/>
                </div>
            )} trigger="click" title={<span><Icon type="eye"/> Show:</span>}>
                <Button icon="filter">Filters</Button>
            </Popover>
        </div>
    )
}