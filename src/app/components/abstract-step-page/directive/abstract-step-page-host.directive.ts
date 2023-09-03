import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAbstractStepPageHost]'
})
export class AbstractStepPageHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
