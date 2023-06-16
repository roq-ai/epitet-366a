import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createServiceRequest } from 'apiSdk/service-requests';
import { Error } from 'components/error';
import { serviceRequestValidationSchema } from 'validationSchema/service-requests';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { WorkOrderInterface } from 'interfaces/work-order';
import { getUsers } from 'apiSdk/users';
import { getWorkOrders } from 'apiSdk/work-orders';
import { ServiceRequestInterface } from 'interfaces/service-request';

function ServiceRequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ServiceRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createServiceRequest(values);
      resetForm();
      router.push('/service-requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ServiceRequestInterface>({
    initialValues: {
      description: '',
      client_id: (router.query.client_id as string) ?? null,
      work_order_id: (router.query.work_order_id as string) ?? null,
    },
    validationSchema: serviceRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Service Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'client_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<WorkOrderInterface>
            formik={formik}
            name={'work_order_id'}
            label={'Select Work Order'}
            placeholder={'Select Work Order'}
            fetcher={getWorkOrders}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.status}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'service_request',
  operation: AccessOperationEnum.CREATE,
})(ServiceRequestCreatePage);
