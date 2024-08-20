import React from 'react';
import { useQuery } from "@tanstack/react-query";
import request from '@/Utils/AxiosUtils';
import { bt, cm } from '@/Utils/AxiosUtils/API';
import { Input} from "reactstrap";
import { Stack } from "@mui/material";
import { Status } from '@/Utils/statues';

const TableFilter = ({ filter, onHandleFilter }) => {

    const { data: carMake } = useQuery([cm], () => request({ 
      url: cm, 
      params: { status: 1 }
    }), {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.car_make_name })) 
    });

    const { data: bodyType } = useQuery([bt], () => request({
      url: bt,
      params: { status: 1 }
    }), {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.body_type_name })) 
    });

    const onChangeFilter = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      filter[name] = value ? {field: name, value: value} : {}
      onHandleFilter(filter);
    }
    return (
        <Stack direction="row" spacing={1.5} p={1}>
            <Input
                name="stock_status"
                type="select"
                onChange={(e) => onChangeFilter(e)}
                style={{
                width: '200px'
                }}
            >
                <option value="">
                   All Stock Status
                </option>
                {Status?.STOCK_STATUS.length && Status?.STOCK_STATUS.map((i) => (
                    <option value={Object.keys(i)}>
                        {Object.values(i)}
                    </option>
                ))}
            </Input>

            <Input
                name="unit_status"
                type="select"
                onChange={(e) => onChangeFilter(e)}
                style={{
                width: '200px'
                }}
            >
                <option value="">
                    All Unit Status
                </option>
                {Status?.UNIT_STATUS.length && Status?.UNIT_STATUS.map((i) => (
                    <option value={Object.keys(i)}>
                        {Object.values(i)}
                    </option>
                ))}
            </Input>

            <Input
                name="transmission"
                type="select"
                onChange={(e) => onChangeFilter(e)}
                style={{
                width: '200px'
                }}
            >
                <option value="">
                    All Transmission
                </option>
                {Status?.TRANSMISSION.length && Status?.TRANSMISSION.map((i) => (
                    <option value={Object.keys(i)}>
                        {Object.values(i)}
                    </option>
                ))}
            </Input>

            <Input
                name="brand"
                type="select"
                onChange={(e) => onChangeFilter(e)}
                style={{
                width: '200px'
                }}
            >
                <option value="">
                    All Brand
                </option>
                {carMake && carMake.map((i) => (
                    <option value={i.id}>
                        {i.name}
                    </option>
                ))}
            </Input>

            <Input
                name="body_type"
                type="select"
                onChange={(e) => onChangeFilter(e)}
                style={{
                width: '200px'
                }}
            >
                <option value="">
                    All body type
                </option>
                {bodyType && bodyType.map((i) => (
                    <option value={i.id}>
                        {i.name}
                    </option>
                ))}
            </Input>
        </Stack>
    );
};

export default TableFilter;