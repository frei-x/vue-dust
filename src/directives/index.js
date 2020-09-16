import { toolTip } from './toolTip';
function installDirective (app) {
  app.directive('tool', toolTip);
}
export { installDirective };
