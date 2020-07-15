import React, { FC, useState } from "react";
import MaterialTable from "material-table";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { WasheDescAddModal } from "../components/WasheDescAddModal";
import { WashDesRowData } from "../components/WashDesRowData";
import Err from "./../pages/404";

export const GET_WASH = gql`
  query {
    getAllWashDescriptions {
      coordinatesId
      washname
      adress
      showonmap
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

interface ISProps {}

const Title = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ marginBottom: "5px" }}>Список всех добавленых моек</h3>
      <WasheDescAddModal />
    </div>
  );
};

const Washs: FC<ISProps> = (props) => {
  const { data, error, loading } = useQuery(GET_WASH);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleClick = async (func: any, row: any) => {
    await func();
    await setSelectedRow(row);
  };

  React.useEffect(() => {
    if (!data) return;
  }, [data]);

  if (error) return <Err />;
  if (loading) return <div>loading</div>;

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "Название", field: "washname" },
          { title: "Адрес", field: "adress" },
        ]}
        data={data.getAllWashDescriptions}
        title={<Title />}
        detailPanel={(rowData) => {
          return (
            <div>
              <WashDesRowData rowData={rowData} />
            </div>
          );
        }}
        //@ts-ignore
        localization={{ toolbar: { searchPlaceholder: "Найти..." } }}
        onRowClick={(event, selectedRow, togglePanel) =>
          handleClick(togglePanel, selectedRow)
        }
        options={{
          pageSize: 10,
          searchFieldStyle: {
            border: "1px solid rgba(0, 0, 0, 0.14)",
            borderRadius: "10px",
            padding: "10px 5px",
          },
          rowStyle: (rowData) => ({
            //@ts-ignore
            backgroundColor:
              selectedRow && selectedRow.tableData.id === rowData.tableData.id
                ? "#EEE"
                : "#FFF",
            //@ts-ignore
            color:
              selectedRow && selectedRow.tableData.id === rowData.tableData.id
                ? "rgba(0, 0, 0, .9)"
                : "rgba(0, 0, 0, .5)",
            fontSize: "16px",
          }),
        }}
      />
    </div>
  );
};

export default Washs;
