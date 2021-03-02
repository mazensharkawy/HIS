import React, { useState } from 'react';

import { Button, Select, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// import ImageLoader from './ImageLoader';
import { hasErrorFactory } from '../../../utils/hasError';

import { IPatient } from '../../../interfaces/patient';

const { TextArea } = Input;
type Props = {
  onSubmit: (patient: IPatient) => void;
  onCancel: () => void;
  patient?: any;
  submitText?: string;
};

const defaultSubmitText = 'Add patient';
const emptyPatient = {
  NationalID: null,
  FirstName: null,
  LastName: null,
  Title: null,
  Address: null,
  Phone: null,
  DOB: null,
  Sex: null,
  EmergencyContact: null
};

const patientScheme = Yup.object({
  NationalID: Yup.string().required(),
  FirstName: Yup.string().required(),
  LastName: Yup.string().required(),
  Title: Yup.string().required(),
  Address: Yup.string().required(),
  DOB: Yup.date().required(),
  Phone: Yup.string().required(),
  Sex: Yup.string().required()
  // EmergencyContact: Yup.string().required()
});

const PatientForm = ({
  submitText = defaultSubmitText,
  patient = emptyPatient,
  onSubmit,
  onCancel
}: Props) => {
  const {
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleBlur,
    resetForm,
    values,
    isValid
  } = useFormik<IPatient>({
    validationSchema: patientScheme,
    initialValues: patient,
    onSubmit: (values) => {
      onSubmit(values);
      onCancel();
    }
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let fd: any = new FormData(e.target);
    onSubmit(fd);
  };

  const selectStyle: Object = {
    height: '40px',
    backgroundColor: '#ebebeb',
    boxShadow: 'none',
    border: '#ebebeb 1px solid',
    borderRadius: '20px',
    display: 'flex',
    flex: '1 1',
    color: '#1f2022',
    lineHeight: '1.42857',
    transition:
      'background 0.2s ease-in-out, border 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out',
    willChange: 'background, border, box-shadow, color',
    width: '100%',
    padding: '0 !important',
    appearance: 'none'
  };
  return (
    <>
      <form id='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <Input
            placeholder='SSN'
            name='NationalID'
            type='text'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.name}
          />
        </div>
        <div className='form-group'>
          <Input
            placeholder='First Name'
            name='FirstName'
            type='text'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.name}
            // className={hasError('name')}
          />
        </div>
        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                placeholder='Last Name'
                name='LastName'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.name}
                // className={hasError('name')}
              />
            </div>
          </div>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <Input
                placeholder='Title'
                name='Title'
                type='text'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.name}
                // className={hasError('Title')}
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <Input
            placeholder='Phone'
            name='Phone'
            type='phone'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.number}
            // className={hasError('number')}
          />
        </div>

        <div className='row'>
          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              Date of Birth:
              <Input
                name='DOB'
                type='Date'
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values.age}
                // className={hasError('age')}
              />
            </div>
          </div>

          <div className='col-sm-6 col-12'>
            <div className='form-group'>
              <p></p>
              <select
                placeholder='Sex'
                defaultValue={values.gender}
                name='Sex'
                style={selectStyle}
                required
              >
                <option></option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
          </div>
        </div>

        <div className='form-group'>
          <TextArea
            rows={3}
            name='Address'
            placeholder='Address'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.address}
          />
        </div>

        <div className='d-flex justify-content-between buttons-list settings-actions'>
          {/* <Button danger onClick={onClose}>
            Cancel
          </Button> */}

          <Button type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PatientForm;
