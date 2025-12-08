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
    [(1, 4), (2, 1)],   # edges going out from node 0 → 1, 0 → 2
    [(3, 1)],           # edge 1 → 3
    [(1, 2), (3, 5)],   # edges 2 → 1, 2 → 3
    []                  # node 3 has no outgoing edges
]



print(dijkstra(V, adj, 0)) 
