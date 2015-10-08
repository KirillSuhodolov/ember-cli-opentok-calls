import Ember from 'ember';

export default Ember.Component.extend({
  isCalling: Ember.computed.empty('opentok.isCalling'),
  consultationTimeUpdate: 'consultationTimeUpdate',

  publishObserver: function() {
    if (this.get('opentok.canBePublished')) {
      this.get('opentok').publish();
    }
  }.observes('opentok.canBePublished').on('didInsertElement'),

  resetCounterObserver: function() {
    this.get('clock').reset();
  }.on('didInsertElement'),

  unpublishObserver: function() {
    this.get('opentok').unpublish();
  }.on('willDestroyElement'),

  duration: function() {
    if (this.get('opentok.isCallGoes')) {
      var clock = this.get('clock'),
        minutes = clock.get('minute'),
        seconds = clock.get('second'),
        formattedSeconds = String((seconds - minutes * 60));

      if (minutes.length === 1) { minutes = '0' + minutes }
      if (formattedSeconds.length === 1) { formattedSeconds = '0' + formattedSeconds }

      this.sendAction('consultationTimeUpdate', minutes + ':' + formattedSeconds);
    }
  }.observes('opentok.isCallGoes', 'clock.second')
});
