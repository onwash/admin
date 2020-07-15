import React, { useState, useEffect } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import {
  TextField,
  Divider,
  MenuItem,
  Dialog,
  Button,
} from "@material-ui/core";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_REGIONS } from "./../../GraphQl";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import MultiSelectServiceList from "./MultiSelectServiceList";
import { GET_WASH } from "./../../containers/Washs";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const CREATE_WASH_COORDINATES = gql`
  mutation createWashCoordinates($washCoordinatesInput: WashCoordinatesInput) {
    createWashCoordinates(washCoordinatesInput: $washCoordinatesInput) {
      id
    }
  }
`;
const CREATE_WASH_DESC = gql`
  mutation($washDescriptionInput: WashDescriptionInput) {
    createWashDescription(washDescriptionInput: $washDescriptionInput) {
      coordinatesId
      washname
      adress
      uptime
      options {
        title
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

export default function () {
  const [open, setOpen] = useState(false);
  const query = useQuery(GET_REGIONS);
  const [createWashCoordinates, { data }] = useMutation(
    CREATE_WASH_COORDINATES
  );

  const [createWashDescription] = useMutation(CREATE_WASH_DESC, {
    update(cache, { data: { createWashDescription } }) {
      const { getAllWashDescriptions }: any = cache.readQuery({
        query: GET_WASH,
      });
      console.log(getAllWashDescriptions);
      cache.writeQuery({
        query: GET_WASH,
        data: {
          getAllWashDescriptions: getAllWashDescriptions.concat([
            createWashDescription,
          ]),
        },
      });
    },
  });

  const [newWashId, setNewWashId] = useState(null);
  const [servicesValues, setServicesValues] = React.useState([]);

  useEffect(() => {
    if (data) setNewWashId(data.createWashCoordinates.id);
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        size="small"
        startIcon={<NoteAddIcon />}
        color="primary"
      >
        Добавить новую мойку
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Добавить новую мойку"}
        </DialogTitle>
        <Formik
          initialValues={{
            longitude: "",
            latitude: "",
          }}
          onSubmit={(values, actions) => {
            createWashCoordinates({
              variables: {
                washCoordinatesInput: {
                  longitude: +values.longitude,
                  latitude: +values.latitude,
                },
              },
            });
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <DialogContent style={{ padding: "0 24px" }}>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ marginBottom: 0 }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <TextField
                      style={{
                        marginTop: "1vh",
                        marginBottom: "1vh",
                        marginRight: "1vw",
                      }}
                      size="small"
                      label="Широта"
                      variant="outlined"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.latitude}
                      name="latitude"
                    />

                    <TextField
                      style={{ marginTop: "1vh", marginBottom: "1vh" }}
                      size="small"
                      label="Долгота"
                      variant="outlined"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.longitude}
                      name="longitude"
                    />
                  </div>
                </DialogContentText>
              </DialogContent>
              <Divider style={{ margin: "5px 0" }} />
              {newWashId === null ? (
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
              ) : (
                <div>
                  <Formik
                    initialValues={{
                      coordinatesId: newWashId,
                      washname: "",
                      adress: "",
                      uptime: "",
                      postCount: 0,
                      region: "",
                    }}
                    onSubmit={(values, actions) => {
                      const optionsID = servicesValues.map((i: any) => i.id);
                      createWashDescription({
                        variables: {
                          washDescriptionInput: {
                            postCount: values.postCount,
                            coordinatesId: values.coordinatesId,
                            washname: values.washname,
                            adress: values.adress,
                            uptime: values.uptime,
                            options: optionsID,
                            region: values.region,
                          },
                        },
                      });
                      setNewWashId(null);
                      actions.setSubmitting(false);
                      actions.resetForm({});
                      handleClose();
                    }}
                  >
                    {(props) => (
                      <form
                        onSubmit={props.handleSubmit}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <TextField
                          style={{ margin: "1% 10%", width: "80%" }}
                          size="small"
                          label="Id"
                          variant="outlined"
                          disabled={true}
                          value={newWashId}
                          name="coordinatesId"
                        />
                        <div>
                          <TextField
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{ margin: "1% 5%", width: "40%" }}
                            size="small"
                            label="Название"
                            variant="outlined"
                            value={props.values.washname}
                            name="washname"
                          />
                          <TextField
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{ margin: "1% 5%", width: "40%" }}
                            size="small"
                            label="Адрес"
                            variant="outlined"
                            value={props.values.adress}
                            name="adress"
                          />
                        </div>
                        <div>
                          <TextField
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{ margin: "1% 5%", width: "40%" }}
                            size="small"
                            label="График работы"
                            variant="outlined"
                            value={props.values.uptime}
                            name="uptime"
                          />
                          <TextField
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            style={{ margin: "1% 5%", width: "40%" }}
                            size="small"
                            label="Кол-во постов"
                            variant="outlined"
                            value={props.values.postCount}
                            name="postCount"
                          />
                        </div>
                        <div>
                          <TextField
                            style={{ margin: "1% 5%", width: "40%" }}
                            name="region"
                            select
                            size="small"
                            label="Выбрать регион"
                            value={props.values.region}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText="Выбрать регион"
                            variant="outlined"
                          >
                            {query.data.getRegions.map((item: any) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                          <Button
                            onClick={() => alert("в разработке")}
                            style={{ margin: "1% 5%", width: "40%" }}
                            variant="contained"
                            startIcon={<AddAPhotoIcon />}
                          >
                            Добавить фото
                          </Button>
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <MultiSelectServiceList
                            value={servicesValues}
                            setValue={setServicesValues}
                          />
                        </div>
                        <Button type="submit">Создать</Button>
                      </form>
                    )}
                  </Formik>
                </div>
              )}
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
