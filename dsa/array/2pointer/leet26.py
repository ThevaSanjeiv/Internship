nums = [1,1,2]
n=len(nums)
j=1
for i in range(1,n-1):
    if nums is None:
        print(0)
    if(nums[i]!=nums[j-1]):
        nums[j]=nums[i]
    j+=1
print(j)
print(nums[:j])