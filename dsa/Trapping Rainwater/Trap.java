
public class Trap {
    public static void main(String[] args) {
        int[] arr={0,1,0,2,1,0,1,3,2,1,2,1};
        int n = arr.length;
        int[] prefix=new int[n];
        int[] suffix=new int[n];
        prefix[0]=arr[0];
        suffix[n-1]=arr[n-1];
        for(int i=1;i<n;i++){
            prefix[i]=Math.max(prefix[i-1],arr[i]);
        }
        for(int i=n-2;i>-1;i--){
            suffix[i]=Math.max(suffix[i+1],arr[i]);
        }
        int total=0;
        for(int i=0;i<n;i++){
            int leftmax=prefix[i];
            int rightmax=suffix[i];
            if(arr[i]<leftmax && arr[i]<rightmax){
                total+=Math.min(leftmax,rightmax)-arr[i];
            }
        }
        System.out.println(total);
    }
}
