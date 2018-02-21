import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui'
import IconButton from 'material-ui/IconButton'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

const Articles = ({articles}) => {

  const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 1200,
      height: 800,
      overflowY: 'auto',
    },
    // gridTile: {
    //   color: 'red',
    //   transition: 'color .3s'
    // },
  }

  return (
    <div style={styles.root}>
    <GridList
      cellHeight={180}
      cols={3}
      style={styles.gridList}
    >
      {articles.map(article => (
        <a href={article.url} >
          <GridTile
            key={article.source.id}
            title={article.title}
            subtitle={
              <span>
                by <b>{article.author}</b> / {article.source.name}<br/>
                {article.publishedAt}
              </span>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={article.urlToImage} />
          </GridTile>
        </a>
      ))}
    </GridList>
  </div>
  )
}

export default Articles
