/*2.Factor Finder:
Write a program to find the factors of a given number. If the input provided is negative,
ignore the sign and provide the output. If the input is zero, the output should be "No
Factors."
Approach: Take an integer input from the user. If the number is zero, display "No
Factors." If negative, ignore the sign by taking the absolute value. Then, find and print all
numbers that divide the given number exactly without a remainder. */
import java.util.Scanner;
class Factor{
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter an integer: ");
        int num=sc.nextInt();
        if(num==0){
            System.out.println("No Factors.");
            System.exit(0);
        }
        num=Math.abs(num);
        System.out.print("Factors of "+num+" are: ");
        for(int i=0;i<num;i++){
            if(num%i==0){
                System.out.println(i+" ");
            }
        }

        
    }
}