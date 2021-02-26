import React from 'react';

import { useFetchPageData, usePageData } from '../../../hooks/usePage';
import { usePatients } from '../../../hooks/usePatients';

import PatientsTable from './PatientsTable';

import { IPageData } from '../../../interfaces/page';
import { unNestObject } from '../../../utils/utilis';

const pageData: IPageData = {
  title: 'Patients',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Patients'
    }
  ]
};

const PatientsPage = () => {
  const { patients, editPatient, deletePatient } = usePatients();

  let url: string = 'http://localhost:3001/EHR';
  const [fetchPatients]: any = useFetchPageData(url);
  let unNestedPatients: any = unNestObject(fetchPatients);

  usePageData(pageData);

  return (
    <>
      {unNestedPatients && (
        <PatientsTable
          onDeletePatient={deletePatient}
          onEditPatient={editPatient}
          patients={unNestedPatients}
        />
      )}
    </>
  );
};

export default PatientsPage;
