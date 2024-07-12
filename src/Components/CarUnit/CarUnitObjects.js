import dayjs from "dayjs";
import { descriptionSchema, discountSchema, dropDownScheme, ifTypeSimpleSchema, nameSchema, variationSchema, externalUrlSchema } from "./ValidationSchemas";

export const ValidationSchema = {
  car_name: nameSchema,
  plate_no: nameSchema,
  // model_variant: descriptionSchema,
  // car_make_id: nameSchema,
  // year: externalUrlSchema,
  // body_type_id: ifTypeSimpleSchema,
  // unit_status: ifTypeSimpleSchema,
  // transmission: ifTypeSimpleSchema, // if (type == simple)
};

export function InitValues(oldData, updateId) {
  const attr_combination = () => {
    let attributes = oldData?.attributes?.map((value) => value?.id);
    let variants = attributes?.map((attr, i) => {
      let matchingVariations = oldData?.variations.filter((variation) => {
        return variation.attribute_values.some((attrVal) => attrVal?.attribute_id == attr);
      });

      let attributeValues = matchingVariations?.reduce((acc, variation) => {
        let values = variation.attribute_values.filter((attrVal) => attrVal?.attribute_id == attr).map((attrVal) => attrVal?.id);
        return values ? [...new Set([...acc, ...values])] : acc;
      }, []);
      return oldData?.attributes[i] && attributeValues.length > 0 ? { name: oldData?.attributes[i], values: attributeValues } : false;
    });
    return variants?.filter((elem) => elem !== false);
  };
  return {
    // General
    car_name: updateId ? oldData?.car_name || "" : "",
    transactions: updateId ? oldData?.transactions || "" : "ASSUME_UNIT",
    plate_no: updateId ? oldData?.plate_no || "" : "",
    unit_status: updateId ? oldData?.unit_status || "" : "USE_CAR",
    transmission: updateId ? oldData?.transmission || "" : "AUTOMATIC",
    car_make_id: updateId ? oldData?.car_make_id || "" : "",
    body_type_id: updateId ? oldData?.body_type_id || "" : "",
    year: updateId ? oldData?.year || "" : "",
    model_variant: updateId ? oldData?.model_variant || "" : "",
    pickup_date_target: updateId ? oldData?.pickup_date_target || new Date() : new Date(),
    status: updateId ? Boolean(oldData?.status) : true,

    on_handling_payment: updateId ? oldData?.on_handling_payment || "" : "",
    remarks: updateId ? oldData?.remarks || "" : "",
    driver_user_id: updateId ? oldData?.driver_user_id || "" : "",
    backup_user_id: updateId ? oldData?.backup_user_id || "" : "",
    car_features: updateId ? oldData?.car_features ? JSON.parse(oldData?.car_features) : [] : [],
    is_registered: updateId ? oldData?.is_registered || 'NO' : 'NO',
    till_registered: updateId ? oldData?.till_registered || new Date() : new Date(),
    is_insured: updateId ? oldData?.is_insured || 'NO' : 'NO',
    till_insured: updateId ? oldData?.till_insured || new Date() : new Date(),
    insurance_locked: updateId ? oldData?.insurance_locked || 'NO' : 'NO',
    insurance_name: updateId ? oldData?.insurance_name || '' : '',
    old_owner_id: updateId ? oldData?.old_owner_id || '' : '',
    new_owner_id: updateId ? oldData?.new_owner_id || '' : '',
    backup_unit: updateId ? oldData?.backup_unit || 'NO' : 'NO',
    due_date: updateId ? parseInt(oldData?.due_date) || '' : '',
    month_paid: updateId ? parseInt(oldData?.month_paid) || '' : '',
    amort_amount: updateId ? parseInt(oldData?.amort_amount) || '' : '',
    bank_name: updateId ? oldData?.bank_name || '' : '',
    month_contract: updateId ? parseInt(oldData?.month_contract) || '' : '',
    account_no: updateId ? oldData?.account_no || '' : '',
    stability: updateId ? oldData?.stability || '' : '',
    car_thumbnail_id: updateId ? oldData?.car_thumbnail.id || '' : '',
    car_thumbnail: updateId ? oldData?.car_thumbnail || '' : '',
    car_unit_galleries: updateId ? oldData?.car_unit_galleries?.map((img) => img) || "" : "",
    car_unit_galleries_id: updateId ? oldData?.product_galleries?.map((elem) => elem.id) || "" : "",

    engine_number: updateId ? oldData?.engine_number || '' : '',
    chasis_number: updateId ? oldData?.chasis_number || '' : '',
    mvfile_number: updateId ? oldData?.mvfile_number || '' : '',
    cr_number: updateId ? oldData?.cr_number || '' : '',

    amort_start_date: updateId ? oldData?.amort_start_date || dayjs() : dayjs(),
    amort_end_date: updateId ? oldData?.amort_end_date || dayjs() : dayjs(),
  };
}
