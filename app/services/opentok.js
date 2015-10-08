import Ember from 'ember';
import config from 'wecudos-mobile/config/environment';
import OpentokConsultations from 'npm:opentok-calls';

export default Ember.Object.extend({
  opentokConsultations: null,

  isConnectionCreated: false,
  isSessionConnected: false,
  opentokSession: null,
  localStream: null,
  publisher: null,
  streams: [],
  connections: [],
  subscribers: [],

  isCallGoes: function() {
    return this.get('opentokSession') && this.get('isSessionConnected') && this.get('isConnectionCreated') &&
      this.get('publisher') && this.get('subscribers.length') && this.get('streams.length') && this.get('localStream');
  }.property('isConnectionCreated', 'isSessionConnected', 'opentokSession', 'publisher',
    'subscribers.length', 'streams.length', 'localStream'),

  canBePubslished: function() {
    return this.get('opentokSession') && this.get('isSessionConnected') && this.get('isConnectionCreated') && !this.get('publisher');
  }.property('isConnectionCreated', 'isSessionConnected', 'opentokSession', 'publisher'),

  initOpentokConsultations: function() {
    let opentokConsultations = new OpentokConsultations(config.openTok, this.configs);

    this.set('opentokConsultations', opentokConsultations);

    opentokConsultations.on('emit', this.emitCallback.bind(this));
  }.on('init'),

  emitCallback: function(key, value) {
    this.set(key, value);
  },

  connect: function(sessionId, token) {
    this.get('opentokConsultations').connect(sessionId, token);
  },

  disconnect: function () {
    this.get('opentokConsultations').disconnect();
  },

  publish: function() {
    this.get('opentokConsultations.publisher').publish();
  },

  unpublish: function() {
    this.get('opentokConsultations.publisher').unpublish();
  },

  configs: {
    localVideoElement: 'local-video',
    localVideoOptions: {
      insertMode: "append",
      width: 1,
      height: 1,
      publishAudio: true,
      publishVideo: true
    },

    remoteVideoElement: 'remote-video',
    remoteVideoOptions: {
      insertMode: "append",
      width: 320,
      height: 439,
      publishAudio: true,
      publishVideo: true
    }
  }
});
