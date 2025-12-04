public class Two_sum{
    public static void main(String[] args) {
        int []arr={0,2,3,5,7};
        int left=0;
        int right=arr.length-1;
        int target=5;
        while(left<right){
            int sum=arr[left]+arr[right];
            if(sum==target){
                System.out.println("[" + arr[left] + ", " +arr[right] + "]");
                left ++;
                right--;
            }else if(sum>target){
                right--;
            }else{
                left ++;
            }
        }
    }
}