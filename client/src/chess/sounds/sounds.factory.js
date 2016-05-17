module.exports = SoundsFactory;

SoundsFactory.$inject = ['$q'];
function SoundsFactory($q) {
  var canPlay = false;
  var soundType;
  var types = {
    mp3: 'audio/mpeg', 
    ogg: 'audio/ogg; codecs="vorbis"'
  };
  var sounds = {};
  var soundsURLs = {
    incomingInv: '/assets/sounds/incoming-inv',
    cancelRefuseInv: '/assets/sounds/cancel-refuse',
    startGame: '/assets/sounds/start-game',
    horseWhinnies: '/assets/sounds/horse-whinnies'
  };

  try {
    var testAudio = document.createElement('audio'); 
    if (testAudio.canPlayType) {
      Object.keys(types).some(function(type){
        if (!!testAudio.canPlayType && "" != testAudio.canPlayType(types[type])) {
          soundType = type;
          canPlay = true;
        }
      });
    }
  } catch(err){
    console.log(err);
  };

  function init(){
    if (!canPlay) {return};
    Object.keys(soundsURLs).forEach(function(name){
      var audio = document.createElement('audio');
      audio.src = soundsURLs[name] + '.' + soundType;
      sounds[name] = audio;
    });
  }
  init();

  var promise = $q.when(true);

  var getPromise = function(name) {
    var deferred = $q.defer();
    sounds[name].addEventListener('ended', deferred.resolve);
    sounds[name].play();
    deferred.promise.then(function () {
      sounds[name].removeEventListener('ended', deferred.resolve);
    });
    return deferred.promise;
  };

  function play(name){
    if (!canPlay) {return};
    console.log('play', name);
    promise = promise.then(function() {
      return getPromise(name);
    });
  };

  var factory = {
    play: play
  };
  return factory
};
