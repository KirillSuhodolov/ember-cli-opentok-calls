import Ember from 'ember';
import config from 'wecudos-mobile/config/environment';
import OpentokCalls from 'npm:opentok-calls';

export default Ember.Object.extend({
  opentokCalls: null,

  /*
   * Mandatory properties to manage calls
   **/
  isCalling: false,
  isCallGoes: false,
  canBePublished: false,
  hasPublisher: false,
  hasSession: false,
  hasLocalStream: false,
  isAnyStream: false,
  isAnyConnection: false,
  isAnySubscribers: false,

  initOpentokConsultations: function() {
    let opentokCalls = new OpentokCalls(config.openTok);

    this.set('opentokCalls', opentokCalls);

    opentokCalls.on('hash-changed', this._emitCallback.bind(this));
  }.on('init'),

  _emitCallback: function(hash) {
    this.setProperties(hash);
  },

  connect: function(sessionId, token) {
    this.get('opentokCalls').connect(sessionId, token);
  },

  disconnect: function () {
    this.get('opentokCalls').disconnect();
  },

  publish: function() {
    this.get('opentokCalls').publish();
  },

  unpublish: function() {
    this.get('opentokCalls').unpublish();
  }
});
