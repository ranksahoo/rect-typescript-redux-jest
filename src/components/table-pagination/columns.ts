import { format } from 'date-fns'

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left',
    type: 'text',
  },
  {
    Header: 'First Name',
    Footer: 'First Name',
    accessor: 'first_name',
    sticky: 'left',
    type: 'text',
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor: 'last_name',
    sticky: 'left',
    type: 'text',
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    Cell: ({ value }) => {
      return format(new Date(value), 'MM/dd/yyyy')
    },
    type: 'date',
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country',
    type: 'text',
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    type: 'text',
  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email',
    type: 'text',
  },
  {
    Header: 'Age',
    Footer: 'Age',
    accessor: 'age',
    type: 'number',
  },
]
