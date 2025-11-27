class Node:
    def __init__(self,data):
        self.data=data
        self.left=None
        self.right=None
# manually
# node1=Node(2)
# node2=Node(5)
# node3=Node(8)


# node1.left=node2
# node1.right=node3

# print(node1.data)
# print(node1.left.data)
# print(node1.right.data)



# bst 
# def insert(root,data):
#     if root is None:
#         return Node(data)
#     if data < root.data:
#         root.left=insert(root.left,data)
#     else:
#         root.right=insert(root.right,data)
#     return root
root=None
a=[40,50,20,30,80,15]
for i in a:
    root=insert(root,i)
print(root.data)
print(root.left.data)
print(root.right.data)

def tree_sum(root):
    if root is None:
        return 0
    return root.data +tree_sum(root.left)+tree_sum(root.right)
print(tree_sum(root))