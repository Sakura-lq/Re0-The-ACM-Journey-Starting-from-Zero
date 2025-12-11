# 双端队列(deque)

**双端队列（Double-ended Queue，`std::deque`）** 是一种动态数组结构，支持在队列 **两端高效插入和删除元素** 。与  `vector` 相比，其优势在于头部操作的时间复杂度为 $O(1)$ ，且扩容时 **无需整体复制** 元素。

## 核心操作函数
    
### 构造与初始化
    
```cpp
std::deque<int> d1;                // 空队列
std::deque<int> d2(5, 10);         // 初始化为5个10
std::deque<int> d3 = {1, 2, 3};    // 列表初始化
std::deque<int> d4(d3);            // 拷贝构造
```

- 默认构造

```cpp
std::deque<int> deq;  // 创建空双端队列
```

- 带初始大小构造

```cpp
std::deque<int> deq(5);  // 初始大小为5，元素默认初始化为0
```

- 带初始值构造

```cpp
std::deque<int> deq(3, 10);  // [10, 10, 10]
```

- 复制构造

```cpp
std::deque<int> deq2(deq1);  // 复制deq1的内容到deq2
```

- 范围构造

```cpp
std::vector<int> vec = {1, 2, 3};
std::deque<int> deq(vec.begin(), vec.end());  // [1, 2, 3]
```
        
### 元素访问
        
```cpp
d3[0] = 10;          // 随机访问（不检查越界）
d3.at(1) = 20;       // 随机访问（检查越界）
int front = d3.front();  // 队首元素
int back = d3.back();    // 队尾元素
```

- 随机访问

```cpp
deq[2];      // 不检查越界，直接访问第3个元素
deq.at(2);   // 检查越界，越界时抛出std::out_of_range异常
```

- 首尾元素

```cpp
deq.front();  // 返回头部元素引用
deq.back();   // 返回尾部元素引用
```
        
### 插入与删除
    
```cpp
d3.push_back(4);     // 尾部插入：O(1)
d3.push_front(0);    // 头部插入：O(1)
d3.insert(d3.begin()+2, 99);  // 中间插入：O(n)

d3.pop_back();       // 删除尾部：O(1)
d3.pop_front();      // 删除头部：O(1)
d3.erase(d3.begin()+1);  // 删除指定位置：O(n)
```

- 添加元素

```cpp
deq.push_back(10);    // 尾部插入：O(1)
deq.push_front(5);    // 头部插入：O(1)
deq.insert(deq.begin()+2, 7);  // 中间插入：O(n)
```

- 删除元素

```cpp
deq.pop_back();     // 删除尾部元素：O(1)
deq.pop_front();    // 删除头部元素：O(1)
deq.erase(deq.begin()+1);  // 删除指定位置：O(n)
```

- 调整大小

```cpp
deq.resize(10);     // 扩展到10个元素，新元素默认初始化为0
deq.resize(5);      // 截断为5个元素
```

- 清空队列

```cpp
deq.clear();        // 清空所有元素，size变为0
```

### 容量与大小
    
```cpp
bool empty = d3.empty();    // 判断是否为空
size_t size = d3.size();    // 当前元素数量
d3.resize(10);              // 调整大小（新元素默认初始化）
d3.shrink_to_fit();         // 释放未使用内存（C++11+）
```

- 大小与空判断

```cpp
deq.size();     // 返回当前元素数量
deq.empty();    // 判断是否为空
```

- 最大容量

```cpp
deq.max_size();  // 返回理论最大容量（受系统限制）
```

- 内存优化

```cpp
deq.shrink_to_fit();  // 释放未使用的内存（C++11+）
```
    
### 迭代器

```cpp
// 正向遍历
for (auto it = d3.begin(); it != d3.end(); ++it) {
    std::cout << *it << " ";
}

// 反向遍历
for (auto rit = d3.rbegin(); rit != d3.rend(); ++rit) {
    std::cout << *rit << " ";
}
```

- 正向迭代器

```cpp
for (auto it = deq.begin(); it != deq.end(); ++it) {
    std::cout << *it << " ";  // 顺序遍历
}
```

- 反向迭代器

```cpp
for (auto rit = deq.rbegin(); rit != deq.rend(); ++rit) {
    std::cout << *rit << " ";  // 逆序遍历
}
```

- 常量迭代器

```cpp
for (auto cit = deq.cbegin(); cit != deq.cend(); ++cit) {
    // 只读访问，无法修改元素
}
```

### 其他操作

- 交换内容

```cpp
deq1.swap(deq2);  // 交换deq1和deq2的内容
```

- 赋值操作

```cpp
deq = {1, 2, 3};  // 使用初始化列表赋值
```

- 比较操作

```cpp
deq1 == deq2;  // 比较内容是否相等
deq1 < deq2;   // 字典序比较
```
        
## 底层原理

- 内存布局：`deque` 由多个固定大小的连续存储块组成，通过中控器管理这些块的地址。
- 扩容机制：扩容时仅需分配新块，无需复制原有元素，效 率高于   `vector` 。

## 时间复杂度
        
| 操作 | 时间复杂度 |
| --- | --- |
| 随机访问 | $O(1)$ |
| 头部插入/删除 | $O(1)$ |
| 尾部插入/删除 | $O(1)$ |
| 中间插入/删除 | $O(n)$ |
| 迭代器递增/递减 | $O(1)$ |

## 应用场景

- 双向队列：实现栈或队列的底层结构。
- 滑动窗口算法：维护窗口内元素的高效进出。
- 任务调度：支持从队首和队尾同时处理任务。

## 与其他容器的对比
    
| 容器 | 随机访问 | 头部插入 | 尾部插入 | 中间插入 |
| --- | --- | --- | --- | --- |
| `vector` | $O(1)$ | $O(n)$ | $O(1)$ | $O(n)$ |
| `deque` | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ |
| `list` | $O(n)$ | $O(1)$ | $O(1)$ | $O(1)$ |

## 注意事项

- 迭代器失效：插入或删除元素可能导致迭代器失效。
- 内存开销：中控器和多个存储块可能带来额外内存开销。
- 异常安全：`push_back/push_front` 在内存分配失败时抛出`std::bad_alloc` 。

## 示例代码

<details>
    <summary>代码实现</summary> 
    
```cpp
#include <deque>
#include <iostream>

int main() {
    // 创建双端队列
    std::deque<int> d = {1, 2, 3};

    // 首尾操作
    d.push_front(0);    // [0, 1, 2, 3]
    d.push_back(4);     // [0, 1, 2, 3, 4]

    // 随机访问
    std::cout << "Element at index 2: " << d[2] << std::endl;  // 输出: 2

    // 遍历
    std::cout << "Elements: ";
    for (int num : d) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    // 删除操作
    d.pop_front();      // [1, 2, 3, 4]
    d.erase(d.begin()+1);  // [1, 3, 4]

    return 0;
}
```

- 输出结果

```
Element at index 2: 2
Elements: 0 1 2 3 4
```

</details>

    
##  总结
- 优势：支持高效的首尾操作和随机访问。
- 劣势：内存布局复杂，中间插入效率低。
- 适用场景：需要频繁在首尾插入/删除元素，同时保留随机访问能力的场景。