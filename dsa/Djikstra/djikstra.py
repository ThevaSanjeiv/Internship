import heapq   

def dijkstra(V, adj, S):
    INF = 10**9
    dist = [INF] * V
    dist[S] = 0

    # Min-heap: (distance, node)
    pq = [(0, S)]

    while pq:
        d, node = heapq.heappop(pq)

        if d > dist[node]:
            continue

        for neigh, w in adj[node]:
            new_dist = d + w
            if new_dist < dist[neigh]:
                dist[neigh] = new_dist
                heapq.heappush(pq, (new_dist, neigh))

    return dist


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
