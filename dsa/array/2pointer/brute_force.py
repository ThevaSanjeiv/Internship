arr=[1,3,5,7,9]
target=10
for i in range(len(arr)):
    for j in range(i+1,len(arr)):
        summ=arr[i]+arr[j]
        if summ==target:
            print([arr[i],arr[j]],end=" ")
    