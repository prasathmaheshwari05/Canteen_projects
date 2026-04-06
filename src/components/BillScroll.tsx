import { BillItem } from "../App";
import { Button } from "./ui/button";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BillScrollProps {
  items: BillItem[];
  isVisible: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearBill: () => void;
}

export default function BillScroll({
  items,
  isVisible,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearBill,
}: BillScrollProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 transition-all duration-500 z-40",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="relative w-[500px] max-w-[90vw]">
        <div className="absolute -top-4 left-8 w-12 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full shadow-lg">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-700 rounded-full"></div>
        </div>
        <div className="absolute -top-4 right-8 w-12 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full shadow-lg">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-700 rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-8 border-amber-400 rounded-t-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 px-6 py-3 flex justify-between items-center border-b-4 border-amber-600">
            <h2 className="text-2xl font-bold text-amber-900">Bill Receipt</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-amber-900 hover:bg-amber-300"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-6 bg-[repeating-linear-gradient(0deg,transparent,transparent_29px,rgba(245,158,11,0.1)_29px,rgba(245,158,11,0.1)_30px)]">
            <div className="text-center mb-6 pb-4 border-b-2 border-dashed border-amber-300">
              <h3 className="text-xl font-bold text-slate-800">
                Restaurant Name
              </h3>
              <p className="text-sm text-slate-600">123 Main Street</p>
              <p className="text-sm text-slate-600">
                {new Date().toLocaleString()}
              </p>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                No items added yet
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white/50 rounded-lg p-3 border border-amber-200"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white rounded-md border border-amber-300">
                      <Button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-amber-100"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-amber-100"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="w-20 text-right font-bold text-slate-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <Button
                      onClick={() => onRemoveItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <>
                <div className="mt-6 pt-4 border-t-2 border-dashed border-amber-300 space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Tax (10%):</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t-2 border-amber-400">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={onClearBill}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Bill
                  </Button>
                  <Button
                    onClick={() => alert("Payment processed!")}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    Pay Now
                  </Button>
                </div>

                <div className="mt-4 text-center text-xs text-slate-500">
                  <p>Thank you for your visit!</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-3 bg-gradient-to-b from-amber-600 to-amber-700 border-x-8 border-b-8 border-amber-400 rounded-b-lg"></div>
      </div>
    </div>
  );
}
