import * as yup from 'yup';

export const serviceRequestValidationSchema = yup.object().shape({
  description: yup.string().required(),
  client_id: yup.string().nullable().required(),
  work_order_id: yup.string().nullable(),
});
