import { Visibility } from '@material-ui/icons';
import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';


export default function StackedBar(props) {

  if(props.currentPage==20 && props.now >= 75){
    alert("wooh ! congratulations you passed the test")
    return;
  }
  return (
    <>
    <ProgressBar className='stackedBar'>
    <span>Score: {props.now }%</span>
    <span className='maxMarks'>Required Score : 75%</span>
    <ProgressBar striped variant="success" now={props.now} key={1} style={{backgroundColor:"green"}} label={`${props.now}%`} visuallyHidden/>
  </ProgressBar>
</>
  )
}
