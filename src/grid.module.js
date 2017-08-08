"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var grid_component_1 = require("./grid.component");
var grid_column_component_1 = require("./grid-column.component");
var grid_cell_renderer_component_1 = require("./grid-cell-renderer.component");
/**
 * Grid module class.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-beta.1
 */
var GridModule = (function () {
    function GridModule() {
    }
    GridModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            declarations: [
                grid_component_1.GridComponent,
                grid_column_component_1.GridColumnComponent,
                grid_cell_renderer_component_1.GridCellRendererComponent
            ],
            exports: [
                grid_component_1.GridComponent,
                grid_column_component_1.GridColumnComponent,
                grid_cell_renderer_component_1.GridCellRendererComponent
            ]
        })
    ], GridModule);
    return GridModule;
}());
exports.GridModule = GridModule;
//# sourceMappingURL=grid.module.js.map