import React from "react";


import FileUploadField from "@/Components/InputFields/FileUploadField";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";

const ImagesTab = ({ values, setFieldValue, errors, updateId }) => {
  return (
    <>
      <FileUploadField
        errors={errors}
        name="car_thumbnail_id"
        id="car_thumbnail_id"
        title="Thumbnail"
        type="file"
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
        helpertext={getHelperText('600x600px')}
      />
      <FileUploadField
        errors={errors}
        name="car_unit_galleries_id"
        id="car_unit_galleries_id"
        title="Images"
        type="file"
        multiple={true}
        values={values}
        setFieldValue={setFieldValue}
        updateId={updateId}
        helpertext={getHelperText('600x600px')} />
    </>
  );
};

export default ImagesTab;
