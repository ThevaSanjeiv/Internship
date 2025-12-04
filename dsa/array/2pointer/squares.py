arr=[-4,3,5,7,9]
left=0
right=len(arr)-1
result=[]
while(left<=right):
    if(abs(arr[left])>abs(arr[right])):
        result.append(arr[left]**2)
        left+=1
    else:
        result.append(arr[right]**2)
        right-=1
for i in result:
    print(i,end=" ")