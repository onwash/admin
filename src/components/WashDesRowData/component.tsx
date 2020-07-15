import React, { FC, useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  CardActions,
  Card,
  CardContent,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  ListSubheader,
} from "@material-ui/core";

import clsx from "clsx";

import ExploreIcon from "@material-ui/icons/Explore";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import BlockIcon from "@material-ui/icons/Block";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import WashGeneralSettingsElement from "./WashGeneralSettingsElement";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "row",
    },
    root: {
      alignItems: "center",
      margin: "1% 2%",
      width: "100%",
      maxWidth: 260,
      backgroundColor: theme.palette.background.paper,
    },
    openIcon: {
      color: "#3f51b5",
    },
    rootCard: {
      marginLeft: "2%",
      margin: "1%",
      minWidth: 240,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    miniTableHeader: {
      backgroundColor: "rgb(238, 238, 238)",
    },
    miniTableRow: {
      "&:hover": {
        background: "#d3d3d3",
      },
    },
    miniTableRowImage: {
      width: "32px",
      height: "32px",
    },
    editMapSettingsRoot: {
      width: "100%",
      maxWidth: 360,
      marginLeft: "10px",
      backgroundColor: theme.palette.background.paper,
    },
    editBlock: {
      padding: "20px",
      paddingTop: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "start",
    },
  })
);

const WashSettingMiniTable = ({ options }: any) => {
  const classes = useStyles();
  return (
    <Table size="small">
      <TableHead className={classes.miniTableHeader}>
        <TableRow>
          <TableCell>Ico</TableCell>
          <TableCell align="right">Название</TableCell>
          <TableCell align="right">Архив</TableCell>
          <TableCell align="right">На карте</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {options.map((row: any) => (
          <TableRow key={row.id} className={classes.miniTableRow}>
            <TableCell align="center" className={classes.miniTableRowImage}>
              {row.icon ? (
                <img
                  src={row.icon}
                  alt="icon"
                  className={classes.miniTableRowImage}
                />
              ) : (
                <BlockIcon />
              )}
            </TableCell>
            <TableCell align="center">{row.title}</TableCell>
            <TableCell align="center">
              {row.archived ? <p style={{ color: "#4caf50" }}>Да</p> : "Нет"}
            </TableCell>
            <TableCell align="right">
              {row.useInMapOption ? (
                <p style={{ color: "#4caf50" }}>Да</p>
              ) : (
                "Нет"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const WashOptionWithEdit = ({ options, allOpts, loading, washId }: any) => {
  const classes = useStyles();
  const [edit, setEdit] = useState<boolean>(false);
  const [allFilteredOpts, setAllFilteredOpts] = useState([]);
  const [optsForChange, setOptsForChange] = useState([...options]);
  const [updateWashDescriptionOpts] = useMutation(UPDATE_DESC_OPTS);

  const saveChanges = () => {
    const onlyidArr = optsForChange.map((el: any) => ({ id: el.id }));
    updateWashDescriptionOpts({
      variables: {
        washDescriptionForOptUpdateInput: { washId, options: onlyidArr },
      },
    });
    setEdit(!edit);
  };

  const prepareAllOpts = () => {
    if (!options || !allOpts) return;

    let keysOption: any = {};
    for (const key of options.values()) {
      keysOption[key.id] = key.id;
    }
    setAllFilteredOpts(
      allOpts.getmapsettings.map((set: any) => {
        if (set.id === keysOption[set.id]) {
          return { ...set, selected: true };
        }
        return set;
      })
    );
  };

  useEffect(() => {
    prepareAllOpts();
  }, [loading]);

  return (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography
          className={clsx([classes.title, classes.openIcon])}
          color="textSecondary"
          gutterBottom
        >
          Добавленные к мойке опции
        </Typography>
        {<WashSettingMiniTable options={options} />}
      </CardContent>
      <CardActions>
        {edit ? (
          <div className={classes.editBlock}>
            <Button
              size="small"
              variant="text"
              onClick={() => saveChanges()}
              color="primary"
            >
              Сохранить
            </Button>
            <SwitchListSecondary
              washId={washId}
              usingOptions={allFilteredOpts}
              setAllFilteredOpts={setAllFilteredOpts}
              optsForChange={optsForChange}
              setOptsForChange={setOptsForChange}
            />
          </div>
        ) : (
          <Button
            size="small"
            variant="text"
            onClick={() => setEdit(!edit)}
            color="primary"
          >
            {loading ? "Загрузка..." : "Редактировать"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const UPD_MAP_DESC = gql`
  mutation updateWashDescription($washDescriptionInput: WashDescriptionInput) {
    updateWashDescription(washDescriptionInput: $washDescriptionInput) {
      id
      coordinatesId
      washname
      adress
      showonmap
      uptime
      options {
        id
        title
        subtitle
        selected
        useInMapOption
        archived
        icon {
          id
        }
      }
      social {
        raiting
        likesCount {
          count
        }
        views {
          count
        }
      }
      postCount
      region {
        name
      }
    }
  }
`;

const WashDesRowData: FC<any> = ({ rowData }) => {
  const { error, loading, data } = useQuery(GET_MAP_SETTINGS);
  const [updateWashDescription] = useMutation(UPD_MAP_DESC);
  const classes = useStyles();

  const editFnc = (fieldKey: any, value: any) => {
    let washDescriptionInput = { ...rowData, [fieldKey]: value };
    delete washDescriptionInput.social;
    delete washDescriptionInput.region;
    delete washDescriptionInput.tableData;
    delete washDescriptionInput.__typename;
    const x = washDescriptionInput.options.map((i: any) => {
      return i.id;
    });
    delete washDescriptionInput.options;
    washDescriptionInput = { ...washDescriptionInput, options: x };

    updateWashDescription({
      variables: {
        washDescriptionInput,
      },
    });
  };
  // React.useEffect(() => {
  //   if (loading) return;
  //   if (!data) return;
  // }, [data, loading]);

  if (loading) return <span>loading</span>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    <div className={classes.wrapper}>
      <Paper elevation={1} className={classes.root}>
        <ListSubheader component="div" className={classes.openIcon}>
          Общие настройки
        </ListSubheader>
        <Divider />
        <WashGeneralSettingsElement
          canOverwrite={true}
          editFnc={editFnc}
          title="Адрес"
          fieldKey="adress"
          field={rowData.adress}
          icon={<ExploreIcon />}
        />
        <Divider />
        <WashGeneralSettingsElement
          editFnc={editFnc}
          canOverwrite={true}
          title="Название"
          fieldKey="washname"
          field={rowData.washname}
          icon={<OpenInBrowserIcon />}
        />
        <WashGeneralSettingsElement
          editFnc={editFnc}
          canOverwrite={true}
          title="Кол-во постов"
          fieldKey="postCount"
          field={rowData.postCount}
          icon={<OpenInBrowserIcon />}
        />
        <Divider />
        <WashGeneralSettingsElement
          editFnc={editFnc}
          title="Регион"
          fieldKey="region.name"
          field={rowData.region.name}
          icon={<LocationCityIcon />}
        />
        <Divider />
        <WashGeneralSettingsElement
          editFnc={editFnc}
          title="Часы работы"
          fieldKey="uptime"
          canOverwrite={true}
          field={rowData.uptime}
          icon={<QueryBuilderIcon />}
        />
        <Divider />
        <WashGeneralSettingsElement
          editFnc={editFnc}
          fieldKey="showonmap"
          title="Использование на карте"
          canOverwrite={true}
          field={rowData.showonmap}
          icon={<NotListedLocationIcon />}
        />
      </Paper>
      <WashOptionWithEdit
        options={rowData.options}
        allOpts={data}
        loading={loading}
        washId={rowData.id}
      />
    </div>
  );
};
const UPDATE_DESC_OPTS = gql`
  mutation updateWashDescriptionOpts(
    $washDescriptionForOptUpdateInput: WashDescriptionForOptUpdateInput
  ) {
    updateWashDescriptionOpts(
      washDescriptionForOptUpdateInput: $washDescriptionForOptUpdateInput
    ) {
      coordinatesId
      washname
      adress
      uptime
      options {
        id
        title
        subtitle
        useInMapOption
        archived
        icon {
          link
        }
      }
      social {
        raiting
      }
      postCount
      region {
        name
      }
      id
    }
  }
`;

const GET_MAP_SETTINGS = gql`
  query {
    getmapsettings {
      id
      title
      selected
      icon {
        id
        link
        storeRoute
      }
    }
  }
`;
//TODO: описать options
type options = any;
const SwitchListSecondary: FC<options> = ({
  usingOptions,
  setAllFilteredOpts,
  washId,
  optsForChange,
  setOptsForChange,
}) => {
  const classes = useStyles();

  const handleToggle = (value: any) => () => {
    const newOpt = { ...value, selected: !value.selected, washId };
    const currentIndex = usingOptions.indexOf(value);
    let arr = [...usingOptions];
    arr.splice(currentIndex, 1, newOpt);
    filteredArr(newOpt);
    setAllFilteredOpts(arr);
  };

  const filteredArr = (el: any) => {
    const filter = optsForChange.find((f: any) => f.id === el.id);
    if (filter === undefined) {
      return setOptsForChange([...optsForChange, el]);
    } else {
      const idx = optsForChange.findIndex((f: any) => f.id === el.id);
      const newArr = [...optsForChange];
      newArr.splice(idx, 1);
      return setOptsForChange(newArr);
    }
  };

  if (!usingOptions) return <p>Ошибка</p>;
  return (
    <List className={classes.editMapSettingsRoot}>
      {usingOptions.map((opt: any) => {
        return (
          <ListItem key={opt.id}>
            <ListItemIcon>
              <img src={opt.link} alt="img" />
            </ListItemIcon>
            <ListItemText id={opt.id} primary={opt.title} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggle(opt)}
                checked={opt.selected}
                inputProps={{
                  "aria-labelledby": `switch-list-label-${opt.title}`,
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default WashDesRowData;
// +adress: "Лабораторный пр., 20,"
// coordinatesId: "5ec2b767613f1585b65b286d"
// id: "5ec2b7a4613f1585b65b286e"
// options: (2) [{…}, {…}]
// postCount: 6
// +region: {name: "Петербург", __typename: "Region"}
// social: {raiting: 0, __typename: "WashDescriptionSocial"}
// tableData: {id: 0, showDetailPanel: ƒ}
// +uptime: "24/7"
// washname: "Мойка на Лабораторном"
// __typename: "WashDescription"
