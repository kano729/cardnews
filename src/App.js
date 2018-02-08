import React, { Component } from 'react';
import HotTable from 'react-handsontable'

class App extends Component {

  constructor() {
    super()
    this.state = {
      articles: []
    }
  }

  //コンポーネント生成時の挙動
  componentWillMount(){
    this._onFetch()
  }

  _onFetch = () => {
    const url = 'https://newsapi.org/v2/everything?apiKey=2eab118a7c9d450299db63f95f6e0564&q=jcb OR visa OR クレジット OR プリペイド OR デビット'
    fetch(url)
    .then(response => response.json())
    .then(json => {
      const articles = json.articles.map(article => article)
      this.setState({articles})
    })

  }

  styles = {
    hot: {
      margin: 12,
      fontSize: 12,
    }
  }

  //カラムヘッダー定義
  colHeaders = ['source', 'author', 'title', 'description', 'publishedAt']

  //カラムデータ定義
  columns = [
    { data: 'source', editor: false },
    { data: 'author', editor: false },
    { data: 'title', editor: false, renderer: 'html' },
    { data: 'description', editor: false },
    { data: 'publishedAt', editor: false },
  ]

  render() {
    let message = ""
    if (this.state.articles !== []) {
      const _articles = this.state.articles.map(article => {
        return{
          source: article.source.name,
          author: article.author,
          title: "<a href='"+article.url+"'>"+article.title+"</a>",
          description: article.description,
          publishedAt: article.publishedAt,
        }
      }).sort((a, b) => {return a.publishedAt < b.publishedAt ? 1 : -1})
      message = <div style={this.styles.hot}><HotTable
                  root="hot"
                  data={_articles}
                  colHeaders={this.colHeaders}
                  columns={this.columns}
                  colWidths={[50, 50, 100, 200, 80]}
                  columnSorting={false}
                  width="1000"
                  stretchH="all"
                  manualColumnResize={true}
                  /></div>
    } else {
      message = "null"
    }
    return (
      <div className="App">
        <h2>Card Payment Breaking News</h2>
        powered by <a href='https://newsapi.org/'>News API v2</a>
        {message}
      </div>
    );
  }
}

export default App;
