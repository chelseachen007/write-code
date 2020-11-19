var fourSum = function (nums, target) {
    nums.sort((a, b) => a - b)
    return nSum(nums, target, 0, 4)
};
var nSum = function (nums, target, start, n) {
    if (n < 2 || nums.length < n) return []
    let res = []
    if (n == 2) {
        let left = start
        let right = nums.length - 1
        while (left < right) {
            const leftCarry = nums[left]
            const rightCarry = nums[right]
            const sum = leftCarry + rightCarry
            if (sum === target) res.push([leftCarry, rightCarry])
            if (sum <= target) while (left < right && nums[left] == leftCarry) left++
            if (sum >= target) while (left < right && nums[right] == rightCarry) right--
        }
    } else {
        for (let i = start; i < nums.length; i++) {
            let data = nSum(nums, target - nums[i], i + 1, n - 1)
            data.forEach(v => res.push([nums[i], ...v]))
            while (i < nums.length - 1 && nums[i] == nums[i + 1]) i++
        }
    }
    return res
}