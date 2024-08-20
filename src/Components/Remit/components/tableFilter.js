import React from 'react';
import { Input} from "reactstrap";
import { Stack } from "@mui/material";
import { Status } from '@/Utils/statues';

const TableFilter = ({ filter, onHandleFilter }) => {
    const onChangeFilter = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      filter[name] = value ? {field: name, value: value} : {}
      onHandleFilter(filter);
    }
    return (
        <Stack direction="row" spacing={1.5} p={1}>
            <Input
                name="is_remitted"
                type="select"
                onChange={(e) => onChangeFilter(e)}
                style={{
                width: '200px'
                }}
            >
                <option value="">
                   All status
                </option>
                {Status?.REMIT_STATUS.length && Status?.REMIT_STATUS.map((i) => (
                    <option value={Object.keys(i)}>
                        {Object.values(i)}
                    </option>
                ))}
            </Input>
        </Stack>
    );
};

export default TableFilter;