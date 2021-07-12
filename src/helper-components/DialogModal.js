import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { gql, useMutation } from '@apollo/client';

const CREATE_TEST = gql`
  mutation ($name: String!) {
    createTest(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_TEST = gql`
  mutation ($id: Int!, $name: String!) {
    updateTest(id: $id, name: $name) {
      id
      name
    }
  }
`;

export default function DialogModal({isOpen, item, setIsOpen, isAddModal, handleAfterAdd, handleAfterUpdate}) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: item.id || '',
    name: item.name || ''
  });

  const [updateTest, { data }] = useMutation(UPDATE_TEST);
  const [createTest, { createData }] = useMutation(CREATE_TEST);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTest({ variables: { id: formData.id, name: formData.name} });
    setOpen(false);
    setIsOpen(false);
    handleAfterUpdate();
  }

  const handleAdd = (e) => {
    e.preventDefault();
    createTest({ variables: { name: formData.name} });
    setOpen(false);
    setIsOpen(false);
    handleAfterAdd();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          { isAddModal ? 'Add User' : 'Edit User' }
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={formData.name || ''}
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={ isAddModal ? handleAdd : handleUpdate} color="primary">
            { isAddModal ? 'Add ' : 'Update' }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}