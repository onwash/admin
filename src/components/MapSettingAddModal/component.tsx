import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import { Checkbox, TextField } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { GET_MAP_SETTINGS } from "../../containers/MapSettings";

const CREATE_MAP_SETTINGS = gql`
  mutation createMapSettings($mapSettingsInput: MapSettingsInput) {
    createMapSettings(mapSettingsInput: $mapSettingsInput) {
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

const MapSettingAddModal = () => {
  const [open, setOpen] = React.useState(false);
  const [createMapSettings] = useMutation(CREATE_MAP_SETTINGS, {
    update(cache, { data: { createMapSettings } }) {
      const { getmapsettings }: any = cache.readQuery({
        query: GET_MAP_SETTINGS,
      });
      cache.writeQuery({
        query: GET_MAP_SETTINGS,
        data: { getmapsettings: getmapsettings.concat([createMapSettings]) },
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Добавить услугу
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Добавить новую опцию к мойке"}
        </DialogTitle>
        <Formik
          initialValues={{
            title: "",
            useInMapOption: false,
            subtitle: "",
          }}
          onSubmit={(values, actions) => {
            createMapSettings({
              variables: {
                mapSettingsInput: {
                  title: values.title,
                  subtitle: values.subtitle,
                  useInMapOption: values.useInMapOption,
                },
              },
            });

            actions.setSubmitting(false);
            setOpen(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Название </p>
                    <TextField
                      style={{
                        marginTop: "1vh",
                        marginBottom: "1vh",
                        marginLeft: ".3vw",
                      }}
                      size="small"
                      label="Название"
                      variant="outlined"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Описание</p>
                    <TextField
                      style={{
                        marginTop: "1vh",
                        marginBottom: "1vh",
                        marginLeft: ".3vw",
                      }}
                      size="small"
                      label="Название"
                      variant="outlined"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.subtitle}
                      name="subtitle"
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p>Использовать в настройках карты</p>
                    <Checkbox
                      checked={props.values.useInMapOption}
                      value={props.values.useInMapOption}
                      name="useInMapOption"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      inputProps={{ "aria-label": "primary checkbox" }}
                    />
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Oтменить
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  color="primary"
                  autoFocus
                >
                  Сохранить
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};
export default MapSettingAddModal;
