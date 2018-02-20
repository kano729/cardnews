import React, { Component } from 'react';
import HotTable from 'react-handsontable'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {

  constructor() {
    super()
    this.state = {
      articles: [],
      totalResults: 0,
      page: 1,
      count: [0]
    }
  }

  //コンポーネント生成時の挙動
  componentWillMount(){
    this._onFetch(this.state.page)
  }

  _onFetch = (page) => {
    console.log(page)
    const url = 'https://newsapi.org/v2/everything?' +
                'page=' + page +
                '&apiKey=2eab118a7c9d450299db63f95f6e0564' +
                '&q=jcb OR visa OR クレジット OR プリペイド OR デビット'
    fetch(url, {cache: false})
    .then(response => response.json())
    .then(json => {
      const articles = json.articles.map(article => article)
      const totalResults = json.totalResults
      this.setState({articles,totalResults})
    })

  }

  styles = {
    hot: {
      margin: 12,
      fontSize: 12,
    }
  }

  //カラムヘッダー定義
  colHeaders = ['source', 'author', 'title', 'description', 'image', 'publishedAt', 'like', 'select']

  //カラムデータ定義
  columns = [
    { data: 'source', editor: false },
    { data: 'author', editor: false },
    { data: 'title', editor: false, renderer: 'html' },
    { data: 'description', editor: false },
    { data: 'image', editor: false, renderer: 'html' },
    { data: 'publishedAt', editor: false },
    { data: 'like', editor: false },
    { data: 'selected', type: 'checkbox' },
  ]

  _onClick = () => {
    console.log('Like!')
  }

  _prev = () => {
    if(this.state.page !== 1) {
      const page = this.state.page - 1
      this.setState({page})
      this._onFetch(page)
    } else {
      console.log('前のページはないよ')
    }

  }

  _next = () => {
    const page = this.state.page + 1
    this.setState({page})
    this._onFetch(page)
  }

  render() {
    let page = ""
    // <button onClick={() => {this._prev()}}>前へ</button>
    // <button onClick={() => {this._next()}}>次へ</button>
    const style = {
      margin: 12,
    };
    page = <div>page:{this.state.page}
              <MuiThemeProvider>
                <RaisedButton label="前へ" secondary={true} style={style} onClick={() => {this._prev()}}/>
                <RaisedButton label="次へ" primary={true} style={style} onClick={() => {this._next()}}/>
              </MuiThemeProvider>
           </div>

    let result = ""
    result = <div>totalResults:{this.state.totalResults}</div>

    let message = ""
    if (this.state.articles !== []) {
      const _articles = this.state.articles.map(article => {
        return{
          source: article.source.name,
          author: article.author,
          title: "<a href='"+article.url+"'>"+article.title+"</a>",
          description: article.description,
          image: "<img src='"+article.urlToImage+"'/>",
          publishedAt: article.publishedAt,
          like: 0,
          selected: false,
        }
      })
//      }).sort((a, b) => {return a.publishedAt < b.publishedAt ? 1 : -1})
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
      page = "null"
      result = "null"
      message = "null"
    }
    return (
      <div className="App">
        <h2>Card Payment Breaking News</h2>
        powered by <a href='https://newsapi.org/'>News API v2</a>
        <br/>
        <button onClick={() => {this._onClick()}}>Like!</button>
        {page}
        {result}
        {message}
      </div>
    );
  }
}

export default App;
