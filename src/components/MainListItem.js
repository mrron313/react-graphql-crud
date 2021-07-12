import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import DialogModal from '../helper-components/DialogModal';
import { AccountCircle } from '@material-ui/icons';

import { gql, useMutation } from '@apollo/client';

const DELETE_TEST = gql`
  mutation ($id: Int!) {
    deleteTest(id: $id)
  }
`;

export default function MainListItem({item, handleAfterDelete, handleAfterUpdate}) {
    const [secondary, setSecondary] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const [deleteTest, { data }] = useMutation(DELETE_TEST);

    const handleEditClick = (e) => setIsOpen(true);

    return (
        <ListItem>
            <DialogModal 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                item={item} 
                handleAfterUpdate={handleAfterUpdate}
            />
            <ListItemAvatar>
                <Avatar>
                    <AccountCircle />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={item.name}
                secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <EditIcon onClick={handleEditClick} />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={e => {
                        e.preventDefault();
                        deleteTest({ variables: { id: item.id } });
                        handleAfterDelete();
                    }}/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
