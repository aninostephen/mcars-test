import { PAYMENT_TYPE } from "@/Utils/Enums";
import { nameSchema } from "@/Utils/Validation/ValidationSchemas";
import * as Yup from "yup";

export const releaseUnitValidationSchema = {
    car_unit_id: nameSchema,
    new_owner_id: nameSchema,
    from: nameSchema,
    amount: nameSchema,
    target_date: nameSchema,
    payment_type: nameSchema,
    password: nameSchema,
    price: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.FULL_PAYMENT,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    downpayment: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.FULL_DOWNPAYMENT,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    already_payment: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.STAGGERED,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    later_payment: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.STAGGERED,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    staggered_payment: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.STAGGERED,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    staggered_payment_target_date: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.STAGGERED,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    later_payment_target_date: Yup.string()
        .when("payment_type", {
            is: (val) => val === PAYMENT_TYPE.STAGGERED,
            then: Yup.string().required('Field is required'),
            otherwise: Yup.string(),
        }),
    release_type: nameSchema,
    appointment: nameSchema,
}