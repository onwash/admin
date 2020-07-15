import React, { useState } from "react";
import { Formik } from "formik";
import {
  Switch,
  TextField,
  Badge,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PanoramaFishEyeIcon from "@material-ui/icons/NotInterested";
import EditIcon from "@material-ui/icons/Edit";

import { MapOneSettigs } from "../../types";
import { gql, useMutation } from "@apollo/client";
import { GET_MAP_SETTINGS } from "../../containers/MapSettings";
import { MapIconSelectModal } from "./../MapIconSelectModal";

const CHANGE_MAP_SETTINGS = gql`
  mutation($mapSettingsInput: MapSettingsInput) {
    updateMapSettings(mapSettingsInput: $mapSettingsInput) {
      id
      title
      subtitle
      selected
      useInMapOption
      archived
      icon {
        id
        link
        size
        storeRoute
      }
      creator {
        login
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "30%",
      marginBottom: "1vh",
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    iconContainer: {
      verticalAlign: "bottom",
      height: "50px",
      width: "50px",
    },
    icon: {
      width: "100%",
      height: "100%",
    },
    details: {
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#fafafa",
    },
    column: {
      flexBasis: "70%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    card_detals_row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
  })
);

const MapOneSettig: React.FC<MapOneSettigs> = ({
  title,
  useInMapOption,
  archived,
  subtitle,
  icon,
  creator,
  id,
}) => {
  const classes = useStyles();
  const [isIconModalOpen, setIconModalOpen] = useState(false);
  const [updateMapSettings] = useMutation(
    CHANGE_MAP_SETTINGS
    // {
    //   update(cache, { data: { updateMapSettings } }) {
    //     const { getmapsettings } = cache.readQuery({ query: GET_MAP_SETTINGS });
    //     cache.writeQuery({
    //       query: GET_MAP_SETTINGS,
    //       data: { getmapsettings: getmapsettings.concat([updateMapSettings]) },
    //     });
    //   }
    // }
  );
  if (!title) return null;

  return (
    <Formik
      initialValues={{
        useInMapOption: useInMapOption,
        archived: archived,
        subtitle: subtitle,
        icon: icon,
      }}
      onSubmit={(values, actions) => {
        const mapSettingsInput = {
          useInMapOption: values.useInMapOption,
          archived: values.archived,
          subtitle: values.subtitle,
          // icon: values.icon,
          id,
        };
        updateMapSettings({
          variables: {
            mapSettingsInput,
          },
          refetchQueries: [
            {
              query: GET_MAP_SETTINGS,
            },
          ],
        });
        actions.setSubmitting(false);
      }}
    >
      {(props: any) => (
        <form onSubmit={props.handleSubmit}>
          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                style={{ backgroundColor: "#fafafa" }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
              >
                <div className={classes.column}>
                  <Typography className={classes.heading}>{title}</Typography>
                </div>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails className={classes.details}>
                <div className={classes.card_detals_row}>
                  <div style={{ width: "70%" }}>
                    <p style={{ fontSize: "16px", fontWeight: 300 }}>
                      Указывать в сортировке на карте?
                    </p>
                  </div>

                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Switch
                      color="primary"
                      checked={props.values.useInMapOption}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.useInMapOption}
                      name="useInMapOption"
                    />
                  </div>
                </div>

                <div className={classes.card_detals_row}>
                  <div style={{ width: "70%" }}>
                    <p style={{ fontSize: "16px", fontWeight: 300 }}>Архив?</p>
                  </div>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Switch
                      color="primary"
                      checked={props.values.archived}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.archived}
                      name="archived"
                    />
                  </div>
                </div>
                <MapIconSelectModal
                  open={isIconModalOpen}
                  setOpen={setIconModalOpen}
                  settingId={id}
                />
                <div className={classes.card_detals_row}>
                  <div style={{ width: "70%" }}>
                    <p style={{ fontSize: "16px", fontWeight: 300 }}>Иконка?</p>
                  </div>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Badge
                      badgeContent={
                        <EditIcon
                          style={{
                            color: "white",
                            fontSize: "10px",
                            cursor: "pointer",
                          }}
                        />
                      }
                      color="primary"
                      onClick={() => setIconModalOpen(!isIconModalOpen)}
                    >
                      {icon ? (
                        <div className={classes.iconContainer}>
                          <img
                            className={classes.icon}
                            src={props.values.icon}
                            alt="icon"
                          />
                        </div>
                      ) : (
                        <PanoramaFishEyeIcon />
                      )}
                    </Badge>
                  </div>
                </div>

                <div>
                  <TextField
                    label="Описание"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.subtitle}
                    name="subtitle"
                  />
                </div>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions style={{ backgroundColor: "#fafafa" }}>
                <span style={{ marginRight: "40%" }}>{creator.login}</span>
                <Button size="small">Отмена</Button>
                <Button size="small" color="primary" type="submit">
                  Сохранить
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default MapOneSettig;
