import { OnInit, ViewContainerRef } from '@angular/core';
import { GridColumnComponent } from './grid-column.component';
/**
 * GridCell component used to render Grid cell template.
 *
 * @author Branimir Borisov <branimir@raketasoft.com>
 * @since 1.0.0-alpha.4
 */
export declare class GridCellRendererComponent implements OnInit {
  private viewContainerRef;
  data: any;
  column: GridColumnComponent;

  /**
   * Class constructor.
   *
   * @param {ViewContainerRef} viewContainerRef
   */
  constructor(viewContainerRef: ViewContainerRef);

  /**
   * Handle onInit event.
   */
  ngOnInit(): void;
}
