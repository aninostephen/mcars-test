import React, { useContext } from "react";
import { Field } from "formik";
import InputWrapper from "../../Utils/HOC/InputWrapper";
import { Col, Row } from "reactstrap";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTranslation } from "@/app/i18n/client";
import I18NextContext from "@/Helper/I18NextContext";
import styled from "styled-components";

const StyledToggleButtonGroup =  styled(ToggleButtonGroup)`
  .css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected{
    background: #a40d0d;
    color: #fff;
  }
`;

const ToggleInput = ({ name, setFieldValue, values, inputprops, ...rest }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const Toggle = () => {
    return (
      <div className="input-error">
        <Row className="mb-4 align-items-center">
          <Col sm={5}>
            <StyledToggleButtonGroup
              color="primary"
              name={name}
              value={values[name]}
              exclusive
              onChange={(_, val) => {
                setFieldValue(name, val);
              }}
              aria-label="Platform"
            >
              {inputprops?.options && inputprops.options.map((i) => (
                <ToggleButton key={i.id} value={i.id}>{i.name}</ToggleButton>
              ))}
            </StyledToggleButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }

  return <Field type="text" name={name} id={name} {...rest} component={Toggle} />;
};
export default InputWrapper(ToggleInput);
