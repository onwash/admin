import React, { FC } from "react";
import MaterialTable from "material-table";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./../GraphQl";
import Test from "./Test";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// ОЧЕНЬ ДЕРЬМОВЫЙ КОМПОНЕНТ В Таблице дата получает из значение из юзКвери, но только после того как исполница юзфект и это тащит за собой большое количество перересовок надо поместить туда промис!

interface ISProps {}

const S: FC<ISProps> = (props) => {
  const { data, loading } = useQuery(GET_ALL_USERS);
  const [prepareData, setPreparData] = React.useState();
  //const dynamicLookupObject = { field: "region", }

  React.useEffect(() => {
    if (data) {
      const sec = data.getAllUsers.map((i: any) => ({
        role: i.role,
        email: i.email,
        login: i.login,
        region: i.region === null ? null : i.region.name,
      }));
      setPreparData(sec);
    }
  }, [data]);

  if (loading) return <p>loading...</p>;
  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        columns={[
          { title: "Роль", field: "role" },
          { title: "Почта", field: "email" },
          { title: "Имя", field: "login" },
          { title: "Регион", field: "region" },
        ]}
        data={prepareData}
        detailPanel={[
          {
            icon: () => <AccountCircleIcon color="primary" />,
            tooltip: "Показать дополнительные данные",
            render: (rowData) => <Test />,
          },
        ]}
        title="Список Всех пользователей"
      />
    </div>
  );
};

export default S;
