s = "A man, a plan, a canal: Panama"
s.replace(" ","")
l=0
r=len(s)-1
bool=False
while(l<r):
    if(s[l]!=s[r]):
        print("false")
        break
    else:
        bool=True
        l+=1
        r-=1
    
if(bool):
    print("true") 