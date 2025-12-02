a=[5,3,6,9,23,1]
for i in range(len(a)):
    temp=a[i]
    j=i-1
    while(j>=0 and a[j]>temp):
        a[j+1]=a[j]
        j-=1
    a[j+1]=temp
print(a)