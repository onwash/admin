import React from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_REGION } from "./query";

export default function () {
  const [createRegion, { data }] = useMutation(CREATE_NEW_REGION);
  console.log(data);
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          latitude: "",
          longitude: "",
          latitudeDelta: "",
          longitudeDelta: "",
        }}
        onSubmit={(values, actions) => {
          const regionInput = {
            name: values.name,
            latitude: +values.latitude,
            longitude: +values.longitude,
            latitudeDelta: +values.latitudeDelta,
            longitudeDelta: +values.longitudeDelta,
          };
          createRegion({ variables: { regionInput } });
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TextField
              style={{ marginTop: "1vh", marginBottom: "1vh" }}
              size="small"
              label="Название"
              variant="outlined"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            <TextField
              style={{ marginBottom: "1vh" }}
              size="small"
              label="Широта"
              variant="outlined"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.latitude}
              name="latitude"
            />
            <TextField
              style={{ marginBottom: "1vh" }}
              size="small"
              label="Долгота"
              variant="outlined"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.longitude}
              name="longitude"
            />
            <TextField
              style={{ marginBottom: "1vh" }}
              size="small"
              label="Широта дельта"
              variant="outlined"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.latitudeDelta}
              name="latitudeDelta"
            />
            <TextField
              style={{ marginBottom: "1vh" }}
              size="small"
              label="Долгота дельта"
              variant="outlined"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.longitudeDelta}
              name="longitudeDelta"
            />
            <Button
              size="small"
              variant="text"
              color="primary"
              endIcon={<NoteAddIcon />}
              onClick={() => {}}
              type="submit"
            >
              Сохранить
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}
