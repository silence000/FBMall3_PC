import Router from '../../router';

function SwitchRouter(to, from) {
  if (to !== from) {
    Router.push(from);
  }
}

export default SwitchRouter;
