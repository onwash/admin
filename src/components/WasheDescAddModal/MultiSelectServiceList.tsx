import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);
const GET_OPTIONS_LIST = gql`
    query{
    getmapsettings{
      title
      id
    }
  }
`
export default function Tags({value, setValue}:any) {
  const classes = useStyles();
  const { data, loading, error} = useQuery(GET_OPTIONS_LIST)
if(loading) return <div>loading...</div>
if(error) return <div>{`error:  ${error}`}</div>
  return (
    <div className={classes.root}>

      <Autocomplete
        value={value}
        onChange={(event: any, newValue: any) => {
          setValue(newValue);
        }}
        multiple
        id="tags-standard"
        options={data.getmapsettings}
        //@ts-ignore
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant = "outlined"
            label = "Выбрать сервисы"
            placeholder = "Сервисы"
            size = 'small'
          />
        )}
      />
    </div>
  );
}
