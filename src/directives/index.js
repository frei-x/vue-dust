import { toolTip } from './toolTip';
import { boxSelection } from './boxSelection';
function installDirective (app) {
  app.directive('tip', toolTip);
  app.directive('box-selection', boxSelection);
}
export { installDirective };
