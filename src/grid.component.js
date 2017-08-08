"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var grid_options_1 = require("./grid-options");
var grid_column_component_1 = require("./grid-column.component");
var grid_data_provider_1 = require("./grid-data-provider");
var grid_event_1 = require("./grid-event");
var _ = require("lodash");
/**
 * Data grid component class.
 *
 * Component configuration is done through the options property.
 * Supports sorting, filtering and paging.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
var GridComponent = (function () {
    /**
     * Class constructor.
     *
     * @param {Http} http
     */
    function GridComponent(http, renderer, changeDetector) {
        this.http = http;
        this.renderer = renderer;
        this.changeDetector = changeDetector;
        this.filterChange = new core_1.EventEmitter();
        this.sortChange = new core_1.EventEmitter();
        this.pageChange = new core_1.EventEmitter();
        this.pageSizeChange = new core_1.EventEmitter();
        this.itemSelect = new core_1.EventEmitter();
        this.requestSend = new core_1.EventEmitter();
        this.serverError = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.columns = [];
        this.errors = [];
        this.filters = [];
        this.pages = [];
        this.selectionMap = [];
        this.selectedItems = [];
        this.http = http;
        this.dataProvider = new grid_data_provider_1.GridDataProvider(this.http, this._options);
    }
    GridComponent_1 = GridComponent;
    Object.defineProperty(GridComponent.prototype, "options", {
        /**
         * Getter for grid options.
         */
        get: function () {
            return this._options;
        },
        /**
         * Setter for grid options.
         *
         * @param {GridOptions} value
         */
        set: function (value) {
            this._options = value;
            this.initDataProvider();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handle OnInit event.
     */
    GridComponent.prototype.ngOnInit = function () {
        if (_.isUndefined(this._options)) {
            this._options = new grid_options_1.GridOptions();
        }
        if (!_.isUndefined(this._options.get('httpService'))) {
            this.http = this._options.get('httpService');
        }
    };
    /**
     * Handle AfterContentInit event.
     */
    GridComponent.prototype.ngAfterContentInit = function () {
        this.columns = this.columnList.toArray();
    };
    /**
     * Handle AfterViewInit event.
     */
    GridComponent.prototype.ngAfterViewInit = function () {
        this.render();
        this.changeDetector.detectChanges();
    };
    /**
     * Set all data bound to the grid.
     *
     * @returns {Array<any>}
     */
    GridComponent.prototype.setData = function (data) {
        this.data = this.dataProvider.sourceData = this.formatData(data);
    };
    /**
     * Return all data bound to the grid.
     *
     * @returns {Array<any>}
     */
    GridComponent.prototype.getData = function () {
        return this.data;
    };
    /**
     * Return number of total results.
     *
     * @returns {number}
     */
    GridComponent.prototype.getTotalCount = function () {
        return this.dataProvider.getTotalCount();
    };
    /**
     * Return number of total results.
     *
     * @param {number} totalCount
     */
    GridComponent.prototype.setTotalCount = function (totalCount) {
        this.dataProvider.setTotalCount(totalCount);
    };
    /**
     * Set the results displayed in current page.
     *
     * @params {Array<any>} results
     */
    GridComponent.prototype.setResults = function (results) {
        this.dataProvider.setData(this.formatData(results));
    };
    /**
     * Return results displayed on current page.
     *
     * @returns {Array<any>}
     */
    GridComponent.prototype.getResults = function () {
        return this.dataProvider.getData();
    };
    /**
     * Return number of results displayed on current page.
     *
     * @returns {number}
     */
    GridComponent.prototype.getCount = function () {
        return this.dataProvider.getCount();
    };
    /**
     * Return current page index.
     *
     * @returns {number}
     */
    GridComponent.prototype.getPageIndex = function () {
        return this.dataProvider.pageIndex;
    };
    /**
     * Render data for given page.
     *
     * @param {number} pageIndex
     */
    GridComponent.prototype.setPageIndex = function (pageIndex) {
        this.dataProvider.pageIndex = pageIndex;
        this.pageChange.emit(new grid_event_1.GridEvent({
            data: pageIndex,
            type: grid_event_1.GridEvent.PAGE_CHANGE_EVENT
        }));
    };
    /**
     * Return current page size.
     *
     * @returns {number|false}
     */
    GridComponent.prototype.getPageSize = function () {
        return this.dataProvider.pageSize;
    };
    /**
     * Change page size to given value and render data.
     *
     * @param {number|false} pageSize
     */
    GridComponent.prototype.setPageSize = function (pageSize) {
        this.dataProvider.pageSize = pageSize;
        this.setPageIndex(1);
        this.pageSizeChange.emit(new grid_event_1.GridEvent({
            data: pageSize,
            type: grid_event_1.GridEvent.PAGE_SIZE_CHANGE_EVENT
        }));
    };
    /**
     * Return total number of grid pages.
     *
     * @returns {number}
     */
    GridComponent.prototype.getTotalPages = function () {
        if (this.getPageSize() === false || this.getPageSize() > this.getTotalCount()) {
            return 1;
        }
        return Math.ceil(this.getTotalCount() / this.getPageSize());
    };
    /**
     * Add a filter value for specific column.
     *
     * @param {string} columnName Name of grid column or property of bound data item
     * @param {string} value Value to be used as filter for the column
     * @param {string} columnType Type of the column (text or number)
     *
     * @returns {boolean}
     */
    GridComponent.prototype.setFilter = function (columnName, value, columnType) {
        var column = this.getColumn(columnName);
        if (!columnType) {
            columnType = column ? column.type : grid_column_component_1.GridColumnComponent.COLUMN_TYPE_STRING;
        }
        if (columnType === grid_column_component_1.GridColumnComponent.COLUMN_TYPE_NUMBER && value.length) {
            var expression = new RegExp('^(?:NaN|-?(?:(?:\\d+|\\d*\\.\\d+)(?:[E|e][+|-]?\\d+)?|Infinity))$');
            var isValid = expression.test(value);
            if (!isValid) {
                if (!this.getError(columnName)) {
                    var columnHeading = column && column.heading
                        ? column.heading : columnName;
                    var message = 'Invalid filter value for "'
                        + columnHeading + '". Please enter valid Number.';
                    this.setError(columnName, message);
                }
                return false;
            }
        }
        this.clearError(columnName);
        if (value) {
            this.filters[columnName] = value;
            if (!_.isUndefined(this._options.get('url'))) {
                this.dataProvider.requestParams[columnName] = value;
            }
        }
        else if (this.filters[columnName]) {
            delete this.filters[columnName];
            if (!_.isUndefined(this._options.get('url'))) {
                delete this.dataProvider.requestParams[columnName];
            }
        }
        this.setPageIndex(1);
        this.filterChange.emit(new grid_event_1.GridEvent({
            data: value,
            target: column ? column : columnName,
            type: grid_event_1.GridEvent.FILTER_CHANGE_EVENT
        }));
        return true;
    };
    /**
     * Return filter value for given column.
     *
     * @param {string} columnName
     * @returns {any}
     */
    GridComponent.prototype.getFilter = function (columnName) {
        return this.filters[columnName];
    };
    /**
     * Clear filter value for given column.
     *
     * @param {string} columnName
     */
    GridComponent.prototype.clearFilter = function (columnName) {
        delete this.filters[columnName];
        this.clearError(columnName);
    };
    /**
     * Clear filter values for all columns.
     */
    GridComponent.prototype.clearAllFilters = function () {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            this.clearFilter(column.name);
        }
    };
    /**
     * Set validation error for given column.
     *
     * @param {string} columnName
     * @param {string} error Error message
     */
    GridComponent.prototype.setError = function (columnName, error) {
        this.errors[columnName] = error;
    };
    /**
     * Return validation error for given column.
     *
     * @param {string} columnName
     * @returns {any}
     */
    GridComponent.prototype.getError = function (columnName) {
        return this.errors[columnName];
    };
    /**
     * Clear validation error for given column.
     *
     * @param {string} columnName
     */
    GridComponent.prototype.clearError = function (columnName) {
        delete this.errors[columnName];
    };
    /**
     * Clear errors for all columns.
     */
    GridComponent.prototype.clearAllErrors = function () {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            this.clearError(column.name);
        }
    };
    /**
     * Calling this method would sort the grid data by the given sort column and
     * sort type.
     *
     * @param {string} columnName Name of grid column to be used for sorting
     * @param {string} sortType Optional, values are 'asc' or 'desc'
     */
    GridComponent.prototype.setSort = function (columnName, sortType) {
        var column = this.getColumn(columnName);
        this.dataProvider.setSort(columnName, sortType);
        this.sortChange.emit(new grid_event_1.GridEvent({
            data: sortType,
            target: column ? column : columnName,
            type: grid_event_1.GridEvent.SORT_CHANGE_EVENT
        }));
    };
    /**
     * Return a list of selected grid items.
     *
     * @returns {Array<any>}
     */
    GridComponent.prototype.getSelectedItems = function () {
        return this.selectedItems;
    };
    /**
     * Clear all selected items.
     */
    GridComponent.prototype.clearSelection = function () {
        this.selectedItems = [];
        this.selectionMap = [];
    };
    /**
     * Return grid column component by given name.
     *
     * @param {string} columnName
     * @returns {GridColumnComponent}
     */
    GridComponent.prototype.getColumn = function (columnName) {
        for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (column.name === columnName) {
                return column;
            }
        }
    };
    /**
     * Render grid.
     */
    GridComponent.prototype.render = function () {
        var _this = this;
        var hasErrors = false;
        for (var error in this.errors) {
            if (this.errors.hasOwnProperty(error)) {
                hasErrors = true;
                alert(this.errors[error]);
            }
        }
        if (hasErrors) {
            return false;
        }
        if (_.isUndefined(this._options.get('url'))) {
            this.filter();
            this.refresh();
            this.update.emit(new grid_event_1.GridEvent({
                data: this.getResults(),
                type: grid_event_1.GridEvent.UPDATE_EVENT
            }));
        }
        else if (this.isResultsDisplayAllowed()) {
            this.dataProvider.fetch().subscribe(function (res) {
                _this.setResults(res.json());
                _this.refresh();
                _this.update.emit(new grid_event_1.GridEvent({
                    data: _this.getResults(),
                    type: grid_event_1.GridEvent.UPDATE_EVENT
                }));
            }, function (err) {
                console.log(err);
                _this.serverError.emit(new grid_event_1.GridEvent({
                    data: err,
                    type: grid_event_1.GridEvent.SERVER_ERROR_EVENT
                }));
            });
            this.requestSend.emit(new grid_event_1.GridEvent({
                type: grid_event_1.GridEvent.REQUEST_SEND_EVENT
            }));
        }
        else {
            this.setData([]);
        }
    };
    /**
     * Handle window resize event.
     */
    GridComponent.prototype.onWindowResize = function (event) {
        this.handleContentResize();
    };
    /**
     * Handle window scroll event.
     */
    GridComponent.prototype.onWindowScroll = function (event) {
        if (this._options.get('headingFixed')) {
            this.headerRef.nativeElement.style.top = '0';
            this.headerOffsetTop = this.headerRef.nativeElement.offsetTop;
            this.headerOffsetHeight = this.headerRef.nativeElement.offsetHeight;
            this.bodyOffsetTop = this.bodyRef.nativeElement.offsetTop;
            this.bodyOffsetHeight = this.bodyRef.nativeElement.offsetHeight;
            this.headerTopLimit = this.bodyOffsetHeight + this.bodyOffsetTop
                - this.headerOffsetTop - this.headerOffsetHeight;
            this.headerTop = document.body.scrollTop - this.headerOffsetTop;
            if (!_.isNull(this.headerRef.nativeElement.offsetParent) &&
                !_.isNull(this.headerRef.nativeElement.offsetParent.offsetTop)) {
                this.headerTop -= this.headerRef.nativeElement.offsetParent.offsetTop;
            }
            var banner = document.body.querySelector('[role="banner"]');
            if (!_.isNull(banner)) {
                this.headerTop += banner.clientHeight;
            }
            if (this.headerTop <= 0) {
                this.renderer.setElementClass(this.headerRef.nativeElement, 'fixed', false);
                this.headerRef.nativeElement.style.top = '0';
            }
            else if (this.headerTop > 0 && this.headerTop < this.headerTopLimit) {
                this.renderer.setElementClass(this.headerRef.nativeElement, 'fixed', true);
                this.headerRef.nativeElement.style.top = this.headerTop + 'px';
            }
            else {
                this.headerRef.nativeElement.style.top = this.headerTopLimit + 'px';
            }
        }
    };
    /**
     * Handle windows mouseup event.
     */
    GridComponent.prototype.onWindowMouseUp = function (event) {
        this.endBodyDrag();
    };
    /**
     * Handle grid body mousedown event.
     */
    GridComponent.prototype.onGridMouseDown = function (event) {
        this.startBodyDrag(event);
    };
    /**
     * Handle grid body mousemove event.
     */
    GridComponent.prototype.onGridMouseMove = function (event) {
        this.bodyDrag(event);
    };
    /**
     * Handle grid body dragstart event.
     */
    GridComponent.prototype.onGridDragStart = function (event) {
        event.preventDefault();
    };
    /**
     * Handle content size changes.
     */
    GridComponent.prototype.handleContentResize = function () {
        this.fullTableWidth = this.headerRef.nativeElement.firstElementChild.offsetWidth + 'px';
    };
    /**
     * Format data using dataItemCallback if given.
     *
     * @param {Array<any>} data
     *
     * @returns {Array<any>}
     */
    GridComponent.prototype.formatData = function (data) {
        var callback = this._options.get('dataItemCallback');
        return callback ? _.flatMap(data, callback) : data;
    };
    /**
     * Refresh grid component.
     */
    GridComponent.prototype.refresh = function () {
        this.paginate();
        this.handleContentResize();
    };
    /**
     * Filter provided data.
     */
    GridComponent.prototype.filter = function () {
        var self = this;
        this.dataProvider.sourceData = _.filter(this.data, function (item) {
            var match = true;
            for (var filter in self.filters) {
                if (self.filters.hasOwnProperty(filter)) {
                    var value = _.get(item, filter, '').toString();
                    var column = self.getColumn(filter);
                    if (column && column.type === grid_column_component_1.GridColumnComponent.COLUMN_TYPE_NUMBER) {
                        match = match && value === self.filters[filter];
                    }
                    else {
                        match = match && !_.isEmpty(value.match(new RegExp(self.filters[filter], 'i')));
                    }
                }
            }
            return match;
        });
    };
    /**
     * Check if input filter is enabled for given column.
     *
     * @param {GridColumnComponent} column
     * @returns {boolean}
     */
    GridComponent.prototype.isInputFilterEnabled = function (column) {
        return (column.filterType === grid_column_component_1.GridColumnComponent.FILTER_TYPE_INPUT
            && column.filtering === true);
    };
    /**
     * Check if select filter is enabled for given column.
     *
     * @param {GridColumnComponent} column
     * @returns {boolean}
     */
    GridComponent.prototype.isSelectFilterEnabled = function (column) {
        return (column.filterType === grid_column_component_1.GridColumnComponent.FILTER_TYPE_SELECT
            && column.filtering === true);
    };
    /**
     * Determine the CSS class that needs to be applied to the each grid row.
     *
     * @param {number} index Row index
     * @param {any} row Row data
     * @returns {string} Row color
     */
    GridComponent.prototype.getRowCssClass = function (index, row) {
        var cssClass = '';
        if (this._options.get('rowAlternateStyle') && index % 2 !== 0) {
            cssClass = this.concatCssClass(cssClass, GridComponent_1.ROW_ALT_CLASS);
        }
        if (this._options.get('rowHoverStyle')) {
            cssClass = this.concatCssClass(cssClass, GridComponent_1.ROW_HOVER_CLASS);
        }
        var callback = this.options.get('rowStyleCallback');
        if (callback) {
            cssClass = this.concatCssClass(cssClass, callback(row));
        }
        if (this.isRowSelected(row) && this._options.get('rowSelectionStyle')) {
            cssClass = this.concatCssClass(cssClass, GridComponent_1.ROW_SELECT_CLASS);
        }
        return cssClass;
    };
    /**
     * Get heading css class.
     *
     * @returns {string}
     */
    GridComponent.prototype.getHeadingCssClass = function () {
        if (_.isUndefined(this._options.get('headingCssClass'))) {
            return '';
        }
        return this._options.get('headingCssClass');
    };
    /**
     * Get body css class.
     *
     * @returns {string}
     */
    GridComponent.prototype.getBodyCssClass = function () {
        if (_.isUndefined(this._options.get('bodyCssClass'))) {
            return '';
        }
        return this._options.get('bodyCssClass');
    };
    /**
     * Handle body scroll event.
     *
     * @param {HTMLElement} bodyElement
     * @param {HTMLElement} headerElement
     */
    GridComponent.prototype.onBodyScroll = function (bodyElement, headerElement) {
        headerElement.scrollLeft = bodyElement.scrollLeft;
    };
    /**
     * Handle select/deselect all grid rows.
     *
     * @param {boolean} selected
     */
    GridComponent.prototype.onSelectAllCheckboxClick = function (selected) {
        if (this._options.get('selection') && this._options.get('selectionMultiple')) {
            for (var _i = 0, _a = this.getResults(); _i < _a.length; _i++) {
                var row = _a[_i];
                this.setRowSelection(row, selected);
            }
        }
    };
    /**
     * Handle row select checkbox click.
     *
     * @param {MouseEvent} event
     * @param {any} row
     */
    GridComponent.prototype.onSelectItemCheckboxClick = function (event, row) {
        event.stopPropagation();
        if (this._options.get('selection')) {
            this.setRowSelection(row);
        }
    };
    /**
     * Check if all results on current page are selected.
     *
     * @returns {boolean}
     */
    GridComponent.prototype.allResultsSelected = function () {
        if (!this.getTotalCount()) {
            return false;
        }
        for (var _i = 0, _a = this.getResults(); _i < _a.length; _i++) {
            var row = _a[_i];
            if (!this.isRowSelected(row)) {
                return false;
            }
        }
        return true;
    };
    /**
     * Handle grid row click event.
     *
     * @param {any} row
     */
    GridComponent.prototype.onRowClick = function (row) {
        if (this._options.get('selection')) {
            this.setRowSelection(row);
        }
    };
    /**
     * Initialize data provider based on grid options.
     */
    GridComponent.prototype.initDataProvider = function () {
        this.dataProvider = new grid_data_provider_1.GridDataProvider(this.http, {
            pageParam: this._options.get('pageParam'),
            pageSizeParam: this._options.get('pageSizeParam'),
            pageSize: this._options.get('defaultPageSize'),
            requestParams: this._options.get('additionalRequestParams'),
            sortParam: this._options.get('sortParam'),
            sourceUrl: this._options.get('url'),
            totalCountHeader: this._options.get('totalCountHeader')
        });
        if (!_.isUndefined(this._options.get('defaultSortColumn'))) {
            this.setSort(this._options.get('defaultSortColumn'), this._options.get('defaultSortType'));
        }
        if (!_.isUndefined(this._options.get('defaultFilteringColumn'))) {
            this.setFilter(this._options.get('defaultFilteringColumn'), this._options.get('defaultFilteringColumnValue'));
        }
        this.setData(this._options.get('data'));
    };
    /**
     * Build a list of the pages that should be display in the grid, based on
     * current page index and max button count.
     */
    GridComponent.prototype.paginate = function () {
        if (this._options.get('paging')) {
            var pageButtonCount = Math.min(this._options.get('pageButtonCount'), this.getTotalPages());
            var offsetLeft = Math.floor(pageButtonCount / 2);
            var offsetRight = Math.ceil(pageButtonCount / 2) - 1;
            var startIndex = this.getPageIndex() - offsetLeft;
            var endIndex = this.getPageIndex() + offsetRight;
            if (startIndex < 1) {
                startIndex = 1;
                endIndex = pageButtonCount;
            }
            else if (endIndex > this.getTotalPages()) {
                endIndex = this.getTotalPages();
                startIndex = endIndex - pageButtonCount + 1;
            }
            this.pages = [];
            for (var i = startIndex; i <= endIndex; i++) {
                this.pages.push(i);
            }
        }
    };
    /**
     * Page button click handler.
     * When invoked grid data for specific page would be rendered.
     *
     * @param {MouseEvent} event
     */
    GridComponent.prototype.onPageButtonClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var element = event.target;
        var pageIndex = Number(element.getAttribute('data-page'));
        this.setPageIndex(pageIndex);
        this.render();
    };
    /**
     * Check if page size options are enabled.
     *
     * @returns {boolean}
     */
    GridComponent.prototype.isPageSizeOptionsEnabled = function () {
        return this._options.get('paging')
            && (!_.isEmpty(this._options.get('pageSizeOptions'))
                || this._options.get('pageSizeOptions') !== false);
    };
    /**
     * Page size drop-down change handler.
     * When invoked the page size of the grid would be changed and data would be
     * re-rendered.
     *
     * @param {any} event
     */
    GridComponent.prototype.onPageSizeDropDownChange = function (event) {
        this.setPageSize(event);
        this.render();
    };
    /**
     * Select filter change handler.
     * When invoked a filter would be set with the input value.
     *
     * @param {any} event
     * @param {GridColumnComponent} column
     */
    GridComponent.prototype.onSelectFilterChange = function (event, column) {
        this.setFilter(column.name, event);
        this.render();
    };
    /**
     * Input filter blur handler.
     * When invoked a filter would be set with the input value.
     *
     * @param {MouseEvent} event
     * @param {GridColumnComponent} column
     */
    GridComponent.prototype.onInputFilterBlur = function (event, column) {
        var element = event.target;
        var keyword = element.value.trim();
        this.setFilter(column.name, keyword);
    };
    /**
     * Input filter change handler.
     *
     * @param {MouseEvent} event
     * @param {GridColumnComponent} column
     */
    GridComponent.prototype.onInputFilterChange = function (event, column) {
        this.clearError(column.name);
    };
    /**
     * Input filter enter key hanlder.
     * When invoked a filter would be set with the input value and the grid
     * filter would be triggered.
     *
     * @param {MouseEvent} event
     * @param {GridColumnComponent} column
     */
    GridComponent.prototype.onInputFilterEnter = function (event, column) {
        this.onInputFilterBlur(event, column);
        this.render();
    };
    /**
     * Grid heading click handler.
     * When invoked the grid would be sorted by the clicked column.
     *
     * @param {GridColumnComponent} column
     */
    GridComponent.prototype.onHeadingClick = function (column) {
        if (this.isSortingAllowed(column)) {
            this.setSort(column.name, this.getSortType(column));
            this.render();
        }
    };
    /**
     * Check if data is sorted by specific column and type.
     *
     * @param {GridColumn} column
     * @param {string} sortType Optional, if given method would also check
     * current sort type value
     * @returns {boolean}
     */
    GridComponent.prototype.isSortedBy = function (column, sortType) {
        if (!(column.sorting === true)) {
            return false;
        }
        var isOrderedByField = column.name === this.dataProvider.getSortColumn();
        if (_.isUndefined(sortType)) {
            return isOrderedByField;
        }
        return isOrderedByField && this.dataProvider.getSortType() === sortType;
    };
    /**
     * Determine sort type by column name.
     * If column name is different from current sort column the order type would
     * be preserved, otherwise the sort type would be changed to the opposite.
     *
     * @param {GridColumn} column
     * @returns {string}
     */
    GridComponent.prototype.getSortType = function (column) {
        return column.name !== this.dataProvider.getSortColumn() ?
            this.dataProvider.getSortType() :
            (this.dataProvider.getSortType() === grid_data_provider_1.GridDataProvider.SORT_ASC ?
                grid_data_provider_1.GridDataProvider.SORT_DESC : grid_data_provider_1.GridDataProvider.SORT_ASC);
    };
    /**
     * Check if sorting is allowed for specific grid column.
     *
     * @param {GridColumn} column
     * @returns {boolean}
     */
    GridComponent.prototype.isSortingAllowed = function (column) {
        return this._options.get('sorting') && column.sorting === true;
    };
    /**
     * Determine the column name used in column options.
     *
     * @param {string} key Data item key
     * @param {any} row Data item, could be primitive data type or an object
     * @returns {string}
     */
    GridComponent.prototype.getColumnName = function (key, row) {
        if (_.isObject(row[key])) {
            return key.concat('.', this.getNestedKey(row[key]));
        }
        return key;
    };
    /**
     * Check if row is selected.
     *
     * @param {any} row
     * @returns boolean
     */
    GridComponent.prototype.isRowSelected = function (row) {
        var id = row[this._options.get('uniqueId')];
        if (_.isUndefined(this.selectionMap[id])) {
            return false;
        }
        return this.selectionMap[id];
    };
    /**
     * Check if displaying results is allowed.
     *
     * @returns boolean
     */
    GridComponent.prototype.isResultsDisplayAllowed = function () {
        if (this._options.get('requireFilters')) {
            if (!_.isUndefined(this.columns)) {
                for (var _i = 0, _a = this.columns; _i < _a.length; _i++) {
                    var column = _a[_i];
                    if (!_.isUndefined(this.getFilter(column.name))) {
                        return true;
                    }
                }
            }
            return false;
        }
        return true;
    };
    /**
     * Start grid body drag.
     *
     * @param {MouseEvent} event
     */
    GridComponent.prototype.startBodyDrag = function (event) {
        this.bodyClientX = event.clientX;
        this.bodyScrollLeft = this.bodyRef.nativeElement.scrollLeft;
    };
    /**
     * End grid body drag.
     */
    GridComponent.prototype.endBodyDrag = function () {
        delete this.bodyClientX;
        delete this.bodyScrollLeft;
        this.bodyRef.nativeElement.style.cursor = 'auto';
    };
    /**
     * Handle grid body drag.
     *
     * @param {MouseEvent} event
     */
    GridComponent.prototype.bodyDrag = function (event) {
        if (!_.isUndefined(this.bodyClientX) && !_.isUndefined(this.bodyScrollLeft)) {
            this.bodyRef.nativeElement.style.cursor = 'move';
            this.bodyRef.nativeElement.scrollLeft = this.bodyScrollLeft
                - (event.clientX - this.bodyClientX);
        }
    };
    /**
     * Concat css class name to another using space.
     *
     * @param {string} cssClass
     * @param {string} addition
     * @returns {string}
     */
    GridComponent.prototype.concatCssClass = function (cssClass, addition) {
        return cssClass + (cssClass.length ? ' ' : '') + addition;
    };
    /**
     * Handle select/deselect a single grid row.
     *
     * @param {any} row
     * @param {boolean} value
     */
    GridComponent.prototype.setRowSelection = function (row, value) {
        var id = row[this._options.get('uniqueId')];
        var selected = !_.isUndefined(value) ? value :
            (_.isUndefined(this.selectionMap[id]) || !this.selectionMap[id] ? true : false);
        var isCurrentRowSelected = this.isRowSelected(row);
        if (!this._options.get('selectionMultiple')) {
            this.clearSelection();
        }
        if (selected && !isCurrentRowSelected) {
            this.selectedItems.push(row);
        }
        else if (!selected) {
            this.selectedItems.splice(this.selectedItems.indexOf(row), 1);
        }
        this.selectionMap[id] = selected;
        this.itemSelect.emit(new grid_event_1.GridEvent({
            data: selected,
            target: row,
            type: grid_event_1.GridEvent.ITEM_SELECT_EVENT
        }));
    };
    /**
     * Get full key name from nested object.
     *
     * @param {any} object Nested object to be iterated
     * @returns {string}
     * @example
     * var object: any = {country: { name: { officialName: "People's Republic of China", name: "China" }, id: 6 }}
     * var nestedKey: string = this.getNestedKey(object);
     * console.log(nestedKey); // will output 'country.name.officialName'
     */
    GridComponent.prototype.getNestedKey = function (object) {
        var firstKey = _.keys(object)[0];
        var firstKeyValue = object[firstKey];
        if (_.isObject(firstKeyValue)) {
            firstKey.concat('.', this.getNestedKey(firstKeyValue));
        }
        return firstKey;
    };
    GridComponent.ROW_ALT_CLASS = 'alt';
    GridComponent.ROW_HOVER_CLASS = 'hover';
    GridComponent.ROW_SELECT_CLASS = 'select';
    __decorate([
        core_1.ContentChildren(grid_column_component_1.GridColumnComponent),
        __metadata("design:type", core_1.QueryList)
    ], GridComponent.prototype, "columnList", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "filterChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "sortChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "pageChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "pageSizeChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "itemSelect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "requestSend", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "serverError", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], GridComponent.prototype, "update", void 0);
    __decorate([
        core_1.ViewChild('header'),
        __metadata("design:type", core_1.ElementRef)
    ], GridComponent.prototype, "headerRef", void 0);
    __decorate([
        core_1.ViewChild('body'),
        __metadata("design:type", core_1.ElementRef)
    ], GridComponent.prototype, "bodyRef", void 0);
    __decorate([
        core_1.Input('options'),
        __metadata("design:type", grid_options_1.GridOptions),
        __metadata("design:paramtypes", [grid_options_1.GridOptions])
    ], GridComponent.prototype, "options", null);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UIEvent]),
        __metadata("design:returntype", void 0)
    ], GridComponent.prototype, "onWindowResize", null);
    __decorate([
        core_1.HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [UIEvent]),
        __metadata("design:returntype", void 0)
    ], GridComponent.prototype, "onWindowScroll", null);
    __decorate([
        core_1.HostListener('window:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [MouseEvent]),
        __metadata("design:returntype", void 0)
    ], GridComponent.prototype, "onWindowMouseUp", null);
    GridComponent = GridComponent_1 = __decorate([
        core_1.Component({
            selector: 'ng-grid',
            template: "\n<div class=\"ng-grid\"\n  (mousedown)=\"onGridMouseDown($event)\"\n  (mousemove)=\"onGridMouseMove($event)\"\n  (dragstart)=\"onGridDragStart($event)\">\n  <div #header class=\"ng-grid-header\"\n      [class.scroll]=\"options.get('height')\"\n      [style.width]=\"options.get('width')\">\n    <table [class]=\"getHeadingCssClass()\" [style.width]=\"options.get('width')\">\n      <thead *ngIf=\"options.get('heading')\">\n        <tr>\n          <th *ngIf=\"options.get('selection')\" class=\"ng-grid-heading selection\">\n            <input #selectAll type=\"checkbox\"\n                *ngIf=\"options.get('selectionMultiple')\"\n                [ngModel]=\"allResultsSelected()\"\n                (click)=\"onSelectAllCheckboxClick(selectAll.checked)\">\n          </th>\n          <th *ngFor=\"let column of columns\" class=\"ng-grid-heading\"\n              [style.width]=\"column.width\"\n              [class.sort]=\"isSortedBy(column)\"\n              [class.sort-asc]=\"isSortedBy(column, 'asc')\"\n              [class.sort-desc]=\"isSortedBy(column, 'desc')\"\n              [class.sort-disable]=\"!isSortingAllowed(column)\"\n              [ngClass]=\"column.cssClass\"\n              (click)=\"onHeadingClick(column)\">\n            {{column.resolveHeading()}}\n          </th>\n        </tr>\n      </thead>\n      <tbody *ngIf=\"options.get('filtering')\">\n        <tr>\n          <td *ngIf=\"options.get('selection')\" class=\"ng-grid-filter selection\"></td>\n          <td *ngFor=\"let column of columns\" class=\"ng-grid-filter\">\n            <input type=\"text\" *ngIf=\"isInputFilterEnabled(column)\"\n                [ngModel]=\"getFilter(column.name)\"\n                (keyup.enter)=\"onInputFilterEnter($event, column)\"\n                (blur)=\"onInputFilterBlur($event, column)\"\n                (change)=\"onInputFilterChange($event, column)\" />\n            <select *ngIf=\"isSelectFilterEnabled(column)\"\n                [ngModel]=\"getFilter(column.name)\"\n                (ngModelChange)=\"onSelectFilterChange($event, column)\">\n              <option></option>\n              <option\n                *ngFor=\"let item of column.items\"\n                [value]=\"item[column.valueField]\">{{item[column.textField]}}</option>\n            </select>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div #body class=\"ng-grid-body\"\n      [class.scroll]=\"options.get('height')\"\n      (scroll)=\"onBodyScroll(body, header)\"\n      [style.width]=\"options.get('width')\"\n      [style.max-height]=\"options.get('height')\">\n    <p *ngIf=\"!isResultsDisplayAllowed()\" [style.width]=\"fullTableWidth\">\n      To view results please add search filters\n    </p>\n    <p *ngIf=\"isResultsDisplayAllowed() && getResults().length === 0\" [style.width]=\"fullTableWidth\">\n      No results found\n    </p>\n    <table [class]=\"getBodyCssClass()\" [style.width]=\"options.get('width')\"\n      *ngIf=\"isResultsDisplayAllowed()\">\n      <tbody>\n        <tr *ngFor=\"let row of getResults(); let i = index\"\n            [class]=\"getRowCssClass(i, row)\"\n            (click)=\"onRowClick(row)\">\n          <td *ngIf=\"options.get('selection')\" class=\"ng-grid-cell selection\">\n            <input type=\"checkbox\"\n                [ngModel]=\"isRowSelected(row)\"\n                (click)=\"onSelectItemCheckboxClick($event, row)\">\n          </td>\n          <td *ngFor=\"let column of columns\" class=\"ng-grid-cell\"\n              [style.width]=\"column.width\"\n              [style.text-align]=\"column.textAlign\"\n              [ngClass]=\"column.cellStyleCallback(row)\">\n            <span *ngIf=\"column.template\">\n              <ng-grid-cell-renderer [column]=\"column\" [data]=\"row\">\n              </ng-grid-cell-renderer>\n            </span>\n            <span *ngIf=\"!column.template\">\n              {{column.resolveCell(row)}}\n            </span>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div #footer class=\"ng-grid-footer clearfix\">\n    <div class=\"ng-grid-pager {{options.get('pageElementPosition')}}\"\n      *ngIf=\"options.paging && isResultsDisplayAllowed()\">\n      <span>Pages:</span>\n      <a href=\"#\" *ngIf=\"getPageIndex() > 1\" [attr.data-page]=\"1\"\n        (click)=\"onPageButtonClick($event)\">First</a>\n      <a href=\"#\" *ngIf=\"getPageIndex() > 1\" [attr.data-page]=\"getPageIndex() - 1\"\n        (click)=\"onPageButtonClick($event)\">Prev</a>\n      <ng-template ngFor let-page [ngForOf]=\"pages\">\n        <a href=\"#\" *ngIf=\"page != getPageIndex()\" [attr.data-page]=\"page\"\n          (click)=\"onPageButtonClick($event)\">{{page}}</a>\n        <span *ngIf=\"page == getPageIndex()\">{{page}}</span>\n      </ng-template>\n      <a href=\"#\" *ngIf=\"getPageIndex() < getTotalPages()\"\n        [attr.data-page]=\"getPageIndex() + 1\"\n        (click)=\"onPageButtonClick($event)\">Next</a>\n      <a href=\"#\" *ngIf=\"getPageIndex() < getTotalPages()\"\n        [attr.data-page]=\"getTotalPages()\"\n        (click)=\"onPageButtonClick($event)\">Last</a>\n      <span>{{getPageIndex()}} of {{getTotalPages()}}</span>\n    </div>\n    <div class=\"ng-grid-pager-size {{options.get('pageSizeElementPosition')}}\"\n      *ngIf=\"isPageSizeOptionsEnabled()\">\n      <span>Page size:</span>\n      <select [ngModel]=\"getPageSize()\"\n        (ngModelChange)=\"onPageSizeDropDownChange($event)\">\n        <option\n          *ngFor=\"let value of options.get('pageSizeOptions')\"\n          [value]=\"value\">{{value}}</option>\n      </select>\n    </div>\n  </div>\n</div>"
        }),
        __metadata("design:paramtypes", [http_1.Http,
            core_1.Renderer,
            core_1.ChangeDetectorRef])
    ], GridComponent);
    return GridComponent;
    var GridComponent_1;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map