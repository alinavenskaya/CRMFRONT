import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  PagingState,
  CustomPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

import Loading from "./Loading";

const URL = 'http://localhost:8080/db/actions';

export default class Reports extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'objecttype', title: 'Объект' },
        { name: 'actiontype', title: 'Действие' },
        { name: 'actiondate', title: 'Дата' },
      ],
      rows: [],
      totalCount: 0,
      pageSize: 6,
      currentPage: 0,
      loading: true,
    };
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }

  queryString() {
    const { pageSize, currentPage } = this.state;
    return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
  }

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => this.setState({
        rows: data.items,
        totalCount: data.totalCount,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {
    const {
      rows, columns, pageSize, currentPage, totalCount, loading,
    } = this.state;

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid
          rows={rows}
          columns={columns}
        >
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
          />
          <CustomPaging
            totalCount={totalCount}
          />
          <Table />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
        {loading && <Loading />}
      </Paper>
    );
  }
}