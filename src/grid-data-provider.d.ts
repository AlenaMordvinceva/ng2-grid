import { Http, Response, URLSearchParams } from '@angular/http';
import { Loadable } from './loadable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Data provider class for Grid component.
 *
 * Works with static and remote data.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
export declare class GridDataProvider extends Loadable {
  static DEFAULT_PAGE_PARAM_VALUE: string;
  static DEFAULT_PAGE_SIZE_PARAM_VALUE: string;
  static DEFAULT_PAGE_SIZE_VALUE: number;
  static DEFAULT_SORT_PARAM_VALUE: string;
  static DEFAULT_TOTAL_COUNT_HEADER_VALUE: string;
  static SORT_ASC: string;
  static SORT_DESC: string;

  private http;
  pageParam: string;
  pageSizeParam: string;
  pageSize: any;
  pageIndex: number;
  requestParams: Array<any>;
  sortParam: string;
  sourceData: Array<any>;
  sourceUrl: string;
  totalCountHeader: string;
  private data;
  private sortColumn;
  private sortType;
  private totalCount;

  /**
   * Class constructor.
   * Set default values for properties if not specified in params.
   */
  constructor(http: Http, params?: any);

  /**
   * Return sorted data for given page.
   * If page is not specified all data would be returned.
   *
   * @returns {Array<any>}
   */
  getData(): Array<any>;

  /**
   * Set data for current page.
   *
   * @param {Array<any>} data
   */
  setData(data: Array<any>): void;

  /**
   * Return number of results displayed on current page.
   *
   * @returns {number}
   */
  getCount(): number;

  /**
   * Return total number of results for all pages.
   *
   * @returns {number}
   */
  getTotalCount(): number;

  /**
   * Set number of total resutls for all pages.
   *
   * @param {number} totalCount
   */
  setTotalCount(totalCount: number): void;

  /**
   * Set a sort column and sort type for the data provider.
   *
   * @param {string} sortColumn Name of grid column to be used for sorting
   * @param {string} sortType Optional, values are 'asc' or 'desc'
   */
  setSort(sortColumn: string, sortType?: string): void;

  /**
   * Getter for {{sortColumn}} property.
   */
  getSortColumn(): string;

  /**
   * Getter for {{sortType}} property.
   */
  getSortType(): string;

  /**
   * Fetch data from remote service for current page.
   *
   * @param {number} page
   * @returns {Observable<Response>}
   */
  fetch(): Observable<Response>;

  /**
   * Build request params.
   *
   * @returns {URLSearchParams}
   */
  protected buildRequestParams(): URLSearchParams;

  /**
   * Slice data to specific page.
   * If pageSize is not specified all data would be returned.
   */
  protected slice(): void;

  /**
   * Sort provided static data.
   */
  protected sort(): void;
}
