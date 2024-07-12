import * as Yup from "yup";

export const YupObject = (schemaObject) => Yup.object().shape(schemaObject);

export const bodytypename = Yup.string().required().max(50, "max only is 50 character");