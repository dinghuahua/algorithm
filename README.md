# algorithm

> 递归的 时候 考虑入参和出参 问问到底是要什么东西 返回什么
> 前一轮和 后一轮 数据关联(要么参数或者闭包外面) / 逻辑处理完全单独
> 根节点 普通节点 叶子节点 空节点

TODO:
盛水递归
周赛 43 题
面积最大的岛屿
二叉树四种遍历 迭代+递归
层级迭代去掉 level
员工重要性 去掉 sum

为什么？？
种花问题
为什么栈里面第一个元素是左边界
最后一个是右边界，为什么不可以是中间的
左/右边界 是针对原数组来说的？？

//左右边界 只需要考虑一端的相邻问题
const init = ~~(left / 2) + ~~(len / 2)

20 开始+竞赛 + 链表

问的算法，是写个函数，new 的时候传入数组，用数组构造二叉搜索树，并实现增加，删除，查找节点的操作

上一层需要的数据 return
下一层需要的数据 入参

while 里面不要在写 if
回文 相交
环形链表
二进制链表转整数
双周/单周竞赛第一题的优化

TODO：
快慢指针
链表成环

TODO：0326
剑指 Offer 18. 删除链表的节点 如何考虑边界情况 62. 不同路径
标准
状态 压缩 高维 压缩为低维
滚动数组
滚轮：一行的数据轮子向下一行递推到最后一行滚动停止
排列组合公式

0327
https://www.zhihu.com/question/23995189?utm_source=wechat_session&utm_medium=social&s_r=0
当前状态只和上一个有关，与上一个的上一个无关，与历史无关

反转错误

0328
叶子节点让和普通节点保持相通的处理，空节点处理好
由后面的状态来推初始化的值，可以少很多初始化的赋值
环形链表
竞赛
动态规划？？1025. 除数博弈

TODO：0329 303. 区域和检索 不能有=

问了 http2 和 http3
然后 xss 的防御性我没记起来，反射型和存储型说出来了
cdn 服务器的架构设计
tcp 和 udp 的区别

tcp是点到点，是面向连接的，它侧重连接的安全性和可靠性，所以在正式收发报文之前，会先确认两端的发送和接受能力，并保证传输的完整
udp是面向报文的，服务器可以同时向多个客户端发送数据，并且不需要建立连接，也不验证传输的完整性，所以它不安全，但是传输速度快 ，只受网络带宽，速率等影响

TODO：0330
背包问题
207 题
优化博客里写的 0/1 背包
首先考虑题目问什么，就把什么定义成状态
「无后效性」的设计思想：让不确定的因素确定下来，以保证求解的过程形成一个逻辑上的有向无环图。这题不确定的因素是某个元素是否被选中，而我们设计状态的时候，让 nums[i] 必需被选中，这一点是「让不确定的因素确定下来」，也是我们这样设计状态的原因

TODO0331
两个字符串的最长公共子序列
就是要分析出两个状态之间的练习
最直接的方式就是，对于某一个点的状态和相邻的点的状态
你可以写一下，怎么从一个状态推出另一个状态

0402
路径总数一系列

0407
第一个问题，就是项目实践的一些心得
webpack 的优化措施，loader 和 plugin
如果做一个类似百度搜索的输入框，有哪些技术问题需要考虑
vue2 和 vue3 的变更
如果两个请求 a，b 先后发送，响应的顺序不能保证和发送顺序一样，怎么保证前端展示顺序一样
搜索结果很多，如何优化
项目的优化，不止 webpack 的
自己在项目中的一些好的实践，哪些做的比较好
数组去重 纯 es5 实现 o(n)复杂度

0409
上周的周赛还木有优化
骨架屏

0412
馄饨馄炖
粗旷
粗犷