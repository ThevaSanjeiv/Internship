def is_balanced(s):
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}

    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in ")]}":
            if not stack or stack[-1] != mapping[ch]:
                return False
            stack.pop()

    return len(stack) == 0

print(is_balanced("()"))        # True
print(is_balanced("([{}])"))    # True
print(is_balanced("(]"))        # False
print(is_balanced("([)]"))      # False
print(is_balanced("("))         # False
