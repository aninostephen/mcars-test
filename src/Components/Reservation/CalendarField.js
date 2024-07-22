import React, { useState, useContext } from 'react';
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import { Calendar } from "react-date-range";
import useOutsideDropdown from "@/Utils/Hooks/CustomHooks/useOutsideDropdown";
import { Col, Row, Input, Label } from 'reactstrap';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CalendarField = ({ values, setFieldValue, label, name, errors, touched }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className="input-error">
          <Row className="mb-4 align-items-center">
            <Col sm={2}><Label className="col-form-label form-label-title">{t(label)}<span class="theme-color ms-2 required-dot">*</span></Label></Col>
            <Col sm={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    disablePast
                    name={name}
                    defaultValue={dayjs()}
                    onChange={(value) => setFieldValue(name, value, true)}
                    slotProps={{
                        textField: {
                            variant: "outlined",
                            error: touched[name] && Boolean(errors[name]),
                            helperText: touched[name] && errors[name]
                        }
                    }}
                />
              </LocalizationProvider>
            </Col>
          </Row>
        </div>
    );
};

export default CalendarField;