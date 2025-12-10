nums=[0,1,0,3,12]
n=len(nums)
i=0
for j in range(len(nums)):
    if nums[j]!=0:
        if i!=j:
            nums[i], nums[j]=nums[j], nums[i]
        i+=1
print(nums)
        