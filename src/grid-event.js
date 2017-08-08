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
/**
 * Grid event class.
 *
 * Encapsulates data about event emitted from Grid component.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.15
 */
var GridEvent = (function (_super) {
    __extends(GridEvent, _super);
    function GridEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridEvent.FILTER_CHANGE_EVENT = 'filterChange';
    GridEvent.ITEM_SELECT_EVENT = 'itemSelect';
    GridEvent.PAGE_CHANGE_EVENT = 'pageChange';
    GridEvent.PAGE_SIZE_CHANGE_EVENT = 'pageSizeChange';
    GridEvent.REQUEST_SEND_EVENT = 'requestSend';
    GridEvent.SERVER_ERROR_EVENT = 'serverError';
    GridEvent.SORT_CHANGE_EVENT = 'sortChange';
    GridEvent.UPDATE_EVENT = 'update';
    return GridEvent;
}(loadable_1.Loadable));
exports.GridEvent = GridEvent;
//# sourceMappingURL=grid-event.js.map