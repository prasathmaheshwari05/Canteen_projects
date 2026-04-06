import { useState } from "react";
import ItemGrid from "./components/ItemGrid";
import BillScroll from "./components/BillScroll";
import { Button } from "./components/ui/button";
import { Receipt } from "lucide-react";

export interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function App() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showBill, setShowBill] = useState(false);

  const addItemToBill = (item: { name: string; price: number }) => {
    setBillItems((prev) => {
      const existingItem = prev.find((i) => i.name === item.name);
      if (existingItem) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: crypto.randomUUID(), ...item, quantity: 1 }];
    });
  };

  const removeItemFromBill = (id: string) => {
    setBillItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromBill(id);
      return;
    }
    setBillItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearBill = () => {
    setBillItems([]);
    setShowBill(false);
  };

  const totalItems = billItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Restaurant Billing System
          </h1>
          <p className="text-slate-600">Select items to add to your bill</p>
        </header>

        <ItemGrid onAddItem={addItemToBill} />

        <div className="fixed bottom-4 right-4 z-50 flex gap-3">
          {billItems.length > 0 && (
            <>
              <Button
                onClick={() => setShowBill(!showBill)}
                size="lg"
                className="shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Receipt className="mr-2 h-5 w-5" />
                View Bill ({totalItems} {totalItems === 1 ? "item" : "items"})
              </Button>
            </>
          )}
        </div>

        <BillScroll
          items={billItems}
          isVisible={showBill}
          onClose={() => setShowBill(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItemFromBill}
          onClearBill={clearBill}
        />
      </div>
    </div>
  );
}

export default App;
