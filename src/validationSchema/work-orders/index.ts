import * as yup from 'yup';

export const workOrderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  client_id: yup.string().nullable().required(),
  field_technician_id: yup.string().nullable(),
  team_leader_id: yup.string().nullable(),
});
