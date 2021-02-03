import React from 'react';
import { Table } from 'antd';

const columns: any = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Ali',
        value: 'Alaa'
      },
      {
        text: 'Alaa',
        value: 'Alaa'
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Hashem',
            value: 'Hashem'
          },
          {
            text: 'Saad',
            value: 'Saad'
          }
        ]
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend']
  }
];

const data = [
  {
    key: '1',
    name: 'Ali Hashem',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Alaa Saad',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Hany Atta',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  },
  {
    key: '4',
    name: 'Karim Fawzy',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
];

const FilterAndSorting = () => {
  return <Table pagination={false} columns={columns} dataSource={data} />;
};

export default FilterAndSorting;
