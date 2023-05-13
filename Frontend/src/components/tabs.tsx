import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import DragAndDrop from './draganddrop'
import FormDialog from './dialog'
import DataTable from './table'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  data: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, data, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {index == 0 ? <DragAndDrop data={data} /> : <DataTable data={data} />}
        </Box>
      )}
    </div>
  )
}
export default function BasicTabs() {
  const [value, setValue] = React.useState(0)
  const [open, setDialogOpen] = React.useState(false)
  const handleAddIconClick = () => {
    setDialogOpen(true)
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['tickets'],
    queryFn: () =>
      fetch('http://localhost:8000/ticket').then((res) => res.json())
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred'

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="flex "
        >
          <Tab label="Board View" />
          <Tab label="Table" />
          <FormDialog mode={1} />
          <div className="grow"></div>
          <FormDialog mode={2} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} data={data}></TabPanel>
      <TabPanel value={value} index={1} data={data}></TabPanel>
    </Box>
  )
}
