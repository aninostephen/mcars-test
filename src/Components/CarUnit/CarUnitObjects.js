import dayjs from "dayjs";
import { descriptionSchema, nameSchema, } from "./ValidationSchemas";

export const ValidationSchema = {
  car_name: nameSchema,
  plate_no: nameSchema,
  car_make_id: nameSchema,
  year: nameSchema,
  model_variant: nameSchema,
  body_type_id: nameSchema,
  unit_status: nameSchema,
  transactions: nameSchema,
  transmission: nameSchema,
  stability: nameSchema,
  on_handling_payment: nameSchema,
  pickup_date_target: nameSchema,
  driver_user_id: nameSchema,
  backup_user_id: nameSchema,
  pickup_destination: nameSchema,
  remarks: descriptionSchema,
  engine_number: nameSchema,
  chasis_number: nameSchema,
  mvfile_number: nameSchema,
  cr_number: nameSchema,
  insurance_name: nameSchema,
  is_registered: nameSchema,
  old_owner_id: nameSchema,
  bank_name: nameSchema,
  month_contract: nameSchema,
  account_no: nameSchema,
  amort_amount: nameSchema,
  amort_start_date: nameSchema,
  amort_end_date: nameSchema,
  month_paid: nameSchema,
  due_date: nameSchema,
  downpayment: nameSchema,
};

export function InitValues(oldData, updateId) {
  return {
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
    pickup_destination: updateId ? oldData?.pickup_destination || "" : "",
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
    amort_amount: updateId ? oldData?.amort_amount || '' : '',
    bank_name: updateId ? oldData?.bank_name || '' : '',
    month_contract: updateId ? parseInt(oldData?.month_contract) || '' : '',
    account_no: updateId ? oldData?.account_no || '' : '',
    stability: updateId ? oldData?.stability || '' : '',
    car_thumbnail_id: updateId ? oldData?.car_thumbnail?.id || '' : '',
    car_thumbnail: updateId ? oldData?.car_thumbnail || '' : '',
    car_unit_galleries: updateId ? oldData?.car_unit_galleries?.map((img) => img) || "" : "",
    car_unit_galleries_id: updateId ? oldData?.product_galleries?.map((elem) => elem.id) || "" : "",

    engine_number: updateId ? oldData?.engine_number || '' : '',
    chasis_number: updateId ? oldData?.chasis_number || '' : '',
    mvfile_number: updateId ? oldData?.mvfile_number || '' : '',
    cr_number: updateId ? oldData?.cr_number || '' : '',

    amort_start_date: updateId ? oldData?.amort_start_date || dayjs() : dayjs(),
    amort_end_date: updateId ? oldData?.amort_end_date || dayjs() : dayjs(),
    downpayment: updateId ? oldData?.downpayment || '' : '',
  };
}
