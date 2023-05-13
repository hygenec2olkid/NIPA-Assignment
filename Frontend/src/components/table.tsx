import * as React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Ticket } from 'interfaces'

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'contactInformation', headerName: 'ContactInformation', width: 200 },
  {
    field: 'status',
    headerName: 'status',
    width: 200
  },
  { field: 'createdAt', headerName: 'createdAt', width: 320 },
  { field: 'updatedAt', headerName: 'updatedAt', width: 200 }
]

export default function DataTable(props: { data: Ticket[] }) {
  const { data } = props
  return (
    <div style={{ height: 370, width: '100%' }}>
      <DataGrid
        rows={data.map((ticket) => {
          return { ...ticket, id: ticket._id }
        })}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  )
}
