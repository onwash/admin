import React, { useState, } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import {Typography,  TextField, makeStyles, Dialog, Button } from '@material-ui/core'

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'    
import AddForm from './AddForm';


const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles({
  regionPaper: { 
    marginRight: '5vw', 
    padding: '.5vw 1vw', 
    cursor: 'pointer',
    fontWeight: 400
  },
})

const MapSettingRegion = ( {regions}:any) =>{
  const [open, setOpen] = useState(false)
  const [selectedRegion, setSelectedregion]  = useState(null)
  const [addMenu, setAddMenu] = useState(false)
  
  const styles = useStyles()
  const regionProps = ['Широта', 'Долгота','Широта дельта' , 'Долгота дельта']

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const addNewRegion = () =>{
    setSelectedregion(null)
    setAddMenu(true)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Настройки регионов
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth='md' fullWidth = {true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Настройки региона
        </DialogTitle>
        <DialogContent dividers style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style = {{ marginRight: '6vw', display: 'flex', flexDirection: 'column', maxWidth: '32%'}}>
            Регион:
            <br />
          { 
            addMenu ? 
              <AddForm />
            :
            <Button
              size='small'
              variant="text"
              color="primary"
              endIcon={<AddCircleOutlineIcon />}
              onClick = { ()=> addNewRegion()}
            >
                Добавить
            </Button>
          }
          </div>
          <div>

            {
              regions.map( (i:any) =>
                <Button
                  key = { i.id }
                  color = 'primary'
                  variant = { selectedRegion === i ? 'contained' : 'outlined'} 
                  onClick = { () => {
                    setAddMenu(false)
                    setSelectedregion(i)
                  } }
                  className = {styles.regionPaper}>
                    {i.name}
                </Button> 
              )   
            }
            
          </div>

          <div style ={{width: '20vw'}}>
{
  selectedRegion ? 
  <>
      <TextField
        style = {{ marginBottom: '1vh'}}
        size = 'small'
      //@ts-ignore
        id={selectedRegion.id}
        label={regionProps[0]}
          //@ts-ignore
        defaultValue={selectedRegion.latitude}
        variant="outlined"
    />
      <TextField
        style = {{ marginBottom: '1vh'}}
        size = 'small'
      //@ts-ignore
        id={selectedRegion.id}
        label={regionProps[1]}
          //@ts-ignore
        defaultValue={selectedRegion.longitude}
        variant="outlined"
    />
      <TextField
        style = {{ marginBottom: '1vh'}}
        size = 'small'
      //@ts-ignore
        id={selectedRegion.id}
        label={regionProps[2]}
          //@ts-ignore
        defaultValue={selectedRegion.latitudeDelta}
        variant="outlined"
    />
      <TextField
        size = 'small'
      //@ts-ignore
        id={selectedRegion.id}
        label={regionProps[3]}
          //@ts-ignore
        defaultValue={selectedRegion.longitudeDelta}
        variant="outlined"
    />
    </>
  : <div />
}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Сохранить изменения
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default  MapSettingRegion