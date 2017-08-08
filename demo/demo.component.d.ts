import { AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GridComponent, GridEvent, GridOptions } from '../src/index';
/**
 * Demo component class.
 *
 * Contains examples about component usage.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
export declare class DemoComponent implements OnInit, AfterViewInit {
  private http;
  private changeDetectorRef;
  basicOptions: GridOptions;
  remoteDataOptions: GridOptions;
  fullConfigurationOptions: GridOptions;
  basicGrid: GridComponent;
  columnGrid: GridComponent;
  isMarriedItems: Array<any>;
  countryItems: Array<any>;

  constructor(http: Http, changeDetectorRef: ChangeDetectorRef);

  ngOnInit(): void;

  ngAfterViewInit(): void;

  onItemClick(e: MouseEvent, item: any): void;

  getIsMarriedItems(): Array<any>;

  getCountryItems(): Array<any>;

  onClearSelectionBtnClick(): void;

  onGridEvent(event: GridEvent): void;

  /**
   * Cell callback style method.
   *
   * @param {any} data
   *
   * @return {string}
   */
  getCellCssClass(data: any): string;
}
