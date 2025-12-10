public class Optimal_Trap {
    public static void main(String[] args) {
        int []height={0,1,0,2,1,0,1,3,2,1,2,1};
        int n=height.length;
        int l = 0,waterUnits=0,leftmax=0,rightmax=0;
        int r=n-1;
        while(l<r){
            if(height[l]<=height[r]){
                if(leftmax>height[l]) waterUnits+=leftmax-height[l];
                else leftmax=height[l];
                l++;
            }else{
                if(rightmax>height[r]) waterUnits+=rightmax-height[r];
                else rightmax=height[r];
                r--;
            }
        }
        System.out.println(waterUnits+" units");
    }
}
