s = "abcabcbbbb"
last_index = {}    
start = 0          
longest = 0
best_start = 0     

for i, ch in enumerate(s):
    # If we have seen this char in the current window, move start
    if ch in last_index and last_index[ch] >= start:
        start = last_index[ch] + 1

    # update last seen index
    last_index[ch] = i

    # window length = i - start + 1
    window_len = i - start + 1
    if window_len > longest:
        longest = window_len
        best_start = start

best_substring = s[best_start: best_start + longest]
print("Length:", longest)
print("Substring:", best_substring)
print(last_index)
