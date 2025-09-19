class Vehicle {
    protected String brand;
    protected String model;
    
    public Vehicle(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }
    
    public void start() {
        System.out.println(brand + " " + model + " is starting");
    }
    
    public void stop() {
        System.out.println(brand + " " + model + " is stopping");
    }
    
    public void move() {
        System.out.println(brand + " " + model + " is moving");
    }
}

class Car extends Vehicle {
    private int doors;
    
    public Car(String brand, String model, int doors) {
        super(brand, model);
        this.doors = doors;
    }
    
    @Override
    public void move() {
        System.out.println(brand + " " + model + " car is driving on road with " + doors + " doors");
    }
    
    public void honk() {
        System.out.println(brand + " " + model + " is honking");
    }
}

class Motorcycle extends Vehicle {
    private boolean hasSidecar;
    
    public Motorcycle(String brand, String model, boolean hasSidecar) {
        super(brand, model);
        this.hasSidecar = hasSidecar;
    }
    
    @Override
    public void move() {
        String sidecarInfo = hasSidecar ? " with sidecar" : " without sidecar";
        System.out.println(brand + " " + model + " motorcycle is riding" + sidecarInfo);
    }
    
    public void wheelie() {
        System.out.println(brand + " " + model + " is doing a wheelie");
    }
}

class Boat extends Vehicle {
    private String propulsionType;
    
    public Boat(String brand, String model, String propulsionType) {
        super(brand, model);
        this.propulsionType = propulsionType;
    }
    
    @Override
    public void move() {
        System.out.println(brand + " " + model + " boat is sailing using " + propulsionType);
    }
    
    @Override
    public void start() {
        System.out.println(brand + " " + model + " boat engine is starting");
    }
}

public class PolymorphismExampl {
    public static void demonstrateVehicle(Vehicle vehicle) {
        vehicle.start();
        vehicle.move();
        vehicle.stop();
        System.out.println("---");
    }
    
    public static void main(String[] args) {
        Vehicle[] vehicles = {
            new Car("Toyota", "Camry", 4),
            new Motorcycle("Harley-Davidson", "Sportster", false),
            new Boat("Yamaha", "242X", "Twin Engine")
        };
        
        for (Vehicle vehicle : vehicles) {
            demonstrateVehicle(vehicle);
        }
        
        Car car = new Car("Honda", "Civic", 2);
        car.move();
        car.honk();
        
        Motorcycle bike = new Motorcycle("Kawasaki", "Ninja", false);
        bike.move();
        bike.wheelie();
    }
}