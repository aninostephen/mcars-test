import React, { useContext, useEffect, useState } from "react";
import SimpleInputField from "../../InputFields/SimpleInputField";
import { RiArrowDownLine } from 'react-icons/ri'
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import { Col, Row } from "reactstrap";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import ToggleInput from "@/Components/InputFields/ToggleInput";
import UserDetail1 from "../components/UserDetail1";

const OwnerTab = ({ values, users, setFieldValue }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const selectedOldOwner = values?.old_owner_id
    ? users?.filter((user) => user?.id === values?.old_owner_id)[0]
    : 0;

  return (
    <>
      <Row className="mb-4 align-items-center g-2 theme-form theme-form-2 mega-form">
        <Col sm="12">
          <ToggleInput
            {...{
              title: t("ClientExist"),
              name: "is_exist_client",
              setFieldValue,
              values,
              inputprops: {
                name: "is_exist_client",
                id: "is_exist_client",
                options: [
                  { id: "ac", name: "Add Client" },
                  { id: "sc", name: "Select Client" },
                ],
              },
            }}
          />

          {values?.is_exist_client === 'sc' && (
            <>
              <SearchableSelectInput
                nameList={[
                  {
                    title: t("OldOwner"),
                    name: "old_owner_id",
                    require: "true",
                    inputprops: {
                      name: "old_owner_id",
                      id: "old_owner_id",
                      options: users?.filter((user) => user?.role?.id === 10),
                    },
                  },
                ]}
              />

              {values?.old_owner_id && (
                <Row className='align-items-center'>
                    <Col xs="12">
                        <div className='shipping-accordion-custom'>
                            <div className="p-3 rule-dropdown d-flex justify-content-between">
                              {selectedOldOwner?.name} <RiArrowDownLine />
                            </div>
                            <div className="rule-edit-form">
                                <div className="customer-detail tracking-wrapper">
                                    <ul>
                                        <li>
                                            <label>{t("Name")}:</label>
                                            <h4>{selectedOldOwner?.name}</h4>
                                        </li>
                                        <li>
                                            <label>{t("Email")}:</label>
                                            <h4>{selectedOldOwner?.email}</h4>
                                        </li>
                                        <li>
                                            <label>{t("Phone")}:</label>
                                            <h4>{selectedOldOwner?.phone}</h4>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
              )}
            </>
          )}

          {values?.is_exist_client === 'ac' && (
            <UserDetail1 />
          )}
          
        </Col>
      </Row>
    </>
  );
};

export default OwnerTab;
