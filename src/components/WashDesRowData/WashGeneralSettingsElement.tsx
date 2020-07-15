import React, { useState, FC } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField,
  Switch,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles({
  openIcon: {
    color: "#3f51b5",
  },
  closeIcon: {
    color: "rgba(63,81,181, .5)",
  },
  nested: {
    paddingLeft: "10px",
  },
});

interface IsettingElememt {
  title: string;
  field: boolean | string;
  icon: any;
  fieldKey: string;
  canOverwrite?: boolean;
  editFnc?: (field: any, value: any) => void;
}
const WashGeneralSettingsElement: FC<IsettingElememt> = ({
  title,
  field,
  icon,
  fieldKey,
  editFnc,
  canOverwrite,
}) => {
  const [open, setOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState<string | boolean>(field);
  const [isCanOverwrite] = useState<boolean>(canOverwrite ? true : false);
  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const takeFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof field === "boolean") return setFieldValue(event.target.checked);
    setFieldValue(event.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <ListItem button onClick={handleClick.bind(null, field)}>
        <ListItemIcon>
          {" "}
          <div className={clsx(open ? classes.openIcon : classes.closeIcon)}>
            {" "}
            {icon}
          </div>{" "}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            {isCanOverwrite && (
              <ListItemIcon
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                {" "}
                {edit ? (
                  <SaveIcon
                    color="secondary"
                    onClick={editFnc.bind(null, fieldKey, fieldValue)}
                  />
                ) : (
                  <EditIcon style={{ color: "#228B22" }} />
                )}{" "}
              </ListItemIcon>
            )}

            {typeof field === "boolean" ? (
              edit ? (
                <Switch
                  //@ts-ignore
                  checked={fieldValue}
                  onChange={takeFieldValue}
                  name="switch"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              ) : (
                <ListItemText secondary={field ? "Активно" : "Не активно"} />
              )
            ) : edit ? (
              <TextField
                id="outlined-basic"
                label={title}
                variant="outlined"
                value={fieldValue}
                onChange={takeFieldValue}
              />
            ) : (
              <ListItemText secondary={field} />
            )}
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default WashGeneralSettingsElement;
