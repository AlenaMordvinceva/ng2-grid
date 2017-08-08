import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnInit, QueryList, Renderer } from '@angular/core';
import { Http } from '@angular/http';
import { GridOptions } from './grid-options';
import { GridColumnComponent } from './grid-column.component';
import { GridEvent } from './grid-event';
/**
 * Data grid component class.
 *
 * Component configuration is done through the options property.
 * Supports sorting, filtering and paging.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
export declare class GridComponent implements OnInit, AfterContentInit, AfterViewInit {
  static ROW_ALT_CLASS: string;
  static ROW_HOVER_CLASS: string;
  static ROW_SELECT_CLASS: string;

  private http;
  private renderer;
  private changeDetector;
  columnList: QueryList<GridColumnComponent>;
  filterChange: EventEmitter<GridEvent>;
  sortChange: EventEmitter<GridEvent>;
  pageChange: EventEmitter<GridEvent>;
  pageSizeChange: EventEmitter<GridEvent>;
  itemSelect: EventEmitter<GridEvent>;
  requestSend: EventEmitter<GridEvent>;
  serverError: EventEmitter<GridEvent>;
  update: EventEmitter<GridEvent>;
  headerRef: ElementRef;
  bodyRef: ElementRef;
  private _options;
  private columns;
  private data;
  private errors;
  private filters;
  private dataProvider;
  private pages;
  private selectionMap;
  private selectedItems;
  private headerOffsetTop;
  private headerOffsetHeight;
  private bodyOffsetTop;
  private bodyOffsetHeight;
  private headerTopLimit;
  private headerTop;
  private bodyScrollLeft;
  private bodyClientX;
  private fullTableWidth;
  /**
   * Getter for grid options.
   */
  /**
   * Setter for grid options.
   *
   * @param {GridOptions} value
   */
  options: GridOptions;

  /**
   * Class constructor.
   *
   * @param {Http} http
   */
  constructor(http: Http, renderer: Renderer, changeDetector: ChangeDetectorRef);

  /**
   * Handle OnInit event.
   */
  ngOnInit(): void;

  /**
   * Handle AfterContentInit event.
   */
  ngAfterContentInit(): void;

  /**
   * Handle AfterViewInit event.
   */
  ngAfterViewInit(): void;

  /**
   * Set all data bound to the grid.
   *
   * @returns {Array<any>}
   */
  setData(data: Array<any>): void;

  /**
   * Return all data bound to the grid.
   *
   * @returns {Array<any>}
   */
  getData(): Array<any>;

  /**
   * Return number of total results.
   *
   * @returns {number}
   */
  getTotalCount(): number;

  /**
   * Return number of total results.
   *
   * @param {number} totalCount
   */
  setTotalCount(totalCount: number): void;

  /**
   * Set the results displayed in current page.
   *
   * @params {Array<any>} results
   */
  setResults(results: Array<any>): void;

  /**
   * Return results displayed on current page.
   *
   * @returns {Array<any>}
   */
  getResults(): Array<any>;

  /**
   * Return number of results displayed on current page.
   *
   * @returns {number}
   */
  getCount(): number;

  /**
   * Return current page index.
   *
   * @returns {number}
   */
  getPageIndex(): number;

  /**
   * Render data for given page.
   *
   * @param {number} pageIndex
   */
  setPageIndex(pageIndex: number): void;

  /**
   * Return current page size.
   *
   * @returns {number|false}
   */
  getPageSize(): any;

  /**
   * Change page size to given value and render data.
   *
   * @param {number|false} pageSize
   */
  setPageSize(pageSize: any): void;

  /**
   * Return total number of grid pages.
   *
   * @returns {number}
   */
  getTotalPages(): number;

  /**
   * Add a filter value for specific column.
   *
   * @param {string} columnName Name of grid column or property of bound data item
   * @param {string} value Value to be used as filter for the column
   * @param {string} columnType Type of the column (text or number)
   *
   * @returns {boolean}
   */
  setFilter(columnName: string, value: string, columnType?: string): boolean;

  /**
   * Return filter value for given column.
   *
   * @param {string} columnName
   * @returns {any}
   */
  getFilter(columnName: string): any;

  /**
   * Clear filter value for given column.
   *
   * @param {string} columnName
   */
  clearFilter(columnName: string): void;

  /**
   * Clear filter values for all columns.
   */
  clearAllFilters(): void;

  /**
   * Set validation error for given column.
   *
   * @param {string} columnName
   * @param {string} error Error message
   */
  setError(columnName: string, error: string): void;

  /**
   * Return validation error for given column.
   *
   * @param {string} columnName
   * @returns {any}
   */
  getError(columnName: string): string;

  /**
   * Clear validation error for given column.
   *
   * @param {string} columnName
   */
  clearError(columnName: string): void;

  /**
   * Clear errors for all columns.
   */
  clearAllErrors(): void;

  /**
   * Calling this method would sort the grid data by the given sort column and
   * sort type.
   *
   * @param {string} columnName Name of grid column to be used for sorting
   * @param {string} sortType Optional, values are 'asc' or 'desc'
   */
  setSort(columnName: string, sortType?: string): void;

  /**
   * Return a list of selected grid items.
   *
   * @returns {Array<any>}
   */
  getSelectedItems(): Array<any>;

  /**
   * Clear all selected items.
   */
  clearSelection(): void;

  /**
   * Return grid column component by given name.
   *
   * @param {string} columnName
   * @returns {GridColumnComponent}
   */
  getColumn(columnName: string): any;

  /**
   * Render grid.
   */
  render(): boolean;

  /**
   * Handle window resize event.
   */
  protected onWindowResize(event: UIEvent): void;

  /**
   * Handle window scroll event.
   */
  protected onWindowScroll(event: UIEvent): void;

  /**
   * Handle windows mouseup event.
   */
  protected onWindowMouseUp(event: MouseEvent): void;

  /**
   * Handle grid body mousedown event.
   */
  protected onGridMouseDown(event: MouseEvent): void;

  /**
   * Handle grid body mousemove event.
   */
  protected onGridMouseMove(event: MouseEvent): void;

  /**
   * Handle grid body dragstart event.
   */
  protected onGridDragStart(event: MouseEvent): void;

  /**
   * Handle content size changes.
   */
  protected handleContentResize(): void;

  /**
   * Format data using dataItemCallback if given.
   *
   * @param {Array<any>} data
   *
   * @returns {Array<any>}
   */
  protected formatData(data: Array<any>): Array<any>;

  /**
   * Refresh grid component.
   */
  protected refresh(): void;

  /**
   * Filter provided data.
   */
  protected filter(): void;

  /**
   * Check if input filter is enabled for given column.
   *
   * @param {GridColumnComponent} column
   * @returns {boolean}
   */
  protected isInputFilterEnabled(column: GridColumnComponent): boolean;

  /**
   * Check if select filter is enabled for given column.
   *
   * @param {GridColumnComponent} column
   * @returns {boolean}
   */
  protected isSelectFilterEnabled(column: GridColumnComponent): boolean;

  /**
   * Determine the CSS class that needs to be applied to the each grid row.
   *
   * @param {number} index Row index
   * @param {any} row Row data
   * @returns {string} Row color
   */
  protected getRowCssClass(index: number, row: any): string;

  /**
   * Get heading css class.
   *
   * @returns {string}
   */
  protected getHeadingCssClass(): string;

  /**
   * Get body css class.
   *
   * @returns {string}
   */
  protected getBodyCssClass(): string;

  /**
   * Handle body scroll event.
   *
   * @param {HTMLElement} bodyElement
   * @param {HTMLElement} headerElement
   */
  protected onBodyScroll(bodyElement: HTMLElement, headerElement: HTMLElement): void;

  /**
   * Handle select/deselect all grid rows.
   *
   * @param {boolean} selected
   */
  protected onSelectAllCheckboxClick(selected: boolean): void;

  /**
   * Handle row select checkbox click.
   *
   * @param {MouseEvent} event
   * @param {any} row
   */
  protected onSelectItemCheckboxClick(event: MouseEvent, row: any): void;

  /**
   * Check if all results on current page are selected.
   *
   * @returns {boolean}
   */
  protected allResultsSelected(): boolean;

  /**
   * Handle grid row click event.
   *
   * @param {any} row
   */
  protected onRowClick(row: any): void;

  /**
   * Initialize data provider based on grid options.
   */
  protected initDataProvider(): void;

  /**
   * Build a list of the pages that should be display in the grid, based on
   * current page index and max button count.
   */
  protected paginate(): void;

  /**
   * Page button click handler.
   * When invoked grid data for specific page would be rendered.
   *
   * @param {MouseEvent} event
   */
  protected onPageButtonClick(event: MouseEvent): void;

  /**
   * Check if page size options are enabled.
   *
   * @returns {boolean}
   */
  protected isPageSizeOptionsEnabled(): boolean;

  /**
   * Page size drop-down change handler.
   * When invoked the page size of the grid would be changed and data would be
   * re-rendered.
   *
   * @param {any} event
   */
  protected onPageSizeDropDownChange(event: any): void;

  /**
   * Select filter change handler.
   * When invoked a filter would be set with the input value.
   *
   * @param {any} event
   * @param {GridColumnComponent} column
   */
  protected onSelectFilterChange(event: any, column: GridColumnComponent): void;

  /**
   * Input filter blur handler.
   * When invoked a filter would be set with the input value.
   *
   * @param {MouseEvent} event
   * @param {GridColumnComponent} column
   */
  protected onInputFilterBlur(event: MouseEvent, column: GridColumnComponent): void;

  /**
   * Input filter change handler.
   *
   * @param {MouseEvent} event
   * @param {GridColumnComponent} column
   */
  protected onInputFilterChange(event: MouseEvent, column: GridColumnComponent): void;

  /**
   * Input filter enter key hanlder.
   * When invoked a filter would be set with the input value and the grid
   * filter would be triggered.
   *
   * @param {MouseEvent} event
   * @param {GridColumnComponent} column
   */
  protected onInputFilterEnter(event: MouseEvent, column: GridColumnComponent): void;

  /**
   * Grid heading click handler.
   * When invoked the grid would be sorted by the clicked column.
   *
   * @param {GridColumnComponent} column
   */
  protected onHeadingClick(column: GridColumnComponent): void;

  /**
   * Check if data is sorted by specific column and type.
   *
   * @param {GridColumn} column
   * @param {string} sortType Optional, if given method would also check
   * current sort type value
   * @returns {boolean}
   */
  protected isSortedBy(column: GridColumnComponent, sortType?: string): boolean;

  /**
   * Determine sort type by column name.
   * If column name is different from current sort column the order type would
   * be preserved, otherwise the sort type would be changed to the opposite.
   *
   * @param {GridColumn} column
   * @returns {string}
   */
  protected getSortType(column: GridColumnComponent): string;

  /**
   * Check if sorting is allowed for specific grid column.
   *
   * @param {GridColumn} column
   * @returns {boolean}
   */
  protected isSortingAllowed(column: GridColumnComponent): boolean;

  /**
   * Determine the column name used in column options.
   *
   * @param {string} key Data item key
   * @param {any} row Data item, could be primitive data type or an object
   * @returns {string}
   */
  protected getColumnName(key: string, row: any): string;

  /**
   * Check if row is selected.
   *
   * @param {any} row
   * @returns boolean
   */
  protected isRowSelected(row: any): boolean;

  /**
   * Check if displaying results is allowed.
   *
   * @returns boolean
   */
  protected isResultsDisplayAllowed(): boolean;

  /**
   * Start grid body drag.
   *
   * @param {MouseEvent} event
   */
  private startBodyDrag(event);

  /**
   * End grid body drag.
   */
  private endBodyDrag();

  /**
   * Handle grid body drag.
   *
   * @param {MouseEvent} event
   */
  private bodyDrag(event);

  /**
   * Concat css class name to another using space.
   *
   * @param {string} cssClass
   * @param {string} addition
   * @returns {string}
   */
  private concatCssClass(cssClass, addition);

  /**
   * Handle select/deselect a single grid row.
   *
   * @param {any} row
   * @param {boolean} value
   */
  private setRowSelection(row, value?);

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
  private getNestedKey(object);
}
