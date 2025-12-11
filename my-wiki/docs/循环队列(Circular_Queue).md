# 循环队列(Circular_Queue)

**环形队列（Circular Queue）** 是一种特殊的队列数据结构，它将队列的首尾相连形成一个环形缓冲区。这种结构可以更有效地利用内存空间，避免普通队列在出队操作后出现的"假溢出"问题。

## 环形队列的核心概念

1. 基本结构：
    - 使用数组作为底层存储
    - 通过两个指针（front和rear）管理队列的头部和尾部
    - 首尾相连形成环形结构
2. 关键特性：
    - 入队（Enqueue）和出队（Dequeue）操作的时间复杂度均为$O(1)$
    - 空间利用率高，避免了普通队列的"假溢出"问题
    - 需要区分队列空和队列满的状态
3. 空满状态判断：
    - 方法1：浪费一个存储位置，使队列满时仍有一个空位
    - 方法2：使用额外的计数器记录元素数量
    - 方法3：使用标志位标记队列状态
  
## C++实现环形队列
    
下面是一个使用C++实现的环形队列，采用浪费一个位置的方式区分空满状态：

<details>
    <summary>代码实现</summary> 

```cpp
#include <iostream>
#include <stdexcept>

template<typename T>
class CircularQueue {
private:
    T* data;           // 存储队列元素的数组
    int capacity;      // 队列的总容量（包含一个浪费的位置）
    int front;         // 队头指针，指向队列第一个元素
    int rear;          // 队尾指针，指向队列最后一个元素的下一个位置

public:
    // 构造函数，初始化队列
    explicit CircularQueue(int size) : capacity(size + 1), front(0), rear(0) {
        data = new T[capacity];
    }

    // 析构函数，释放内存
    ~CircularQueue() {
        delete[] data;
    }

    // 判断队列是否为空
    bool isEmpty() const {
        return front == rear;
    }

    // 判断队列是否已满
    bool isFull() const {
        return (rear + 1) % capacity == front;
    }

    // 获取队列中的元素数量
    int size() const {
        return (rear - front + capacity) % capacity;
    }

    // 入队操作
    void enqueue(const T& value) {
        if (isFull()) {
            throw std::overflow_error("Queue is full");
        }
        data[rear] = value;
        rear = (rear + 1) % capacity;
    }

    // 出队操作
    void dequeue() {
        if (isEmpty()) {
            throw std::underflow_error("Queue is empty");
        }
        front = (front + 1) % capacity;
    }

    // 获取队头元素
    T frontValue() const {
        if (isEmpty()) {
            throw std::underflow_error("Queue is empty");
        }
        return data[front];
    }

    // 获取队尾元素
    T rearValue() const {
        if (isEmpty()) {
            throw std::underflow_error("Queue is empty");
        }
        // 计算实际队尾位置
        int tailIndex = (rear - 1 + capacity) % capacity;
        return data[tailIndex];
    }

    // 打印队列中的所有元素
    void print() const {
        if (isEmpty()) {
            std::cout << "Queue is empty" << std::endl;
            return;
        }

        std::cout << "Queue elements: ";
        int count = size();
        for (int i = 0; i < count; ++i) {
            int index = (front + i) % capacity;
            std::cout << data[index] << " ";
        }
        std::cout << std::endl;
    }
};
```

</details>


### 实现说明
1. 模板类设计：
    - 使用模板<typename T>支持任意数据类型
    - 构造函数接受一个整数参数，实际容量为参数值加1
2. 指针管理：
    - `front`：指向队列的第一个有效元素
    - `rear`：指向队列最后一个元素的下一个位置
3. 关键操作：
    - 入队：在`rear`位置存储元素，然后`rear`指针后移
    - 出队：直接将`front`指针后移，无需实际删除元素
    - 队尾元素计算：使用`(rear - 1 + capacity) % capacity`确保正确获取队尾位置
4. 边界条件处理：
    - 通过`(index + 1) % capacity`实现指针循环
    - 空队列：`front == rear`
    - 满队列：`(rear + 1) % capacity == front`

###  使用示例
    
下面是一个简单的测试程序，演示如何使用上述环形队列：

<details>
    <summary>代码实现</summary> 

```cpp
#include <iostream>

int main() {
    // 创建一个容量为3的环形队列
    CircularQueue<int> queue(3);

    try {
        // 测试空队列状态
        std::cout << "Is empty: " << (queue.isEmpty() ? "Yes" : "No") << std::endl;
        std::cout << "Is full: " << (queue.isFull() ? "Yes" : "No") << std::endl;

        // 入队操作
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        queue.print();  // 输出: Queue elements: 10 20 30

        // 测试满队列状态
        std::cout << "Is full: " << (queue.isFull() ? "Yes" : "No") << std::endl;

        // 获取队头和队尾元素
        std::cout << "Front: " << queue.frontValue() << std::endl;  // 输出: 10
        std::cout << "Rear: " << queue.rearValue() << std::endl;    // 输出: 30

        // 出队操作
        queue.dequeue();
        std::cout << "After dequeue, Front: " << queue.frontValue() << std::endl;  // 输出: 20

        // 再次入队
        queue.enqueue(40);
        queue.print();  // 输出: Queue elements: 20 30 40

    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }

    return 0;
}
```

</details>
    
## 环形队列的优缺点
    
优点：
1. 空间利用率高，避免了普通队列的"假溢出"问题
2. 入队和出队操作的时间复杂度均为 $O(1)$

缺点：
1. 需要额外的逻辑来区分队列空和满的状态
2. 固定容量，需要预先分配内存
3. 实现比普通队列复杂，需要处理指针循环问题

环形队列是一种非常实用的数据结构，特别适合需要高效处理循环缓冲区的场景。