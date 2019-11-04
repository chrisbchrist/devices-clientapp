import React, {FunctionComponent} from 'react';
import {Icon} from 'antd';

interface AddCardProps {
    onClick: () => void;
}

export const AddCard: FunctionComponent<AddCardProps> = ({ onClick }) => {

    return (
        <div className="add-card" onClick={onClick}>
            <Icon className="add-icon" type="plus-circle" theme="twoTone" twoToneColor={"#ce2043"}/>
            <h2 className="add-text">Add a Device</h2>
        </div>
    )
}