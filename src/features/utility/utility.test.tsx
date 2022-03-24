import {randomLoadGen, youTubeRegex} from './utility';

describe('RandomLoadGen tests', () => {
    test('Returns a string', () => {
        expect(randomLoadGen()).toMatch(/([a-zA-Z])\w+/);
    })

})

describe('youtubeRegex Tests', () => {
    test('it accepts a normal youtube link', () => {
      expect(youTubeRegex("https://www.youtube.com/watch?v=Q4pFJPUPrkI")).toEqual("Q4pFJPUPrkI")
    })
    test('it accepts a youtu.be link', () => {
      expect(youTubeRegex("https://youtu.be/Q5taPwu2UMQ")).toEqual("Q5taPwu2UMQ")
    })
  })