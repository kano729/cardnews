import React from 'react'
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn,
        Toggle, IconButton, FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'

const IssueList = ({selected_function, show_hided_issue, issue_rows, onToggleHide, onToggleIssueHide}) => {

  const _issue_rows = show_hided_issue ? issue_rows : issue_rows.filter(issue_row => issue_row.hide === false)

  //非表示toggleのスタイル
  const styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    },
    toggle: {
      maxWidth: 50,
      margin: 16,
      right: 80,
      bottom: 20,
      position: "fixed",
      zIndex: 1,
    },
    toggle_icon: {
      boxShadow: '0px 4px 4px 1px rgba(0,0,0,0.15)'
    },
  }

  //案件追加buttonのスタイル
  const button_style = {
    marginLeft: 20,
    right: 30,
    bottom: 30,
    position: "fixed",
    zIndex: 1
  }

  //SVG Icons
  const EditIcon = () => {
    return (
      <IconButton tooltip="SVG Icon" >
        <ModeEdit />
      </IconButton>
    )
  }

  //Methods
  const _onToggleIssueHide = (event, value) => {
    onToggleIssueHide(event.target.name, value)
  }

  //return
  return (
    <MuiThemeProvider>
      <div style={styles.path} ><Link to={`/`}>Home</Link> > 案件一覧</div>
      <Toggle
        style={styles.toggle}
        thumbStyle={styles.toggle_icon}
        trackStyle={styles.toggle_icon}
        onToggle={() => onToggleHide()} />
      <Link to='/register'>
        <FloatingActionButton mini={true} style={button_style}>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      <Table fixedHeader={true} >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow>
            <TableHeaderColumn style={{ width: '5%'}}>ID</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>分類</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '15%'}}>案件管理番号</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>タスクコード</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '20%'}}>案件名称</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>見積</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>編集</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>非表示</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true} displayRowCheckbox={false} >
          {_issue_rows.map(issue_row => {
            return (
              <TableRow key={issue_row.id} >
                <TableRowColumn style={{ width: '5%'}}>{issue_row.id}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}>{issue_row.kind}</TableRowColumn>
                <TableRowColumn style={{ width: '15%'}}>{issue_row.ankenno}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}>{issue_row.taskcode}</TableRowColumn>
                <TableRowColumn style={{ width: '20%'}}>{issue_row.ankenname}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}>{issue_row.estimate}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}><Link to={`/issue_edit/${issue_row.id}`}><EditIcon /></Link></TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}><Toggle defaultToggled={issue_row.hide} name={issue_row.id} onToggle={(event, value) => _onToggleIssueHide(event, value)}/></TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </MuiThemeProvider>
  )

}

export default IssueList
