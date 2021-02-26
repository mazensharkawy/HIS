import React, { useState } from 'react';
import { Avatar, Table, Button, Modal, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';

import { IPatient } from '../../../interfaces/patient';

import { history } from '../../../redux/store';
import PatientForm from '../../../layout/components/patients/PatientForm';

type Props = {
  patients: IPatient[];
  onEditPatient?: (patient: IPatient) => void;
  onDeletePatient?: (id: string) => void;
};

type PatientsImgProps = {
  img: string;
};

const PatientImg = ({ img }: PatientsImgProps) => {
  const isData = img.startsWith('data:image');
  const isWithPath = img.startsWith('http');

  if (isData || isWithPath) {
    return <Avatar size={40} src={img} />;
  }

  return <Avatar size={40} src={`${window.location.origin}/${img}`} />;
};

const PatientsTable = ({
  patients,
  onEditPatient = () => null,
  onDeletePatient = () => null
}: Props) => {
  const [patient, setPatient] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const closeModal = () => setVisibility(false);

  const handleShowInfo = () => history.push('/vertical/patient-profile');
  const handleDeletePatient = (id) => onDeletePatient(id);
  const handleEditPatient = (patient: IPatient) => {
    setPatient(patient);
    setVisibility(true);
  };
  const actions = (patient: IPatient) => (
    <div className='buttons-list nowrap'>
      <Button shape='circle' onClick={handleShowInfo}>
        <span className='icofont icofont-external-link' />
      </Button>
      <Button onClick={handleEditPatient.bind({}, patient)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDeletePatient.bind({}, patient.id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  const columns: ColumnProps<IPatient>[] = [
    // {
    //   title: 'Photo',
    //   dataIndex: 'img',
    //   render: (img) => <PatientImg img={img} />
    // },
    {
      dataIndex: 'FirstName',
      title: 'First Name',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      render: (name) => <strong>{name}</strong>
    },
    {
      dataIndex: 'LastName',
      title: 'Last Name',
      sorter: (a, b) => (a.name > b.name ? 1 : -1),
      render: (name) => <strong>{name}</strong>
    },
    {
      dataIndex: 'NathionalID',
      title: 'ID',
      sorter: (a, b) => (a.id > b.id ? 1 : -1),
      render: (id) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {id}
        </span>
      )
    },
    {
      dataIndex: 'DOB',
      title: 'DOB',
      sorter: (a, b) => a.age - b.age,
      render: (DOB) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {DOB.split('T')[0]}
        </span>
      )
    },
    {
      dataIndex: 'Address',
      title: 'Address',
      render: (Address) => <span style={{ minWidth: 200, display: 'block' }}>{Address}</span>
    },
    {
      dataIndex: 'Phone',
      title: 'Number',
      render: (Number) => (
        <span className='d-flex align-baseline nowrap' style={{ color: '#336cfb' }}>
          <span className='icofont icofont-ui-cell-phone mr-1' style={{ fontSize: 16 }} />
          {Number}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: actions
    }
  ];

  const pagination = patients?.length <= 10 ? false : {};

  return (
    patients && (
      <>
        <Table
          pagination={pagination}
          className='accent-header'
          rowKey='id'
          dataSource={patients}
          columns={columns}
        />

        <Modal
          visible={visibility}
          footer={null}
          onCancel={closeModal}
          title={<h3 className='title'>Add patient</h3>}
        >
          <PatientForm
            submitText='Update patient'
            onCancel={closeModal}
            onSubmit={onEditPatient}
            patient={patient}
          />
        </Modal>
      </>
    )
  );
};

export default PatientsTable;
