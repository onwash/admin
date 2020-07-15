import React, { FC, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { makeStyles, createStyles, Paper } from "@material-ui/core";
import Iphone from "./../assets/iphone.png";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { GET_WASH_COORDINATES } from "../GraphQl";
import Err from "./../pages/404";

interface ISProps {}

const GET_WASH = gql`
  query getAllWashDescriptions($coordinatesId: String) {
    getAllWashDescriptions(coordinatesId: $coordinatesId) {
      washname
      postCount
      uptime
      adress
    }
  }
`;
const useStyles = makeStyles(() =>
  createStyles({
    pageWrapper: {
      display: "flex",
      flexDirection: "row",
    },
    Phonewrapper: {
      width: "434px",
      backgroundImage: `url(${Iphone})`,
      backgroundSize: "cover",
      height: "812px",
      zIndex: -1,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      paddingTop: 40,
    },
    map: {
      borderRadius: "20px",
      width: "370px",
      height: "780px",
    },
    optionList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "1vw 1vw ",
    },
  })
);

const S: FC<ISProps> = (props) => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(GET_WASH_COORDINATES);

  const [wash, setWash] = useState(null);
  const [getAllWashDescriptions, query] = useLazyQuery(GET_WASH);

  const [prepareCoordinates, setprepareCoordinates] = useState([]);

  const handlePlacemark = async (id: string) => {
    getAllWashDescriptions({
      variables: {
        coordinatesId: id,
      },
    });
  };
  React.useEffect(() => {
    if (query.data) {
      setWash(query.data.getAllWashDescriptions[0]);
    }
  }, [query.data]);

  React.useEffect(() => {
    if (data) {
      setprepareCoordinates(
        data.getWashCoordinates.map((i: any) => [i.latitude, i.longitude, i.id])
      );
    }
  }, [data]);
  console.log(wash);
  if (error) return <Err />;
  if (loading) return <div>loading</div>;
  return (
    <div>
      <div className={classes.Phonewrapper}>
        <YMaps>
          <Map
            className={classes.map}
            // width = '370px' height= '780px'
            defaultState={{ center: [59.96, 30.33], zoom: 10 }}
          >
            {
              prepareCoordinates.map((i: any) => (
                <Placemark
                  key={i[2]}
                  geometry={i}
                  onClick={() => handlePlacemark(i[2])}
                />
              )) //третий элемент в массиве это id
            }
          </Map>
        </YMaps>
      </div>

      <div style={{ position: "absolute", left: "50%", top: "15%" }}>
        {wash && (
          <Paper elevation={2} className={classes.optionList}>
            <div>Адрес: {wash.adress}</div>
            <div>Название: {wash.washname}</div>
            <div>Кол-во постов: {wash.postCount}</div>
            <div>Режим работы: {wash.uptime}</div>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default S;
