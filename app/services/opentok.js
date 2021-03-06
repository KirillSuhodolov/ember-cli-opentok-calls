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

  initOpentokConsultations: function(videoSettings) {
    videoSettings = videoSettings || this.get('videoSettings');

    videoSettings.key = config.openTok.key;

    videoSettings.remoteVideoOptions.width = $(document).width();
    videoSettings.remoteVideoOptions.height = $(document).height() - 130;

    let opentokCalls = new OpentokCalls(videoSettings);

    this.set('opentokCalls', opentokCalls);

    opentokCalls.on('hash-changed', this._emitCallback.bind(this));
  },

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
  },

  videoSettings: {
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
