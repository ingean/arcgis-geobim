define([], function() {

  const config = {
    stages: {
      1: {volume: 0},
      2: {slide: 9, volume: 4},
      3: {slide: 9, volume: 5},
      4: {slide: 10, volume: 6},
      5: {slide: 10, volume: 9},
      6: {slide: 10, volume: 10},
      7: {slide: 11, volume: 11},
      count: 7
    },
    segments: {
      1: {name: 'Åsbygda'},
      3: {slide: 2, name: 'Kleggerud', volume: true, BIM: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z2VvdGVrXzIwMjEvZiVFMiU4MCU5MGJydV9LMDMtS2xlZ2dlcnVkLW92ZXJnYW5nc2JydS5ydnQ'},
      5: {slide: 3, name: 'Moselva', volume: true, BIM: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z2VvdGVrXzIwMjEvZi1icnVfSzA1LU1vc2VsdmEtYnJ1MDEucnZ0'},
      7: {slide: 4, name: 'Svenådalen', volume: true,},
      9: {slide: 5, name: 'Søtbakkdalen', volume: true, BIM: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z2VvdGVrXzIwMjEvZi1icnVfSzA5LVMlQzMlQjh0YmFra2RhbGVuLW92ZXJnYW5nc2JydS5ydnQ'},
      10: {slide: 6, volume: true, BIM: 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z2VvdGVrXzIwMjEvZi1icnVfSzEwLUJla2tlc3R1YS1icnUucnZ0'},
      21: {name: 'Olum'},
      count: 21
    }
  }
  return {
    settings: () => {
      return config;
    }
  }
})