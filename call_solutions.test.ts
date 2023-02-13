import { getPrioritySumOfAllFailedRucksackItem, getPrioritySumOfAllGroupsBadges } from './day-3/index'
import { countPoints, countPointsSecondStrategy } from './day-2/index'
import { getElfCarryingMostCalories, getTopThreeElfCarryingMostCalories } from './day-1/index'


describe('test all solution', () => {
    it('should test day 1 solutions', () => {
        expect(getElfCarryingMostCalories()).toBe(69912)
        expect(getTopThreeElfCarryingMostCalories()).toBe(208180)
    })
    it('should test day 2 solutions', () => {
        expect(countPoints()).toBe(13052)
        expect(countPointsSecondStrategy()).toBe(13693)
    })

    it('should test day 3 solutions', () => {
        expect(getPrioritySumOfAllFailedRucksackItem()).toBe(7821)
        expect(getPrioritySumOfAllGroupsBadges()).toBe(2752)
    })

})