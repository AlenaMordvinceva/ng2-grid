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
var grid_column_component_1 = require("./grid-column.component");
/**
 * GridCell component used to render Grid cell template.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.4
 */
var GridCellRendererComponent = (function () {
    /**
     * Class constructor.
     *
     * @param {ViewContainerRef} viewContainerRef
     */
    function GridCellRendererComponent(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    /**
     * Handle onInit event.
     */
    GridCellRendererComponent.prototype.ngOnInit = function () {
        this.viewContainerRef.createEmbeddedView(this.column.template, {
            'column': this.column,
            'data': this.data
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], GridCellRendererComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", grid_column_component_1.GridColumnComponent)
    ], GridCellRendererComponent.prototype, "column", void 0);
    GridCellRendererComponent = __decorate([
        core_1.Component({
            selector: 'ng-grid-cell-renderer',
            template: ''
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef])
    ], GridCellRendererComponent);
    return GridCellRendererComponent;
}());
exports.GridCellRendererComponent = GridCellRendererComponent;
//# sourceMappingURL=grid-cell-renderer.component.js.map