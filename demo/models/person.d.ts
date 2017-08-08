import { Country } from './country';
/**
 * Person model class.
 *
 * Used for transforming row data into specific model via data item callback.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-beta
 */
export declare class Person {
  readonly isRetired: boolean;

  id: number;
  name: string;
  age: number;
  address: string;
  country: Country;
  isMarried: boolean;

  constructor(params: any);
}
