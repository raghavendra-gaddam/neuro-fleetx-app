
class Car {
    String color;
    String model;
    void display() {
        System.out.println("Car model: " + model);
        System.out.println("Car color: " + color);
    }
}
public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.color = "Red";
        myCar.model = "Toyota";
        myCar.display();
    }
}
