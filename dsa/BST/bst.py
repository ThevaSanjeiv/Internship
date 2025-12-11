# draw_bst.py
from collections import deque
import matplotlib.pyplot as plt

class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

def insert(root, data):
    if root is None:
        return Node(data)
    if data <= root.data:
        root.left = insert(root.left, data)
    else:
        root.right = insert(root.right, data)
    return root

def build_bst(values):
    root = None
    for v in values:
        root = insert(root, v)
    return root

def assign_positions(node, depth=0, x_counter=[0], positions=None):
    """
    Inorder traversal assigns increasing x positions so the
    visual left-to-right order matches BST order.
    x_counter is a one-element list to act as a mutable integer.
    """
    if positions is None:
        positions = {}
    if node is None:
        return positions
    assign_positions(node.left, depth+1, x_counter, positions)
    x = x_counter[0]
    y = -depth  # root at y=0, children below
    positions[node] = (x, y)
    x_counter[0] += 1
    assign_positions(node.right, depth+1, x_counter, positions)
    return positions

def draw_bst(root, output_path="tree_visual.png",
             node_radius=0.35, node_facecolor="#d9f2d9",
             node_edgecolor="#2b8f2b", edge_color="#9bdc9b",
             text_color="#0b3d0b", figsize=(10,6), dpi=150):
    # Compute positions
    positions = assign_positions(root)

    # Setup plot
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_axis_off()

    # Draw edges (lines) first so nodes are on top
    for node, (x, y) in positions.items():
        if node.left:
            lx, ly = positions[node.left]
            ax.plot([x, lx], [y, ly], linewidth=2, color=edge_color, zorder=1)
        if node.right:
            rx, ry = positions[node.right]
            ax.plot([x, rx], [y, ry], linewidth=2, color=edge_color, zorder=1)

    # Draw nodes (circles) and labels
    for node, (x, y) in positions.items():
        circ = plt.Circle((x, y), node_radius, facecolor=node_facecolor,
                          edgecolor=node_edgecolor, linewidth=2, zorder=2)
        ax.add_patch(circ)
        ax.text(x, y, str(node.data), fontsize=12, ha='center', va='center',
                color=text_color, zorder=3, weight='bold')

    # Tweak limits & aspect
    xs = [p[0] for p in positions.values()]
    ys = [p[1] for p in positions.values()]
    if xs and ys:
        ax.set_xlim(min(xs) - 1, max(xs) + 1)
        ax.set_ylim(min(ys) - 1, max(ys) + 1)
    ax.set_aspect('equal')

    plt.tight_layout()
    plt.savefig(output_path, dpi=dpi, bbox_inches='tight')
    plt.show()
    print(f"Saved tree image to: {output_path}")
def searchBST(root, val):
    while root is not None and root.data != val:
        root = root.left if val < root.data else root.right
    return root



if __name__ == "__main__":
    values = [35,50,20,30,80,15]
    root = build_bst(values)
    # res=searchBST(root,80)
    result = searchBST(root, 80)

    if result:
        print("Found:", result.data)
    else:
        print("Not found")

    draw_bst(root, output_path="tree_visual.png")
