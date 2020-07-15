import React, { FC, useState } from "react";
import { DropArea } from "./../DropArea";
import { IconsPreSet } from "./../IconsPreSet";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import { uploadIconApi } from "./../../core/api/index";

interface IModal {
  open: boolean;
  setOpen: any;
  settingId: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #000",
      boxShadow: theme.shadows[5],
    },
  })
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TransitionsModal: FC<IModal> = ({ open, setOpen, settingId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      case "CLEAN_UP_FILE_LIST":
        return {
          ...state,
          dropDepth: 0,
          inDropZone: false,
          fileList: [],
        };
      default:
        return state;
    }
  };

  const [data, dispatch] = React.useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (data.fileList.length !== 0) {
      try {
        uploadIconApi
          .upload(data.fileList[0], settingId)
          .then(() => handleClose());
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "CLEAN_UP_FILE_LIST" });
      }
    }
  }, [data.fileList]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Добавить новую" {...a11yProps(0)} />
                <Tab label="Выбрать из существующих" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <div>
              <TabPanel value={value} index={0} dir={theme.direction}>
                <DropArea data={data} dispatch={dispatch} />
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <IconsPreSet />
              </TabPanel>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
