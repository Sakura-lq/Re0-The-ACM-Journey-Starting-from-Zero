# 优先队列(堆heap)

**优先队列（Priority Queue）** 是一种特殊的队列，其元素按优先级排序，而非FIFO（先进先出）。每次从队列中取出的元素都是优先级最高的元素。C++标准库通过 `std::priority_queue` 提供了这一数据结构，它基于堆（Heap）实现，默认是**最大堆**。

## 优先队列的核心特性
- 基于堆结构：内部使用堆（完全二叉树）维护元素优先级。
- 动态调整：插入和删除操作的时间复杂度为 $O(log n)$。
- 固定访问点：只能访问队首元素（优先级最高的元素）。

## 优先队列的定义与模板参数

<details>
    <summary>代码实现</summary> 

```cpp
#include <queue>

template<
    class T,
    class Container = std::vector<T>,
    class Compare = std::less<typename Container::value_type>
> class priority_queue;
```

</details>
    
- T：元素类型。
- Container：底层容器，默认是 `vector` ，需支持 `front()` 、 `push_back()` 、 `pop_back()` 。
- Compare：比较函数，默认 `std::less`（最大堆），使用 `std::greater` 可改为最小堆。


## 常用操作
        
| **操作** | **函数** | **时间复杂度** | **说明** |
| --- | --- | --- | --- |
| **插入元素** | `push(value)` | $O(log n)$ | 将元素插入队列，并调整堆结构。 |
| **删除队首元素** | `pop()` | $O(log n)$ | 删除优先级最高的元素（堆顶）。 |
| **获取队首元素** | `top()` | $O(1)$ | 返回优先级最高的元素，但不删除。 |
| **判断队列是否为空** | `empty()` | $O(1)$ | 若队列为空，返回`true`。 |
| **获取队列大小** | `size()` | $O(1)$ | 返回队列中元素的数量。 |

## 最大堆与最小堆

### 最大堆（默认）
<details>
    <summary>代码实现</summary>  

```cpp
#include <iostream>
#include <queue>

int main() {
    std::priority_queue<int> maxHeap;  // 默认最大堆
    maxHeap.push(3);
    maxHeap.push(1);
    maxHeap.push(2);
    std::cout << "最大堆顶元素：" << maxHeap.top() << std::endl;  // 输出：3
    return 0;
}
```

</details>

### 最小堆
    
<details>
    <summary>代码实现</summary> 

```cpp
#include <iostream>
#include <queue>

int main() {
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    minHeap.push(3);
    minHeap.push(1);
    minHeap.push(2);
    std::cout << "最小堆顶元素：" << minHeap.top() << std::endl;  // 输出：1
    return 0;
}
```

</details>
    
## 自定义类型的优先队列

### 重载 `<` 运算符
    
<details>
    <summary>代码实现</summary> 

```cpp
struct Person {
    std::string name;
    int age;
    // 年龄大的优先级高（最大堆）
    bool operator<(const Person& other) const {
        return age < other.age;
    }
};

std::priority_queue<Person> pq;
pq.push({"Alice", 25});
pq.push({"Bob", 30});
std::cout << "优先级最高的人：" << pq.top().name << std::endl;  // 输出：Bob
```
    
</details>

### 使用Lambda或函数对象
    
<details>
    <summary>代码实现</summary> 

```cpp
struct Task {
    int id;
    int priority;
};

// 自定义比较函数（优先级高的任务先执行）
auto cmp = [](const Task& a, const Task& b) {
    return a.priority < b.priority;
};

std::priority_queue<Task, std::vector<Task>, decltype(cmp)> taskQueue(cmp);
taskQueue.push({1, 3});  // 优先级3的任务
taskQueue.push({2, 1});  // 优先级1的
```

</details>

## 高级操作与技巧

### 批量初始化
    
<details>
    <summary>代码实现</summary> 

```cpp
std::vector<int> nums = {3, 1, 4, 1, 5};
// 方法1：逐个插入（O(n log n)）
std::priority_queue<int> pq1;
for (int num : nums) pq1.push(num);

// 方法2：构造函数（O(n)）
std::priority_queue<int> pq2(nums.begin(), nums.end());
```

</details>

### 修改队首元素
   
<details>
    <summary>代码实现</summary> 
```cpp
    if (!pq.empty()) {
        int top = pq.top();
        pq.pop();
        pq.push(top + 5);  // 修改后重新插入
    }
```

</details>

### 清空队列

<details>
    <summary>代码实现</summary> 

```cpp
// 方法1：逐个弹出
while (!pq.empty()) pq.pop();

// 方法2：交换空队列（效率更高）
std::priority_queue<int> empty;
pq.swap(empty);
```

</details>

    
## 常见应用场景


### Top-K问题
    
<details>
    <summary>代码实现</summary> 

```cpp
// 获取数组中最小的K个数
std::vector<int> getSmallestK(const std::vector<int>& arr, int k) {
    std::priority_queue<int> maxHeap;  // 最大堆
    for (int num : arr) {
        maxHeap.push(num);
        if (maxHeap.size() > k) {
            maxHeap.pop();  // 弹出最大值
        }
    }
    // 堆中剩下的是最小的K个数
}
```

</details>

### Dijkstra最短路径算法

<details>
    <summary>代码实现</summary> 

```cpp
using PII = std::pair<int, int>;  // {距离, 节点编号}
std::priority_queue<PII, std::vector<PII>, std::greater<PII>> pq;
pq.push({0, start});  // 从起点开始，距离为0

while (!pq.empty()) {
    auto [dist, u] = pq.top();
    pq.pop();
    // 处理节点u
}
```

</details>
    

### 合并K个有序链表

<details>
    <summary>代码实现</summary> 

```cpp   
struct ListNode {
    int val;
    ListNode* next;
};

ListNode* mergeKLists(std::vector<ListNode*>& lists) {
    auto cmp = [](const ListNode* a, const ListNode* b) {
        return a->val > b->val;  // 最小堆
    };
    std::priority_queue<ListNode*, std::vector<ListNode*>, decltype(cmp)> pq(cmp);

    for (ListNode* node : lists) {
        if (node) pq.push(node);
    }

    // 合并逻辑...
}
```

</details>

## 注意事项

1. 空队列检查：调用 `top()` 或 `pop()` 前必须确保队列非空。
2.  比较函数严格弱序：避免 `operator<` 或自定义比较函数导致的重复元素判断错误。
3.  性能优化：批量插入时使用构造函数 $O(n)$ 而非逐个插入 $O(n log n)$.

## 总结

C++优先队列通过灵活的比较函数支持最大堆和最小堆，适用于动态维护优先级的场景。其核心操作的时间复杂度为 $O(log n)$ ，结合自定义类型和 $Lambda$ 表达式，能高效解决任务调度、图算法、数据筛选等问题。