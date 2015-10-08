export function initialize(container, application) {
  application.inject('route', 'opentok', 'service:opentok');
  application.inject('component', 'opentok', 'service:opentok');
  application.inject('controller', 'opentok', 'service:opentok');

}

export default {
  name: 'opentok-service',
  initialize: initialize
};
