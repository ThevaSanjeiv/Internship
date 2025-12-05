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


# Example usage:
# Graph:
# 0 -> (1,4), (2,7)
# 1 -> (2,1), (3,5)
# 2 -> (3,2)
# 3 -> []
V = 4
adj = [
    [(1, 4), (2, 7)],
    [(2, 1), (3, 5)],
    [(3, 2)],
    []
]

print(dijkstra(V, adj, 0))  # Output: [0, 4, 5, 7]
