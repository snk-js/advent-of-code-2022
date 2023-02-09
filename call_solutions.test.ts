import { getElfCarryingMostCalories, getTopThreeElfCarryingMostCalories } from './day-1/index'


describe('test all solution', () => {

    it('should test day 1 solutions', () => {
        expect(getElfCarryingMostCalories()).toBeGreaterThan(60001)
        expect(getTopThreeElfCarryingMostCalories()).toBeGreaterThan(200000)
    })

})