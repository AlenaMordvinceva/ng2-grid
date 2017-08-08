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
var loadable_1 = require("./loadable");
var _ = require("lodash");
/**
 * Grid options class.
 *
 * Defines all configuration options for the Grid component.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
var GridOptions = (function (_super) {
    __extends(GridOptions, _super);
    /**
     * Class constructor.
     * Set default values for properties if not specified in params.
     */
    function GridOptions(params) {
        var _this = _super.call(this, params) || this;
        if (_.isUndefined(_this.filtering)) {
            _this.filtering = GridOptions.DEFAULT_FILTERING_VALUE;
        }
        if (_.isUndefined(_this.heading)) {
            _this.heading = GridOptions.DEFAULT_HEADING_VALUE;
        }
        if (_.isUndefined(_this.headingFixed)) {
            _this.headingFixed = GridOptions.DEFAULT_HEADING_FIXED_VALUE;
        }
        if (_.isUndefined(_this.defaultPageSize)) {
            _this.defaultPageSize = GridOptions.DEFAULT_PAGE_SIZE_VALUE;
        }
        if (_.isUndefined(_this.pageButtonCount)) {
            _this.pageButtonCount = GridOptions.DEFAULT_PAGE_BUTTON_COUNT_VALUE;
        }
        if (_.isUndefined(_this.pageElementPosition)) {
            _this.pageElementPosition = GridOptions.DEFAULT_PAGE_ELEMENT_POSITION_VALUE;
        }
        if (_.isUndefined(_this.pageSizeOptions)) {
            _this.pageSizeOptions = GridOptions.DEFAULT_PAGE_SIZE_OPTIONS_VALUE;
        }
        if (_.isUndefined(_this.pageSizeElementPosition)) {
            _this.pageSizeElementPosition = GridOptions.DEFAULT_PAGE_SIZE_ELEMENT_POSITION_VALUE;
        }
        if (_.isUndefined(_this.paging)) {
            _this.paging = GridOptions.DEFAULT_PAGING_VALUE;
        }
        if (_.isUndefined(_this.preserveSelection)) {
            _this.preserveSelection = GridOptions.DEFAULT_PRESERVE_SELECTION_VALUE;
        }
        if (_.isUndefined(_this.requireFilters)) {
            _this.requireFilters = GridOptions.DEFAULT_REQUIRE_FILTERS;
        }
        if (_.isUndefined(_this.rowAlternateStyle)) {
            _this.rowAlternateStyle = GridOptions.DEFAULT_ROW_ALTERNATE_STYLE_VALUE;
        }
        if (_.isUndefined(_this.rowHoverStyle)) {
            _this.rowHoverStyle = GridOptions.DEFAULT_ROW_HOVER_STYLE_VALUE;
        }
        if (_.isUndefined(_this.rowSelectionStyle)) {
            _this.rowSelectionStyle = GridOptions.DEFAULT_ROW_SELECTION_STYLE_VALUE;
        }
        if (_.isUndefined(_this.selection)) {
            _this.selection = GridOptions.DEFAULT_SELECTION_VALUE;
        }
        if (_.isUndefined(_this.selectionMultiple)) {
            _this.selectionMultiple = GridOptions.DEFAULT_SELECTION_MULTIPLE_VALUE;
        }
        if (_.isUndefined(_this.sorting)) {
            _this.sorting = GridOptions.DEFAULT_SORTING_VALUE;
        }
        if (_.isUndefined(_this.uniqueId)) {
            _this.uniqueId = GridOptions.DEFAULT_UNIQUE_ID_VALUE;
        }
        if (_.isUndefined(_this.width)) {
            _this.width = GridOptions.DEFAULT_WIDTH_VALUE;
        }
        return _this;
    }
    /**
     * Return specified param.
     *
     * @param {string} param
     * @returns {any}
     */
    GridOptions.prototype.get = function (param) {
        return this[param];
    };
    GridOptions.DEFAULT_FILTERING_VALUE = true;
    GridOptions.DEFAULT_HEADING_VALUE = true;
    GridOptions.DEFAULT_HEADING_FIXED_VALUE = false;
    GridOptions.DEFAULT_PAGE_BUTTON_COUNT_VALUE = 5;
    GridOptions.DEFAULT_PAGE_ELEMENT_POSITION_VALUE = 'left';
    GridOptions.DEFAULT_PAGE_SIZE_OPTIONS_VALUE = [20, 50, 100];
    GridOptions.DEFAULT_PAGE_SIZE_ELEMENT_POSITION_VALUE = 'right';
    GridOptions.DEFAULT_PAGE_SIZE_VALUE = 20;
    GridOptions.DEFAULT_PAGING_VALUE = true;
    GridOptions.DEFAULT_PRESERVE_SELECTION_VALUE = false;
    GridOptions.DEFAULT_REQUIRE_FILTERS = false;
    GridOptions.DEFAULT_ROW_ALTERNATE_STYLE_VALUE = true;
    GridOptions.DEFAULT_ROW_HOVER_STYLE_VALUE = true;
    GridOptions.DEFAULT_ROW_SELECTION_STYLE_VALUE = true;
    GridOptions.DEFAULT_SELECTION_VALUE = false;
    GridOptions.DEFAULT_SELECTION_MULTIPLE_VALUE = true;
    GridOptions.DEFAULT_SORTING_VALUE = true;
    GridOptions.DEFAULT_WIDTH_VALUE = '100%';
    GridOptions.DEFAULT_UNIQUE_ID_VALUE = 'id';
    return GridOptions;
}(loadable_1.Loadable));
exports.GridOptions = GridOptions;
//# sourceMappingURL=grid-options.js.map