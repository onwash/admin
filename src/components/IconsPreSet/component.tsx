import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "43vw",
      height: "60vh",
      display: "flex",
      flexWrap: "wrap",
      overflowY: "scroll",
    },
    iconWrapper: {
      width: "50px",
      height: "50px",
      padding: "5px",
      border: "0.5px solid rgba(0,0,0,.05)",
      boxShadow: " 0 0.25rem 0.125rem 0 rgba(0,0,0,.05)",
      margin: "5px",
    },
    icon: {
      color: "rgba(0, 0, 0, 0.54)",
      width: "100%",
      height: "100%",
    },
  })
);

interface IIconsPreSet {}

const IconsPreSet: FC<IIconsPreSet> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {iconsdata.map((icon: any) => (
        <div key={icon.id} className={classes.iconWrapper}>
          <img className={classes.icon} src={icon.link} alt="ico" />
        </div>
      ))}
    </div>
  );
};
export default IconsPreSet;

const iconsdata = [
  {
    link: "https://image.flaticon.com/icons/svg/3154/3154193.svg",
    id: 1,
  },
];

for (let i = 1; i < 40; i++) {
  const obj = {
    link: "https://image.flaticon.com/icons/svg/3154/3154193.svg",
    id: i,
  };
  iconsdata.push(obj);
}
