import { toolTip } from './toolTip';
function installDirective (app) {
  app.directive('tip', toolTip);
}
export { installDirective };
