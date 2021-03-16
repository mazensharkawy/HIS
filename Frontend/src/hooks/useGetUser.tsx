import { IPatient } from '../interfaces/patient';

export function useGetUser(): IPatient {
  return {
    age: 25,
    name: 'Khaled',
    lastName: 'Younis',
    number: '0126596578',
    gender: 'male',
    address: '7170 شارع بورسعيد، الإبراهيمية بحري وسيدي جا، قسم باب شرقي، الإسكندرية',
    status: 'approved',
    lastVisit: '18 Dec 2020',
    img: `${window.origin}/content/male.png`
  };
}
