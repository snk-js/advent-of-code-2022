import { countPoints, countPointsSecondStrategy } from './day-2/index'
import { getElfCarryingMostCalories, getTopThreeElfCarryingMostCalories } from './day-1/index'


describe('test all solution', () => {
    it('should test day 1 solutions', () => {
        expect(getElfCarryingMostCalories()).toBeGreaterThan(60001)
        expect(getTopThreeElfCarryingMostCalories()).toBeGreaterThan(200000)
    })
    it('should test day 2 solutions', () => {
        expect(countPoints()).toBeGreaterThan(13000)
        expect(countPointsSecondStrategy()).toBeGreaterThan(13600)
    })

})