arr=[0,1,0,2,1,0,1,3,2,1,2,1]
n=len(arr)
prefix=[0]*n
suffix=[0]*n
prefix[0]=arr[0]
suffix[n-1]=arr[n-1]
for i in range(1,n):
    prefix[i]=max(prefix[i-1],arr[i])
for i in range(n-2,0,-1):
    suffix[i]=max(suffix[i+1],arr[i])
# print(prefix)
# print(suffix)
total=0
for i in range(n):
    leftmax=prefix[i]
    rightmax=suffix[i]
    if(arr[i]<leftmax and arr[i]<rightmax):
        total=total+min(leftmax,rightmax)-arr[i]
print(total)