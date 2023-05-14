import { FormEvent, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AddIcon from '@mui/icons-material/Add'
import { Ticket } from 'interfaces'

export default function FormDialog() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [des, setDes] = useState('')
  const [contactInfo, setContactInfo] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      title: title,
      description: des,
      contactInformation: contactInfo
    })
    handleClose()
    setTitle('')
    setDes('')
    setContactInfo('')
  }

  const mutation = useMutation({
    mutationFn: (newTicket: Ticket) => {
      return fetch(`http://localhost:8000/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTicket)
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets'])
    }
  })

  return (
    <div className="mr-5 self-center">
      <Button variant="outlined" onClick={handleClickOpen}>
        <AddIcon style={{ fontSize: 18 }} />
        New
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add new ticket please fill title, description, contact information.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="des"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="contactinfo"
              label="Contact Information"
              type="text"
              fullWidth
              variant="standard"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
            <DialogActions>
              <Button type="submit">Add Ticket</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
