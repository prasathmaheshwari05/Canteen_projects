import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface MenuItem {
  name: string;
  price: number;
  category: string;
}

const menuItems: MenuItem[] = [
  { name: "Burger", price: 12.99, category: "Main Course" },
  { name: "Pizza", price: 15.99, category: "Main Course" },
  { name: "Pasta", price: 11.99, category: "Main Course" },
  { name: "Salad", price: 8.99, category: "Appetizer" },
  { name: "French Fries", price: 4.99, category: "Side" },
  { name: "Grilled Chicken", price: 14.99, category: "Main Course" },
  { name: "Fish & Chips", price: 13.99, category: "Main Course" },
  { name: "Soup", price: 6.99, category: "Appetizer" },
  { name: "Soda", price: 2.99, category: "Beverage" },
  { name: "Coffee", price: 3.99, category: "Beverage" },
  { name: "Ice Cream", price: 5.99, category: "Dessert" },
  { name: "Cake", price: 6.99, category: "Dessert" },
];

interface ItemGridProps {
  onAddItem: (item: { name: string; price: number }) => void;
}

export default function ItemGrid({ onAddItem }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24">
      {menuItems.map((item) => (
        <Card
          key={item.name}
          className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-amber-200"
        >
          <CardHeader>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-600">
              ${item.price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => onAddItem({ name: item.name, price: item.price })}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Bill
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
