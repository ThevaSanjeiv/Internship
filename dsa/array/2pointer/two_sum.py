arr=[1,3,5,8,9]
target=10
left=0
right=len(arr)-1

while left < right:
    sum1 = arr[left] + arr[right]
    if sum1 == target:
        print([left+1, right+1],end=" ")
        left+=1
        right-=1
    elif sum1 > target:
        right -= 1 
    else:
        left += 1   


