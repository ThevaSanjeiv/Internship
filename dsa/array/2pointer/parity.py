arr=[1,2,4,3,5,6,9,8]
left=0
right=len(arr)-1
while left<right:
    if(arr[left]%2==1 and arr[right]%2==0):
        arr[left],arr[right]=arr[right],arr[left]
        left+=1
        right-=1
    elif arr[left]%2==0:
        left+=1
    else:
        right-=1
print(arr)