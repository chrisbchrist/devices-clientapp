import React, { FunctionComponent, useContext } from "react";
import {
    Formik,
    Form,
    Field,
    FormikProps,
    FieldProps,
    FormikHelpers
} from "formik";
import * as Yup from "yup";
import { Device } from "../App";
import {
  Button,
  Col,
  Form as AntdForm,
  Input,
  InputNumber,
  Row,
  Select
} from "antd";
import { AppContext } from "../App";
import {openNotificationWithIcon} from "../util";

const FormItem = AntdForm.Item;

interface DeviceFormProps {
  deviceToEdit: Device | null;
  closeModal: () => void;
}

const typeOptions = [
  {
    name: "Windows",
    value: "WINDOWS_WORKSTATION"
  },
  {
    name: "Windows Server",
    value: "WINDOWS_SERVER"
  },
  {
    name: "macOS",
    value: "MAC"
  }
];

const required = <span className="required">*</span>;

const validationSchema = Yup.object().shape({
  system_name: Yup.string().required("Required field"),
  type: Yup.string().required("Required field"),
  hdd_capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1 GB")
});

export const DeviceForm: FunctionComponent<DeviceFormProps> = ({
  deviceToEdit,
  closeModal
}) => {

  const ctx = useContext(AppContext);

  const initialValues: Partial<Device> = deviceToEdit
    ? deviceToEdit
    : { system_name: "", type: undefined, hdd_capacity: "" };

  const handleSubmit = (
    values: Partial<Device>,
    actions: FormikHelpers<Partial<Device>>
  ) => {
        const { createDevice, updateDevice, refetch } = ctx;
        if (deviceToEdit) {
            const newDevice = { id: deviceToEdit.id, ...values};
            updateDevice(newDevice)
                .then((res: number) => {
                        refetch();
                })
                .catch((err: any) => {
                    openNotificationWithIcon("error", "Operation failed", "Oops!")
                })
        } else {
            createDevice(values)
                .then((res: any) => {
                    refetch();
                    closeModal();
                })
                .catch((err: any) => {
                    openNotificationWithIcon("error", "Operation failed", "Oops!")
                })
        }
        closeModal();
  };

  return (
    <div className="form__wrapper">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onReset={() => "oof"}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => {
          return (
            <Form>
              <Field name="system_name">
                {({ field, form: { touched, errors }, meta }: FieldProps) => (
                  <FormItem label={<>Device Name {required}</>}>
                    <Input {...field} placeholder="Device Name" />
                  </FormItem>
                )}
              </Field>
              <Row gutter={20}>
                <Col span={16}>
                  <Field name="type">
                    {({ field, form, meta }: FieldProps) => (
                      <FormItem label={<>Type {required}</>}>
                        <Select
                          {...field}
                          onChange={(val: any) =>
                            form.setFieldValue(field.name, val)
                          }
                          placeholder="Type"
                        >
                          {typeOptions.map(opt => (
                            <Select.Option key={opt.name} value={opt.value}>
                              {opt.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    )}
                  </Field>
                </Col>
                <Col span={6}>
                  <Field name="hdd_capacity">
                    {({ field, form, meta }: FieldProps) => (
                      <FormItem label={<>HDD Capacity (GB) {required}</>}>
                        <InputNumber
                          min={0}
                          {...field}
                          onChange={(val?: number) =>
                            form.setFieldValue(field.name, val)
                          }
                          placeholder="Capacity"
                        />
                      </FormItem>
                    )}
                  </Field>
                </Col>
              </Row>
              <div className="form__btns">
                <Button
                  onClick={closeModal}
                  icon="close"
                  style={{ marginRight: 15 }}
                >
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary" icon="check-circle">
                  Submit
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
