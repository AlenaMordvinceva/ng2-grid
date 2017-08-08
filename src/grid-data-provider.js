"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var loadable_1 = require("./loadable");
var _ = require("lodash");
require("rxjs/Rx");
/**
 * Data provider class for Grid component.
 *
 * Works with static and remote data.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
var GridDataProvider = (function (_super) {
    __extends(GridDataProvider, _super);
    /**
     * Class constructor.
     * Set default values for properties if not specified in params.
     */
    function GridDataProvider(http, params) {
        var _this = _super.call(this, params) || this;
        _this.http = http;
        _this.pageIndex = 1;
        _this.data = [];
        _this.sortType = GridDataProvider.SORT_ASC;
        if (_.isUndefined(_this.sourceData)) {
            _this.sourceData = [];
        }
        if (_.isUndefined(_this.pageParam)) {
            _this.pageParam = GridDataProvider.DEFAULT_PAGE_PARAM_VALUE;
        }
        if (_.isUndefined(_this.pageSizeParam)) {
            _this.pageSizeParam = GridDataProvider.DEFAULT_PAGE_SIZE_PARAM_VALUE;
        }
        if (_.isUndefined(_this.pageSize)) {
            _this.pageSize = GridDataProvider.DEFAULT_PAGE_SIZE_VALUE;
        }
        if (_.isUndefined(_this.requestParams)) {
            _this.requestParams = [];
        }
        if (_.isUndefined(_this.sortParam)) {
            _this.sortParam = GridDataProvider.DEFAULT_SORT_PARAM_VALUE;
        }
        if (_.isUndefined(_this.totalCountHeader)) {
            _this.totalCountHeader = GridDataProvider.DEFAULT_TOTAL_COUNT_HEADER_VALUE;
        }
        return _this;
    }
    /**
     * Return sorted data for given page.
     * If page is not specified all data would be returned.
     *
     * @returns {Array<any>}
     */
    GridDataProvider.prototype.getData = function () {
        if (_.isUndefined(this.sourceUrl)) {
            this.sort();
            this.slice();
        }
        return this.data;
    };
    /**
     * Set data for current page.
     *
     * @param {Array<any>} data
     */
    GridDataProvider.prototype.setData = function (data) {
        this.data = data;
    };
    /**
     * Return number of results displayed on current page.
     *
     * @returns {number}
     */
    GridDataProvider.prototype.getCount = function () {
        return this.data.length;
    };
    /**
     * Return total number of results for all pages.
     *
     * @returns {number}
     */
    GridDataProvider.prototype.getTotalCount = function () {
        if (_.isUndefined(this.sourceUrl) && !_.isUndefined(this.sourceData)) {
            this.totalCount = this.sourceData.length;
        }
        return this.totalCount;
    };
    /**
     * Set number of total resutls for all pages.
     *
     * @param {number} totalCount
     */
    GridDataProvider.prototype.setTotalCount = function (totalCount) {
        this.totalCount = totalCount;
    };
    /**
     * Set a sort column and sort type for the data provider.
     *
     * @param {string} sortColumn Name of grid column to be used for sorting
     * @param {string} sortType Optional, values are 'asc' or 'desc'
     */
    GridDataProvider.prototype.setSort = function (sortColumn, sortType) {
        if (!_.isUndefined(sortType)) {
            this.sortType = sortType;
        }
        this.sortColumn = sortColumn;
    };
    /**
     * Getter for {{sortColumn}} property.
     */
    GridDataProvider.prototype.getSortColumn = function () {
        return this.sortColumn;
    };
    /**
     * Getter for {{sortType}} property.
     */
    GridDataProvider.prototype.getSortType = function () {
        return this.sortType;
    };
    /**
     * Fetch data from remote service for current page.
     *
     * @param {number} page
     * @returns {Observable<Response>}
     */
    GridDataProvider.prototype.fetch = function () {
        var _this = this;
        var params = this.buildRequestParams();
        var response = this.http
            .get(this.sourceUrl, { search: params })
            .share();
        response
            .subscribe(function (res) {
            _this.setTotalCount(Number(res.headers.get(_this.totalCountHeader)));
            _this.setData(res.json());
        }, function (err) {
            console.log(err);
        });
        return response;
    };
    /**
     * Build request params.
     *
     * @returns {URLSearchParams}
     */
    GridDataProvider.prototype.buildRequestParams = function () {
        var params = new http_1.URLSearchParams();
        params.set(this.pageParam, this.pageIndex.toString());
        if (this.pageSize !== false) {
            params.set(this.pageSizeParam, this.pageSize);
        }
        if (!_.isUndefined(this.sortColumn)) {
            var sortByValue = (this.sortType === GridDataProvider.SORT_ASC ? '' : '-')
                + this.sortColumn;
            params.set(this.sortParam, sortByValue);
        }
        for (var key in this.requestParams) {
            if (this.requestParams.hasOwnProperty(key)) {
                params.set(key, this.requestParams[key]);
            }
        }
        return params;
    };
    /**
     * Slice data to specific page.
     * If pageSize is not specified all data would be returned.
     */
    GridDataProvider.prototype.slice = function () {
        var data = [];
        if (this.pageSize !== false) {
            var start = (this.pageIndex - 1) * this.pageSize;
            var end = start + Number(this.pageSize);
            data = _.slice(this.sourceData, start, end);
        }
        else {
            data = this.sourceData;
        }
        this.data = data;
    };
    /**
     * Sort provided static data.
     */
    GridDataProvider.prototype.sort = function () {
        if (!_.isUndefined(this.sortColumn)) {
            this.sourceData = _.orderBy(this.sourceData, [this.sortColumn], [this.sortType]);
        }
    };
    GridDataProvider.DEFAULT_PAGE_PARAM_VALUE = 'page';
    GridDataProvider.DEFAULT_PAGE_SIZE_PARAM_VALUE = 'pageSize';
    GridDataProvider.DEFAULT_PAGE_SIZE_VALUE = 20;
    GridDataProvider.DEFAULT_SORT_PARAM_VALUE = 'orderBy';
    GridDataProvider.DEFAULT_TOTAL_COUNT_HEADER_VALUE = 'X-Pagination-Total-Count';
    GridDataProvider.SORT_ASC = 'asc';
    GridDataProvider.SORT_DESC = 'desc';
    return GridDataProvider;
}(loadable_1.Loadable));
exports.GridDataProvider = GridDataProvider;
//# sourceMappingURL=grid-data-provider.js.map