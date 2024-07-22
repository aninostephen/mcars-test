import { nameSchema } from "@/Utils/Validation/ValidationSchemas";
import * as Yup from "yup";

export const passwordConfirmationSchema = Yup.string()
  .when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "Both password need to be the same"),
  }).required();

export const validationSchema = {
    new_owner_id: nameSchema,
    payment_type: nameSchema,
    price: Yup.string()
        .when("payment_type", {
            is: (val) => val === 'FULL_PAYMENT',
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    already_payment: Yup.string()
        .when("payment_type", {
            is: (val) => val === 'STAGGERED',
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    later_payment: Yup.string()
        .when("payment_type", {
            is: (val) => val === 'STAGGERED',
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    staggered_payment: Yup.string()
        .when("payment_type", {
            is: (val) => val === 'STAGGERED',
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    downpayment: Yup.string()
        .when("payment_type", {
            is: (val) => val === 'FULL_DOWNPAYMENT',
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    release_type: nameSchema,
    appointment: nameSchema,
}