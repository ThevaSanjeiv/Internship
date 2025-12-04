public class Parity {
    public static void main(String[] args) {
        int []arr={2,3,4,7,8};
        int left =0;
        int right=arr.length-1;
        while(left<=right){
            if(arr[left]%2==1 && arr[right]%2==0){
                int temp=arr[left];
                arr[left]=arr[right];
                arr[right]=temp;
                left++;
                right--;
            }else if(arr[left]%2==0) left++;

            else right--;
        }
        for(int i:arr){
        System.out.print(i+" ");
    }
    }
    
}
