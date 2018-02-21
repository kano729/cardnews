import React, { Component } from 'react'
import HotTable from 'react-handsontable'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import moment from 'moment'
import Pager from './Pager'
import Articles from './Articles'

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
    const querys = [
      // "jcb",
      "visa",
      "mastercard",
      "amex",
      "fintech",
      "%E3%82%AF%E3%83%AC%E3%82%B8%E3%83%83%E3%83%88", //クレジット
      "%E3%83%97%E3%83%AA%E3%83%9A%E3%82%A4%E3%83%89", //プリペイド
      "%E3%83%87%E3%83%93%E3%83%83%E3%83%88" //デビット
    ]
    let url = 'https://newsapi.org/v2/everything?' +
                'page=' + page +
                '&apiKey=2eab118a7c9d450299db63f95f6e0564' +
                '&q=jcb'
    for (let i in querys) {
      url += " OR " + querys[i]
    }
    url += "&from="+moment().subtract(30, 'days').format("YYYY-MM-DD")
    url += "&to="+moment().format("YYYY-MM-DD")

    fetch(url, {cache: false})
    .then(response => response.json())
    .then(json => {
      const articles = json.articles.map(article => article)
        .sort((a, b) => {return a.publishedAt < b.publishedAt ? 1 : -1})
      const totalResults = json.totalResults
      this.setState({articles,totalResults})
    })
  }

  //ページ遷移用メソッド
  onClickPrev = () => {
    const page = this.state.page - 1
    this.setState({page})
    this._onFetch(page)
  }
  onClickNext = () => {
    const page = this.state.page + 1
    this.setState({page})
    this._onFetch(page)
  }

  //描画
  render() {
    return (
      <div className="App">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <a href='https://onishi024.github.io/cardnews/'><h2>Card Payment Breaking News v0.2</h2></a>
          <p>powered by <a href='https://newsapi.org/'>News API v2</a></p>
          <Articles articles={this.state.articles} />
          <Pager page={this.state.page} totalResults={this.state.totalResults} onClickPrev={this.onClickPrev} onClickNext={this.onClickNext} />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App;
