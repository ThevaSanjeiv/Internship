class Node:
    def __init__(self,data):
        self.data=data
        self.left=None
        self.right=None
def insert(root, data):
    if root is None:
        return Node(data)
    if data <= root.data:
        root.left = insert(root.left, data)
    else:
        root.right = insert(root.right, data)
    return root
def ceil(root, key):
    ans = -1
    while root:
        if root.data == key:
            return root.data
        
        if key < root.data:
            ans = root.data
            root = root.left
        else:
            root = root.right

    return ans

values = [35, 50, 20, 30, 80, 15]
root = None
for i in values:
    root = insert(root, i)
res = ceil(root, 29)
print(res)
