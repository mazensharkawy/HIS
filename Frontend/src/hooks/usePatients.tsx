import { IPatient } from '../interfaces/patient';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../redux/patients/actions';

import { IAppState } from '../interfaces/app-state';
import axios from 'axios';

export function usePatients() {
  const dispatch = useDispatch();
  const patients = useSelector<IAppState, IPatient[]>((state) => state.patients);

  const editPatient = (patient: IPatient) => {
    return dispatch(actions.editPatient(patient));
  };

  const addPatient = async (patient: any) => {
    // return dispatch(actions.addPatient(patient));
    try {
      var patientObject: object = {};
      await patient.forEach(function (value, key) {
        patientObject[key] = value;
      });
      return axios.post('http://localhost:3001/EHR/', patientObject);
    } catch (error) {
      alert(error);
    }
  };

  const deletePatient = (id: string) => {
    return dispatch(actions.deletePatient(id));
  };

  return { patients, addPatient, editPatient, deletePatient };
}
