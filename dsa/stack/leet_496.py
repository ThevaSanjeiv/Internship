nums1 = [4,1,2]
nums2 = [1,3,4,2]
nge=[]
stack=[]
ans=[-1]*len(nums1)
for i in range(len(nums2)-1,-1,-1):
    while(stack and stack[-1]<=nums2[i]):
        stack.pop()
    if(not stack):
        # nge[i]=-1
        nge.append(-1)
    else:
        # nge[i]=stack[-1]
        nge.append(stack[-1])
    stack.append(nums2[i])
nge.reverse()
for i in range(len(nums1)):
    for j in range(len(nums2)):
        if nums1[i]==nums2[j]:
            ans[i]=nge[j]
print(ans)