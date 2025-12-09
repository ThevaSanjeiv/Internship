s = "({[]})"   # input string

stack = []

for c in s:
    if c == '(':
        stack.append(')')
    elif c == '{':
        stack.append('}')
    elif c == '[':
        stack.append(']')
    else:
        if not stack or stack.pop() != c:
            print(False)
            break
else:
    print(len(stack) == 0)
