import { Http } from '@angular/http';
import { Loadable } from './loadable';
import { StyleCallback } from './style-callback.interface';
/**
 * Grid options class.
 *
 * Defines all configuration options for the Grid component.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
export declare class GridOptions extends Loadable {
  static DEFAULT_FILTERING_VALUE: boolean;
  static DEFAULT_HEADING_VALUE: boolean;
  static DEFAULT_HEADING_FIXED_VALUE: boolean;
  static DEFAULT_PAGE_BUTTON_COUNT_VALUE: number;
  static DEFAULT_PAGE_ELEMENT_POSITION_VALUE: string;
  static DEFAULT_PAGE_SIZE_OPTIONS_VALUE: Array<number>;
  static DEFAULT_PAGE_SIZE_ELEMENT_POSITION_VALUE: string;
  static DEFAULT_PAGE_SIZE_VALUE: number;
  static DEFAULT_PAGING_VALUE: boolean;
  static DEFAULT_PRESERVE_SELECTION_VALUE: boolean;
  static DEFAULT_REQUIRE_FILTERS: boolean;
  static DEFAULT_ROW_ALTERNATE_STYLE_VALUE: boolean;
  static DEFAULT_ROW_HOVER_STYLE_VALUE: boolean;
  static DEFAULT_ROW_SELECTION_STYLE_VALUE: boolean;
  static DEFAULT_SELECTION_VALUE: boolean;
  static DEFAULT_SELECTION_MULTIPLE_VALUE: boolean;
  static DEFAULT_SORTING_VALUE: boolean;
  static DEFAULT_WIDTH_VALUE: string;
  static DEFAULT_UNIQUE_ID_VALUE: string;
  protected additionalRequestParams: any;
  protected bodyCssClass: string;
  protected data: Array<any>;
  protected dataItemCallback: DataItemCallback;
  protected defaultFilteringColumn: string;
  protected defaultFilteringColumnValue: string;
  protected defaultPageSize: any;
  protected defaultSortColumn: string;
  protected defaultSortType: string;
  protected heading: boolean;
  protected headingFixed: boolean;
  protected headingCssClass: string;
  protected height: string;
  protected httpService: Http;
  protected pageButtonCount: number;
  protected pageElementPosition: string;
  protected pageParam: string;
  protected pageSizeOptions: any;
  protected pageSizeElementPosition: string;
  protected pageSizeParam: string;
  protected paging: boolean;
  protected preserveSelection: boolean;
  protected requireFilters: boolean;
  protected rowAlternateStyle: boolean;
  protected rowHoverStyle: boolean;
  protected rowSelectionStyle: boolean;
  protected rowStyleCallback: StyleCallback;
  protected filtering: boolean;
  protected selection: boolean;
  protected selectionMultiple: boolean;
  protected sortParam: string;
  protected sorting: boolean;
  protected totalCountHeader: string;
  protected uniqueId: string;
  protected url: string;
  protected width: string;

  /**
   * Class constructor.
   * Set default values for properties if not specified in params.
   */
  constructor(params?: any);

  /**
   * Return specified param.
   *
   * @param {string} param
   * @returns {any}
   */
  get(param: string): any;
}
export interface DataItemCallback {
  (row: any): any;
}
