import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core'

import PersonPinIcon from '@material-ui/icons/PersonPin';
import ChatIcon from '@material-ui/icons/Chat';
import MapIcon from '@material-ui/icons/Map'
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import EditLocationIcon from '@material-ui/icons/EditLocation';

import { CommentsTab, MapTab, UsersTab, WashsTab, MapSetTab } from './../containers'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Пользователи"  icon={<PersonPinIcon />}/>
          <Tab label="Мойки"  icon={<LocalCarWashIcon />}/>
          <Tab label="Карта" icon={<MapIcon />} />
          <Tab label="Настройки карты" icon={<EditLocationIcon />} />
          <Tab label="Комментарии" icon={<ChatIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <UsersTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WashsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MapTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MapSetTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CommentsTab />
      </TabPanel>
    </div>
  );
}
