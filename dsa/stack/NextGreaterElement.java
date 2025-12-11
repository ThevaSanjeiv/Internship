import java.util.*;

public class NextGreaterElement {
    public static void main(String[] args) {

        int[] arr = {6, 0, 8, 1, 3};
        int n = arr.length;

        int[] nge = new int[n];
        Stack<Integer> stack = new Stack<>();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            if (stack.isEmpty()) {
                nge[i] = -1;
            } else {
                nge[i] = stack.peek();
            }
            stack.push(arr[i]);
        }

        // Print result
        System.out.println(Arrays.toString(nge));
    }
}
