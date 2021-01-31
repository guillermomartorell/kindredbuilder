import React from 'react'
import classses from './Backdrop.module.css'

const backdrop = (props) => (
    props.show ? <div onClick={props.clicked} className={classses.Backdrop}></div> :null
)

export default backdrop