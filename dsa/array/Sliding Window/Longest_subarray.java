public class Longest_subarray{
    public static void main(String[] args) {
        int[] arr = {1, 2, 5, 8, 10};
        int k = 14;

        int l = 0;
        int maxLength = 0;
        int sum = 0;

        for (int r = 0; r < arr.length; r++) {
            sum += arr[r];

            while (sum > k) {
                sum -= arr[l];
                l++;
            }

            int w = r - l + 1;
            maxLength = Math.max(maxLength, w);
        }

        System.out.println(maxLength);
    }
}