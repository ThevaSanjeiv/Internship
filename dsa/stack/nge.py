arr=[6,0,8,1,3]
stack=[]
# nge=[-1]*len(arr)
nge=[]
for i in range(len(arr)-1,-1,-1):
    while(stack and stack[-1]<=arr[i]):
        stack.pop()
    if(not stack):
        # nge[i]=-1
        nge.append(-1)
    else:
        # nge[i]=stack[-1]
        nge.append(stack[-1])
    stack.append(arr[i])
nge.reverse()
print(nge)