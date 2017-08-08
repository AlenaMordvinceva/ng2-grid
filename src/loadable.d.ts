/**
 * Loadable is a class that implements loading properties via constructor.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha
 */
export declare class Loadable {
  private params;

  /**
   * Class constructor.
   *
   * @param {any} params Optional, if given params would be assigned as properties
   */
  constructor(params?: any);

  /**
   * Load param values to object properties.
   */
  protected loadProperties(): void;
}
