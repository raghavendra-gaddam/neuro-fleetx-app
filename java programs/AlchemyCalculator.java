import java.io.*;
import java.util.*;

public class AlchemyCalculator{
    private static HashMap<String, ArrayList<String[]>> recipeDatabase=new HashMap<>();
    private static final HashMap<String, Integer> memoization=new HashMap<>();

    public static void main(String[] args) throws IOException {
        Scanner scanner=new Scanner(System.in);
        int totalRecipes=scanner.nextInt();
        scanner.nextLine();
        for (int count=0; count<totalRecipes;count++){
            String recipeInput=scanner.nextLine().trim();
            String[] recipeParts=recipeInput.split("=");
            String resultItem=recipeParts[0];
            String[] ingredients=recipeParts[1].split("\\+");
            if (!recipeDatabase.containsKey(resultItem)){
                recipeDatabase.put(resultItem, new ArrayList<>());
            }
            recipeDatabase.get(resultItem).add(ingredients);
        }
        String targetItem=scanner.nextLine().trim();
        int minimumCost=calculateMinimumCost(targetItem);
        System.out.println(minimumCost);
        scanner.close();
    }
    private static int calculateMinimumCost(String itemName){
        if(memoization.containsKey(itemName)){
            return memoization.get(itemName);
        }
        if(!recipeDatabase.containsKey(itemName)){
            memoization.put(itemName, 0);
            return 0;
        }    
        int minCostFound=Integer.MAX_VALUE;
        for(String[] currentRecipe:recipeDatabase.get(itemName)) {
            int recipeCost=currentRecipe.length-1;
            for(String ingredient:currentRecipe) {
                recipeCost+=calculateMinimumCost(ingredient);
            }
            if(recipeCost<minCostFound){
                minCostFound=recipeCost;
            }
        }
        memoization.put(itemName,minCostFound);
        return minCostFound;
    }
}