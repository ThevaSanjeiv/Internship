from collections import defaultdict
from typing import List
import heapq

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        graph=defaultdict(list)
        for u,v,time in times:
            graph[u].append((v,time))
        min_times={}
        min_heap=[(0,k)]
        while min_heap:
            time,node=heapq.heappop(min_heap)
            if node in min_times:
                continue
            min_times[node]=time
            for neigh,neigh_time in graph[node]:
                if neigh not in min_times:
                    heapq.heappush(min_heap,(neigh_time+time,neigh))
        if(len(min_times)==n):
            return(max(min_times.values()))
        else:
            return -1


solution = Solution()

    # Example test case
times = [[2, 1, 1], [2, 3, 1], [3, 4, 1]]
n = 4
k = 2

result = solution.networkDelayTime(times, n, k)
print("Network Delay Time:", result)