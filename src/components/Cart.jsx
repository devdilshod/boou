import React from 'react';

export const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        <div className="p-4 border-b border-boou-200 flex items-center justify-between bg-boou-50">
          <div className="flex items-center gap-2">
            <i className="fas fa-shopping-bag text-boou-600 text-lg"></i>
            <h3 className="font-extrabold text-base text-boou-900">Sizning savatchangiz</h3>
            <span className="text-xs bg-boou-200 text-boou-800 px-2 py-0.5 rounded-full font-bold">{cart.length} ta</span>
          </div>
          <button onClick={onClose} className="p-2 text-boou-400 hover:text-boou-700">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-boou-500 space-y-3">
              <i className="fas fa-shopping-bag text-4xl text-boou-300"></i>
              <p className="text-xs">Sizning savatchangiz hozircha bo'sh.</p>
              <button onClick={onClose} className="px-4 py-2 bg-boou-600 text-white text-xs font-bold rounded-xl">
                Xarid qilishni boshlash
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartItemId} className="flex items-center gap-3 p-3 bg-boou-50 rounded-2xl border border-boou-200/80">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-white border border-boou-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-boou-950 truncate">{item.name}</h4>
                  <div className="text-[11px] text-boou-500 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block border border-boou-300" style={{ backgroundColor: item.colorHex }} />
                    <span>{item.color}</span>
                  </div>
                  <div className="font-extrabold text-xs text-boou-900 mt-1">${item.price} &times; {item.quantity} = <span className="text-boou-600">${item.price * item.quantity}</span></div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center border border-boou-200 rounded-lg bg-white overflow-hidden text-xs">
                    <button onClick={() => onUpdateQuantity(item.cartItemId, -1)} className="px-2 py-0.5 hover:bg-boou-100 font-bold">-</button>
                    <span className="px-2 font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.cartItemId, 1)} className="px-2 py-0.5 hover:bg-boou-100 font-bold">+</button>
                  </div>
                  <button onClick={() => onRemove(item.cartItemId)} className="text-boou-400 hover:text-red-500 text-xs">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-boou-200 bg-boou-50 space-y-3">
            <div className="space-y-1.5 text-xs text-boou-600">
              <div className="flex justify-between">
                <span>Mahsulotlar jami:</span>
                <strong className="text-boou-900 font-bold">${total}</strong>
              </div>
              <div className="flex justify-between text-base text-boou-950 font-extrabold pt-2 border-t border-boou-200">
                <span>Umumiy to'lov:</span>
                <span className="text-boou-600">${total}</span>
              </div>
            </div>
            <button onClick={onCheckout} className="w-full py-3.5 bg-boou-600 hover:bg-boou-700 text-white font-bold rounded-xl text-sm transition">
              Buyurtma berish &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};