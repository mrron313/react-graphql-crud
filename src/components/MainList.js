import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  useQuery,
  useMutation,
  gql
} from "@apollo/client";
import MainListItem from './MainListItem';
import Alerts from '../helper-components/Alerts';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DialogModal from '../helper-components/DialogModal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    margin: '0px auto',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const GET_TESTS = gql`
  query {
    getTests {
      id
      name
    }
  }
`;

export default function MainList() {
  const classes = useStyles();

  const [dense, setDense] = React.useState(false);
  const [alertType, setAlertType] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const { loading, error, data, refetch } = useQuery(GET_TESTS);

  const handleAfterUpdate = () => {
    setAlertType('success');
    setAlertMessage('Edited!');
    refetch();
  }

  const handleAfterDelete = () => {
    setAlertType('success');
    setAlertMessage('Deleted!');
    refetch();
  }

  const handleAfterAdd = () => {
    setAlertType('success');
    setAlertMessage('Added!');
    refetch();
  }

  const handleAddClick = () => setIsOpen(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DialogModal 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            item={{}} 
            isAddModal
            handleAfterAdd={handleAfterAdd}
          />
          <Typography variant="span" className={classes.title}>
            Users
          </Typography>
          <IconButton edge="end" aria-label="delete">
              <AddIcon onClick={handleAddClick} />
          </IconButton>
          <div className={classes.demo}>
            <Alerts type={alertType} msg={alertMessage} />
            <List dense={dense}>

              {data && (
                <>
                  {data.getTests.map((user) => <MainListItem item={user} handleAfterUpdate={handleAfterUpdate} handleAfterDelete={handleAfterDelete} />
                  )}
                </>
              )}

            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}