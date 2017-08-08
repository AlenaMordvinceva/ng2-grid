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
var _ = require("lodash");
/**
 * Grid column class.
 *
 * Defines a single Grid column with its properties inside the html template.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.1
 */
var GridColumnComponent = (function () {
    function GridColumnComponent() {
    }
    GridColumnComponent_1 = GridColumnComponent;
    /**
     * Handle OnInit event.
     */
    GridColumnComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (_.isUndefined(this.cssClass)) {
            this.cssClass = GridColumnComponent_1.DEFAULT_CSS_CLASS_VALUE;
        }
        if (_.isUndefined(this.filtering)) {
            this.filtering = GridColumnComponent_1.DEFAULT_FILTERING_VALUE;
        }
        if (_.isUndefined(this.filterType)) {
            this.filterType = GridColumnComponent_1.FILTER_TYPE_INPUT;
        }
        if (_.isUndefined(this.sorting)) {
            this.sorting = GridColumnComponent_1.DEFAULT_SORTING_VALUE;
        }
        if (_.isUndefined(this.type)) {
            this.type = GridColumnComponent_1.COLUMN_TYPE_STRING;
        }
        if (_.isUndefined(this.cellStyleCallback)) {
            this.cellStyleCallback = function () {
                return _this.cssClass;
            };
        }
    };
    /**
     * Resolve grid heading value for this column.
     *
     * @returns {string}
     */
    GridColumnComponent.prototype.resolveHeading = function () {
        return this.heading ? this.heading : this.name;
    };
    /**
     * Resolve grid cell value for given column name and data row.
     *
     * @param {any} data
     * @param {string} columnName
     *
     * @returns {string}
     */
    GridColumnComponent.prototype.resolveCell = function (data, columnName) {
        if (columnName === void 0) { columnName = this.name; }
        return _.get(data, columnName);
    };
    GridColumnComponent.FILTER_TYPE_SELECT = 'select';
    GridColumnComponent.FILTER_TYPE_INPUT = 'input';
    GridColumnComponent.COLUMN_TYPE_STRING = 'string';
    GridColumnComponent.COLUMN_TYPE_NUMBER = 'number';
    GridColumnComponent.DEFAULT_CSS_CLASS_VALUE = '';
    GridColumnComponent.DEFAULT_FILTERING_VALUE = true;
    GridColumnComponent.DEFAULT_SORTING_VALUE = true;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Function)
    ], GridColumnComponent.prototype, "cellStyleCallback", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "cssClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "heading", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], GridColumnComponent.prototype, "filtering", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "filterType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], GridColumnComponent.prototype, "sorting", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "textAlign", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GridColumnComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "textField", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], GridColumnComponent.prototype, "valueField", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], GridColumnComponent.prototype, "template", void 0);
    GridColumnComponent = GridColumnComponent_1 = __decorate([
        core_1.Component({
            'selector': 'ng-grid-column',
            'template': ''
        })
    ], GridColumnComponent);
    return GridColumnComponent;
    var GridColumnComponent_1;
}());
exports.GridColumnComponent = GridColumnComponent;
//# sourceMappingURL=grid-column.component.js.map