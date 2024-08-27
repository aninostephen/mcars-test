import SearchableSelectInput from '@/Components/InputFields/SearchableSelectInput';
import { useQuery } from "@tanstack/react-query";
import request from '@/Utils/AxiosUtils';
import { Divider } from '@mui/material';
import React from 'react';
import { user } from '@/Utils/AxiosUtils/API';

const ForReturnUnit = ({ itemKey }) => {
    const { data: users } = useQuery([user], () => request({ 
      url: user,
    }), {
      refetchOnWindowFocus: false,
      select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.name, ...item })) 
    });

    return (
        <div>
            <Divider textAlign="left">Driver</Divider>
            <SearchableSelectInput
                nameList={[
                {
                    title: 'Driver',
                    name: "driver_user_id",
                    require: "true",
                    inputprops: {
                        name: "driver_user_id",
                        id: "driver_user_id",
                        options: users?.filter((user) => user?.role?.id === 12),
                    },
                },
                ]}
            />

            <SearchableSelectInput
                nameList={[
                    {
                        title: 'Backup driver',
                        name: "backup_user_id",
                        require: "true",
                        inputprops: {
                            name: "backup_user_id",
                            id: "backup_user_id",
                            options: users?.filter((user) => user?.role?.id === 12),
                        },
                    },
                ]}
            />
        </div>
    );
};

export default ForReturnUnit;