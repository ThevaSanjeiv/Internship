import java.util.*;

public class NextGreaterElement {
    public static void main(String[] args) {

        int[] arr = {6, 0, 8, 1, 3};
        int n = arr.length;

        int[] nge = new int[n];
        Stack<Integer> stack = new Stack<>();

        // Traverse from right to left
        for (int i = n - 1; i >= 0; i--) {
            // Pop smaller or equal elements
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }

            // If stack is empty → no greater element
            if (stack.isEmpty()) {
                nge[i] = -1;
            } else {
                nge[i] = stack.peek();
            }

            // Push current element
            stack.push(arr[i]);
        }

        // Print result
        System.out.println(Arrays.toString(nge));
    }
}
