import './OrderDetail.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from 'primereact/divider';


function OrderDetail() {
  const details1 = [
    {
      key: 'ID',
      value: '65f8d580916f6f81cd61f75e',
    },
    {
      key: 'Status',
      value: 'Processing',
    },
    {
      key: 'Date',
      value: '10/4/2023, 11:40:19 AM',
    },
  ];

  const details2 = [
    {
      key: 'Name',
      value: 'Steven Steven',
    },
    {
      key: 'Phone No',
      value: '082230307777',
    },
    {
      key: 'Address',
      value: 'Jl Rumah No 55 Sei Rumah Raya',
    }
  ]

  const details3 = [
    {
      key: 'Status',
      value: 'Not Paid',
    },
    {
      key: 'Method',
      value: 'COD',
    },
    {
      key: 'Stripe ID',
      value: 'Nill',
    },
    {
      key: 'Amount Paid',
      value: '$1084.32',
    }
  ]

  return (
    <div className='order-detail-page'>
      <div className='order-detail'>
        <h2 className=''>Your Order Details</h2>
        <DataTable
          value={details1}
          size='small'
          showGridlines
          className='no-header-datatable'
          style={{
            marginTop: '20px',
            marginBottom: '50px',
          }}
          rowClassName='order-table__row'
        >
          <Column style={{ width: "180px" }} field='key'></Column>
          <Column field='value'></Column>
        </DataTable>
      </div>
      <div className='order-detail'>
        <h2 className=''>Shipping Info</h2>
        <DataTable
          value={details2}
          size='small'
          showGridlines
          className='no-header-datatable'
          style={{ marginTop: '20px', marginBottom: '50px' }}
          rowClassName='order-table__row'
        >
          <Column style={{ width: "100px" }} field='key'></Column>
          <Column field='value'></Column>
        </DataTable>
      </div>
      <div className='order-detail'>
        <h2 className=''>Payment Info</h2>
        <DataTable
          value={details3}
          size='small'
          showGridlines
          className='no-header-datatable'
          style={{ marginTop: '20px', marginBottom: '50px' }}
          rowClassName='order-table__row'
        >
          <Column style={{ width: "500px" }} field='key'></Column>
          <Column field='value'></Column>
        </DataTable>
      </div>
      <div className='order-items'>
          <h2>Order Items:</h2>
          <Divider />
          <Divider />
      </div>
    </div>
  );
}

export default OrderDetail;
