import React, { Component } from 'react'
import {FlatButton} from 'material-ui'

const Pager = ({page, totalResults, onClickPrev, onClickNext}) => {

  const style = {
    margin: 12,
  }

  return (
    <div>page:{page} of {totalResults}
      <FlatButton label="< PREV" secondary={true} style={style} disabled={page===1} onClick={() => onClickPrev()}/>
      <FlatButton label="NEXT >" primary={true} style={style} disabled={page===totalResults} onClick={() => onClickNext()}/>
    </div>
  )
}

export default Pager
