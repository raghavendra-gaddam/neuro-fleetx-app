///1.Fuel Consumption Calculation:
/*Write a program to calculate the fuel consumption of a truck. The program should ask the
user to enter the quantity of diesel to fill up the tank and the distance covered till the tank
goes dry. Calculate the fuel consumption and display it in the format (liters per 100
kilometers). Convert the same result to the U.S. style of miles per gallon and display the
result. If the quantity or distance is zero or negative, display "is an Invalid Input.
Approach: First, take diesel quantity and distance as input and validate them. If invalid,
display
an error message. If valid, calculate liters per 100 km using (quantity/distance) * 100. Then,
convert distance to miles and diesel to gallons to find miles per gallon and display both
results.*/
import java.util.Scanner;
class Fuel_Consumption_Calculation{
    public static void main(String[] args){
        System.out.println("enter the quantity of diesel to fill up the tank (in liters): ");
        Scanner sc=new Scanner(System.in);
        int quantity=sc.nextInt();
        System.out.println("enter the distance covered till the tank goes dry (in kilometers): ");
        int distance=sc.nextInt();
        if(quantity<=0 || distance<=0){
            System.out.println("is an Invalid Input");
        }
        else{
            double liters_per_100km=(quantity/(double)distance)*100;
            System.out.printf("Fuel consumption: %.2f liters per 100 kilometers\n",liters_per_100km);
            double miles_per_gallon=(distance/1.60934)/(quantity/3.78541);
            System.out.printf("Fuel consumption: %.2f miles per gallon\n",miles_per_gallon);
        }  
    }
}