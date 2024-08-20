import React, { useContext } from 'react';
import { Col, Row, Label } from 'reactstrap';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CalendarField = ({ value, setFieldValue, label, name, errors, touched }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <div className="input-error">
          <Row className="mb-4 align-items-center">
            <Col sm={2}><Label className="col-form-label form-label-title">{t(label)}<span className="theme-color ms-2 required-dot">*</span></Label></Col>
            <Col sm={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    disablePast
                    name={name}
                    value={dayjs(value)}
                    onChange={(val) => setFieldValue(name, val)}
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