interface Drawable {
    void draw();
    void resize(double factor);
}

interface Moveable {
    void move(int x, int y);
    void getPosition();
}

interface Colorable {
    void setColor(String color);
    String getColor();
}

class Square implements Drawable, Moveable, Colorable {
    private double side;
    private int posX, posY;
    private String color;
    
    public Square(double side, int x, int y, String color) {
        this.side = side;
        this.posX = x;
        this.posY = y;
        this.color = color;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " square with side " + side + " at position (" + posX + "," + posY + ")");
    }
    
    @Override
    public void resize(double factor) {
        side *= factor;
        System.out.println("Square resized. New side: " + side);
    }
    
    @Override
    public void move(int x, int y) {
        posX = x;
        posY = y;
        System.out.println("Square moved to position (" + posX + "," + posY + ")");
    }
    
    @Override
    public void getPosition() {
        System.out.println("Square position: (" + posX + "," + posY + ")");
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Square color changed to " + color);
    }
    
    @Override
    public String getColor() {
        return color;
    }
}

class CircleShape implements Drawable, Colorable {
    private double radius;
    private String color;
    
    public CircleShape(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " circle with radius " + radius);
    }
    
    @Override
    public void resize(double factor) {
        radius *= factor;
        System.out.println("Circle resized. New radius: " + radius);
    }
    
    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Circle color changed to " + color);
    }
    
    @Override
    public String getColor() {
        return color;
    }
}

interface Playable {
    void play();
    void pause();
    void stop();
}

interface Recordable {
    void startRecording();
    void stopRecording();
}

class MediaPlayer implements Playable {
    private String currentTrack;
    private boolean isPlaying;
    
    public MediaPlayer(String track) {
        this.currentTrack = track;
        this.isPlaying = false;
    }
    
    @Override
    public void play() {
        isPlaying = true;
        System.out.println("Playing: " + currentTrack);
    }
    
    @Override
    public void pause() {
        isPlaying = false;
        System.out.println("Paused: " + currentTrack);
    }
    
    @Override
    public void stop() {
        isPlaying = false;
        System.out.println("Stopped: " + currentTrack);
    }
}

class AdvancedPlayer implements Playable, Recordable {
    private String currentTrack;
    private boolean isPlaying;
    private boolean isRecording;
    
    public AdvancedPlayer(String track) {
        this.currentTrack = track;
        this.isPlaying = false;
        this.isRecording = false;
    }
    
    @Override
    public void play() {
        isPlaying = true;
        System.out.println("Advanced Player: Playing " + currentTrack);
    }
    
    @Override
    public void pause() {
        isPlaying = false;
        System.out.println("Advanced Player: Paused " + currentTrack);
    }
    
    @Override
    public void stop() {
        isPlaying = false;
        System.out.println("Advanced Player: Stopped " + currentTrack);
    }
    
    @Override
    public void startRecording() {
        isRecording = true;
        System.out.println("Advanced Player: Started recording");
    }
    
    @Override
    public void stopRecording() {
        isRecording = false;
        System.out.println("Advanced Player: Stopped recording");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        Square square = new Square(10.0, 5, 10, "Red");
        square.draw();
        square.move(20, 30);
        square.resize(1.5);
        square.setColor("Blue");
        square.getPosition();
        
        System.out.println("---");
        
        CircleShape circle = new CircleShape(7.5, "Green");
        circle.draw();
        circle.resize(2.0);
        circle.setColor("Yellow");
        
        System.out.println("---");
        
        MediaPlayer player = new MediaPlayer("Song.mp3");
        player.play();
        player.pause();
        player.stop();
        
        System.out.println("---");
        
        AdvancedPlayer advPlayer = new AdvancedPlayer("Movie.mp4");
        advPlayer.play();
        advPlayer.startRecording();
        advPlayer.pause();
        advPlayer.stopRecording();
        advPlayer.stop();
        
        System.out.println("---");
        
        Drawable[] drawables = {square, circle};
        for (Drawable drawable : drawables) {
            drawable.draw();
        }
    }
}