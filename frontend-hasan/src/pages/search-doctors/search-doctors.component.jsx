import React, { useState ,useEffect} from 'react';
import axios from 'axios';

import { CardList } from '../../components/card-list/card-list.component'
import { SearchBox } from '../../components/search-box/search-box.component';
import Dropdown from '../../components/drop-down/drop-down.component';

import './search-doctors.styles.css';


const options = [
  {
    label: 'dep1',
    value: 'dep1',
    doctors : [
        {
            name: 'hasan',
            status : 'available',
            id:1,
            
        },
        {
          name: 'ahmed',
          status : 'available',
          id:2
        },
        {
          name: 'aly',
          status : 'available',
          id:3
        },
        {
          name: 'osama',
          status : 'available',
          id:11
      },
      {
        name: 'khaled',
        status : 'available',
        id:51
      },
      {
        name: 'mazen',
        status : 'available',
        id:36
      },
      {
        name: 'asmaa',
        status : 'available',
        id:90
      },
      {
        name: 'amr',
        status : 'available',
        id:91
      }


    ]
  },
  {
      label: 'dep2',
      value: 'dep2',
      doctors : [
          {
              name: 'ya',
              status : 'available',
              id:4
          },
          {
            name: 'ka',
            status : 'available',
            id:5
          },
          {
            name: 'fa',
            status : 'available',
            id:6
          }

      ]
    },
    {
      label: 'dep3',
      value: 'dep3',
      doctors : [
          {
              name: 'omar',
              status : 'available',
              id:7
          },
          {
            name: 'ayman',
            status : 'available',
            id:8
          },
          {
            name: 'mostafa',
            status : 'available',
            id:9
          }

      ]
    },
];


const SearchDoctors =  () => {
  const [selected,setSelected]= useState(options[0]);
  const [searchField,setSearchField]= useState('');


  
    const [data, setData] = useState({});
  
    const fetchdata = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log(res);
      console.log("done here");
  
      //setData(res.data.json);
    };
  
    useEffect(() => {
      fetchdata();
      //console.log(data);
      console.log("done");
      
    }, []);


  const onSearchChange = event => {
    setSearchField(event.target.value);
  };

  const filteredDoctors = selected.doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchField.toLowerCase())
  );
  
  
  

  return (
    <div className='App'>
      
      
      <h1>Clinics Departments</h1>
     
      <Dropdown
        label="Select a department"
        options={options}
        selected={selected}
        onSelectedChange={setSelected}
      />
      <SearchBox onSearchChange={onSearchChange} />
      
      <CardList doctors={filteredDoctors} />
    </div>
  );
};

export default SearchDoctors;