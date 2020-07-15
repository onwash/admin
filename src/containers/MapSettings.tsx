import React, { FC } from "react";

import { gql, useQuery } from "@apollo/client";

import { MapSettingsCard } from "../components/MapSettingCard";
import { makeStyles } from "@material-ui/core/styles";
import { MapOneSettigs } from "../types";
import { MapSettingsAddCard } from "../components/MapSettingAddModal";
import { MapSettingRegion } from "../components/MapSettingRegion";
import { Button } from "@material-ui/core";

export const GET_MAP_SETTINGS = gql`
  query {
    getmapsettings {
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
    getRegions {
      id
      name
      latitude
      longitude
      latitudeDelta
      longitudeDelta
    }
  }
`;

interface ISProps {}
//@ts-ignore
const S: FC<ISProps> = (props) => {
  const classes = useStyles();
  const [useArhive, setUseArhive] = React.useState(false);
  const { data, loading, error } = useQuery(GET_MAP_SETTINGS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const archivedMapSettings = data.getmapsettings.filter(
    (i: MapOneSettigs) => i.archived === true
  );
  const worksMapsettings = data.getmapsettings.filter(
    (i: MapOneSettigs) => i.archived === false
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "30%",
            justifyContent: "space-between",
          }}
        >
          <MapSettingsAddCard />
          <Button color="secondary" onClick={() => setUseArhive(!useArhive)}>
            Архив{" "}
          </Button>
        </div>
        <MapSettingRegion regions={data.getRegions} />
      </div>
      <div className={classes.container}>
        {!useArhive
          ? worksMapsettings.map((i: MapOneSettigs) => (
              <MapSettingsCard
                key={i.id}
                title={i.title}
                subtitle={i.subtitle}
                useInMapOption={i.useInMapOption}
                archived={i.archived}
                creator={i.creator}
                id={i.id}
                icon={i.icon}
              />
            ))
          : archivedMapSettings.map((i: MapOneSettigs) => (
              <MapSettingsCard
                key={i.id}
                title={i.title}
                subtitle={i.subtitle}
                useInMapOption={i.useInMapOption}
                archived={i.archived}
                creator={i.creator}
                id={i.id}
                icon={i.icon}
              />
            ))}
      </div>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    paddingTop: "2vh",
  },
});

export default S;
