import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "43vw",
      height: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    dropArea: {
      border: "1px dashed rgba(0, 0, 0, 0.54)",
      borderRadius: "20px",
      width: "100%",
      height: "350px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    insideDropArea: {
      backgroundColor: "aliceblue",
    },
    header: {
      marginTop: theme.spacing(1),
      color: "rgba(0, 0, 0, 0.54)",
    },
    icon: {
      color: "rgba(0, 0, 0, 0.54)",
      width: "20vw",
      height: "auto",
    },
  })
);

interface IDropArea {
  data: any;
  dispatch: any;
}

const DropArea: FC<IDropArea> = ({ data, dispatch }) => {
  const classes = useStyles();
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    if (data.dropDepth > 0) return;
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let files: any = [...e.dataTransfer.files];
    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f: any) => f.name);
      files = files.filter((f: any) => !existingFiles.includes(f.name));

      dispatch({ type: "ADD_FILE_TO_LIST", files });
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };
  return (
    <div className={classes.root}>
      <div
        className={clsx(
          data.inDropZone ? classes.insideDropArea : null,
          classes.dropArea
        )}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <h4 className={classes.header}>
          Переместите изображение в эту область
        </h4>
        <CloudUploadIcon className={classes.icon} />
      </div>
    </div>
  );
};
export default DropArea;
