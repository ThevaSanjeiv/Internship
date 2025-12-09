class MinStack:

    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack:
            self.min_stack.append(val)
        else:
            self.min_stack.append(min(val, self.min_stack[-1]))

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]


# ✅ main code must come AFTER class definition
if __name__ == "__main__":
    obj = MinStack()

    obj.push(5)
    obj.push(3)
    obj.push(7)

    print("Top:", obj.top())        # 7
    print("Min:", obj.getMin())     # 3

    obj.pop()

    print("Top after pop:", obj.top())    # 3
    print("Min after pop:", obj.getMin()) # 3

    obj.pop()

    print("Top after pop:", obj.top())    # 5
    print("Min after pop:", obj.getMin()) # 5
