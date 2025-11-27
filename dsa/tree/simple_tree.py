import platform
class Node:
    def __init__(self, data):
        self.data = data
        self.children = []

def insert_child(parent,child):
    parent.children.append(child)
def delete_child(parent,child):
    parent.children.remove(child)

root = Node(5)
n2 = Node(2)
n3 = Node(3)
n4 = Node(4)
n5 = Node(8)

insert_child(root, n2)
insert_child(root, n3)

insert_child(root, n4)
insert_child(n4, n5)

print(root.children[0].data)
print(root.children[1].data)
print(root.children[2].data)
print(root.children[2].children[0].data)

delete_child(root,n2)
print(root.children[0].data)
  
def sum_nodes(root):
    total = root.data
    for i in root.children:
        total += sum_nodes(i)
    return total

print(sum_nodes(root))