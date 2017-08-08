"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/**
 * Loadable is a class that implements loading properties via constructor.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha
 */
var Loadable = (function () {
    /**
     * Class constructor.
     *
     * @param {any} params Optional, if given params would be assigned as properties
     */
    function Loadable(params) {
        this.params = params;
        this.loadProperties();
    }
    /**
     * Load param values to object properties.
     */
    Loadable.prototype.loadProperties = function () {
        if (!_.isEmpty(this.params)) {
            for (var param in this.params) {
                if (this.params.hasOwnProperty(param)) {
                    this[param] = this.params[param];
                }
            }
        }
    };
    return Loadable;
}());
exports.Loadable = Loadable;
//# sourceMappingURL=loadable.js.map