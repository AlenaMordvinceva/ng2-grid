import { Loadable } from './loadable';
/**
 * Grid event class.
 *
 * Encapsulates data about event emitted from Grid component.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.15
 */
export declare class GridEvent extends Loadable {
  static FILTER_CHANGE_EVENT: string;
  static ITEM_SELECT_EVENT: string;
  static PAGE_CHANGE_EVENT: string;
  static PAGE_SIZE_CHANGE_EVENT: string;
  static REQUEST_SEND_EVENT: string;
  static SERVER_ERROR_EVENT: string;
  static SORT_CHANGE_EVENT: string;
  static UPDATE_EVENT: string;
  data: any;
  target: any;
  type: string;
}
