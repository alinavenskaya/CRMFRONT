import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  SearchState,
  IntegratedFiltering,
  FilteringState,
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow
} from "@devexpress/dx-react-grid-material-ui";
import { connect } from "react-redux";
import { Template, TemplateConnector } from "@devexpress/dx-react-core";
import { CLIENTS_LOADED, CLIENTS_UNLOADED } from "../../constants/actionTypes";
import agent from "../../agent";
const tableMessages = {
  noData: "Нет данных"
};
const searchMessages = {
  searchPlaceholder: "Поиск..."
};

const filterRowMessages = {
  filterPlaceholder: "Фильтр..."
};
const pagingPanelMessages = {
  showAll: "Показать всех",
  rowsPerPage: "Рядов на страницу",
  info: "Показаны с {from} по {to} ({count} элементов)"
};

const Row = ({ tableRow, selected, onToggle, ...restProps }) => {
  // workaround for using the click & doubleClick events at the same time
  // from https://stackoverflow.com/questions/25777826/onclick-works-but-ondoubleclick-is-ignored-on-react-component
  let timer = 0;
  let delay = 200;
  let prevent = false;
  const handleClick = () => {
    timer = setTimeout(() => {
      if (!prevent) {
        onToggle();
      }
      prevent = false;
    }, delay);
  };
  const handleDoubleClick = () => {
    clearTimeout(timer);
    prevent = true;
    alert(JSON.stringify(tableRow.row));
  };
  return (
    <Table.Row
      {...restProps}
      className={selected ? "active" : ""}
      style={{ color: "green" }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    />
  );
};

const mapStateToProps = state => ({ ...state.clients });

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: CLIENTS_LOADED, payload }),
  onUnload: () => dispatch({ type: CLIENTS_UNLOADED })
});

class Client extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "name", title: "Имя" },
        { name: "phone", title: "Телефон" },
        { name: "company", title: "Компания" },
        { name: "email", title: "Email" }
      ],
      rows: [
        // {
        //   name: "Евгений Николаевич",
        //   phone: "+79867633574",
        //   company: "Банк СПБ",
        //   email: "Nikolaevich@bspb.com"
        // },
        // {
        //   name: "Алексей Петрович",
        //   phone: "+78673450978",
        //   company: "Рога и копыта",
        //   email: "Roga@copita.ru"
        // }
      ],
      //   rows: generateRows({ length: 8 }),
      searchValue: "",
      filters: [],
      sorting: [{ columnName: "name", direction: "asc" }],
      currentPage: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15]
    };

    this.changeSearchValue = searchValue => this.setState({ searchValue });
    this.changeFilters = filters => this.setState({ filters });
    this.changeSorting = sorting => this.setState({ sorting });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
  }
  async componentWillMount() {
    this.props.onLoad(await agent.Clients.all());
    this.setState({ rows: this.props.rows });
  }
  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const {
      rows,
      columns,
      searchValue,
      filters,
      sorting,
      currentPage,
      pageSizes,
      pageSize
    } = this.state;

    return (
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SearchState
            value={searchValue}
            onValueChange={this.changeSearchValue}
          />
          <FilteringState
            filters={filters}
            onFiltersChange={this.changeFilters}
          />
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />
          <IntegratedPaging />
          <IntegratedSorting />
          <IntegratedFiltering />
          <Table messages={tableMessages} />
          <TableHeaderRow showSortingControls />
          <PagingPanel pageSizes={pageSizes} messages={pagingPanelMessages} />
          <Toolbar />
          <SearchPanel messages={searchMessages} />
          <TableFilterRow messages={filterRowMessages} />
          <Template
            name="tableRow"
            predicate={({ tableRow }) => tableRow.type === "data"}
          >
            {params => (
              <TemplateConnector>
                {({ selection }, { toggleSelection }) => (
                  <Row
                    {...params}
                    selected={
                      selection.findIndex(i => i === params.tableRow.rowId) > -1
                    }
                    onToggle={toggleSelection({
                      rowIds: [params.tableRow.rowId]
                    })}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        </Grid>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client);
