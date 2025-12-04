arr = [1, 2, 5, 8, 10]
k = 14
l = 0
max_length = 0
summ = 0
n = len(arr)
r = 0

best_l = 0  
best_r = -1  

while r < n:
    summ += arr[r]

    while summ > k:
        summ -= arr[l]
        l += 1

    w = (r - l) + 1
    if summ <= k and w > max_length:
        max_length = w
        best_l = l
        best_r = r

    r += 1

print("Max length:", max_length)
print("Longest subarray:", arr[best_l:best_r + 1])
