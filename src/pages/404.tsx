import React from 'react'
import Oimg from './../assets/404.png'
import clsx from 'clsx'
import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(() => 
  createStyles({
    container:{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems:'center'
    },
    wrapper:{ 
      display: 'flex' , 
      flexDirection: 'row', 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'center' 
    },
    opsText:{
      position: 'absolute',
      top: '17%',
      fontSize: '30px'
    },
    fourText:{
      fontSize: '140px', 
      marginRight:'1%' ,
      fontFamily: 'Merriweather, serif',
    },
    fourTextReverse:{
      transform: 'rotateY(180deg)',
      marginLeft: '1%',
    }
  }))

export default () => {
  const classes = useStyles()
  return(
    <div className = { classes.container} >
      <p className={ classes.opsText}>....Oops</p>
      <div className = {classes.wrapper}>
        <p className = {classes.fourText}>4</p>
        <div style = {{ width: '10%'}}>
          <img src = {Oimg} alt = '0' style = {{width: '100%'}} />
        </div>
        <p className = { clsx( [classes.fourText, classes.fourTextReverse ])}>4</p>
      </div>
      <p className = { classes.opsText} style = {{ top: '50%'}}>some error</p>
    </div>
  )
}