import { OnInit, TemplateRef } from '@angular/core';
import { StyleCallback } from './style-callback.interface';
/**
 * Grid column class.
 *
 * Defines a single Grid column with its properties inside the html template.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
export declare class GridColumnComponent implements OnInit {
  static FILTER_TYPE_SELECT: string;
  static FILTER_TYPE_INPUT: string;
  static COLUMN_TYPE_STRING: string;
  static COLUMN_TYPE_NUMBER: string;
  static DEFAULT_CSS_CLASS_VALUE: string;
  static DEFAULT_FILTERING_VALUE: boolean;
  static DEFAULT_SORTING_VALUE: boolean;
  cellStyleCallback: StyleCallback;
  cssClass: string;
  heading: string;
  name: string;
  filtering: boolean;
  filterType: string;
  sorting: boolean;
  width: string;
  textAlign: string;
  type: string;
  items: any;
  textField: string;
  valueField: string;
  template: TemplateRef<any>;

  /**
   * Handle OnInit event.
   */
  ngOnInit(): void;

  /**
   * Resolve grid heading value for this column.
   *
   * @returns {string}
   */
  resolveHeading(): string;

  /**
   * Resolve grid cell value for given column name and data row.
   *
   * @param {any} data
   * @param {string} columnName
   *
   * @returns {string}
   */
  resolveCell(data: any, columnName?: string): string;
}
