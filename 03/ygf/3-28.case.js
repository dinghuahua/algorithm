var findMaxForm = function (strs, m, n) {
  const l = strs.length;
  const counts = strs.map((item) => {
    let v0 = 0;
    let v1 = 0;
    for (const n of item) {
      if (n === "0") {
        v0++;
      } else {
        v1++;
      }
    }
    return [v0, v1];
  });
  // dp[i][j] // i个0 1个1的时候，子集的最大个数
  // j个0 k个1时 对应的最大的子集数量
  const dp = new Array(m + 1).fill("").map(() => new Array(n + 1).fill(0));
  for (let i = 0; i < l; i++) {
    const [v0, v1] = counts[i];
    for (let j = v0; j <= m; j++) {
      for (let k = v1; k <= n; k++) {
        dp[j][k] = Math.max(dp[j][k], dp[j - v0][k - v1] + 1);
      }
    }
  }
  return dp[m][n];
};
function knapSack(weightLimit, weightArray, valueArray, account) {
  //ks是保存数据的二维数组，可以看做是矩阵
  //初始化一个长度为account+1的二维空数组，每一个子数组都可以看成是选用多少个物品时的情况。
  let ks = [];
  for (let i = 0; i <= account; i++) {
    ks.push([]);
  }

  //对应的，每一列都是对应重量限制时的物品组合
  //即，i行w列的值，对应的是选了前i个物品时，重量限制为w时的最优解
  for (let i = 0; i <= account; i++) {
    for (let w = 0; w <= weightLimit; w++) {
      //重量限制为0，或者选用0个物品组合，结果都为0
      if (i === 0 || w === 0) {
        ks[i][w] = 0;

        //如果加入组合的物品的重量没有超过单轮循环的重量限制，那么加入组合
        //加入组合，就是这个物品的值，加上剩余重量（重量限制-该物品重量）的最优解，和就是当前组合的最优解
        //然后与上一行同列的最优解比较，取较大值，作为当前组合的实际的最优解
        //矩阵可以理解成缓存。缓存了之前每种组合的结果
        //为什么是第i行的值，取weightArray[i-1],valueArray[i-1]，是因为数组的下标从0开始
      } else if (weightArray[i - 1] <= w) {
        let a = valueArray[i - 1] + ks[i - 1][w - weightArray[i - 1]];
        ks[i][w] = Math.max(a, ks[i - 1][w]);

        //如果加入组合的物品的重量超过单轮循环的重量限制，那么这个物品不加入组合
        //即这种情况下取上一行同列的值
      } else {
        ks[i][w] = ks[i - 1][w];
      }
    }
  }
  //最终我们需要的结果就是第i行第w列的值。
  return ks[account][weightLimit];
}
