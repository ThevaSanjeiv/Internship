import heapq   

def dijkstra(V, adj, S):

    # Min-heap: (distance, node)
    min_times={}
    min_heap=[(0,S)]
    while min_heap:
        time,node=heapq.heappop(min_heap)
        if node in min_times:
            continue
        min_times[node]=time
        for neigh,neigh_time in adj[node]:
            if neigh not in min_times:
                heapq.heappush(min_heap,(neigh_time+time,neigh))

    return max(min_times.values())


# Graph:
# 0 -> (1,4), (2,7)
# 1 -> (2,1), (3,5)
# 2 -> (3,2)
# 3 -> []
V = 4
adj = [
    [[1, 4], [2, 7]],  # node 0
    [[2, 1], [3, 5]],  # node 1
    [[3, 2]],          # node 2
    []                 # node 3
]





print(dijkstra(V, adj, 0)) 
