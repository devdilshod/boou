import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Cart = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) => {
  const { t, translateColor, translateProductName } = useLanguage();

  const [step, setStep] = useState('cart'); // 'cart' | 'form' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+998 ');
  const [customerNote, setCustomerNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [confirmedOrderNum, setConfirmedOrderNum] = useState('');

  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCloseAll = () => {
    setStep('cart');
    setErrorMsg('');
    onClose();
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.trim();

    if (!cleanName || cleanPhone.length < 9) {
      setErrorMsg(t('cart.fillRequired'));
      return;
    }

    setErrorMsg('');
    setSending(true);

    try {
      const orderNum = await onCheckout({
        name: cleanName,
        phone: cleanPhone,
        note: customerNote.trim(),
      });
      setConfirmedOrderNum(orderNum);
      setStep('success');
      setCustomerName('');
      setCustomerPhone('+998 ');
      setCustomerNote('');
    } catch {
      setErrorMsg(t('cart.sendError'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex justify-end" onClick={handleCloseAll}>
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-boou-200 flex items-center justify-between bg-boou-50">
          <div className="flex items-center gap-2">
            <i className="fas fa-shopping-bag text-boou-600 text-lg"></i>
            <h3 className="font-extrabold text-base text-boou-900">{t('cart.title')}</h3>
            {step !== 'success' && (
              <span className="text-xs bg-boou-200 text-boou-800 px-2 py-0.5 rounded-full font-bold">
                {cart.length} {t('cart.itemsCount')}
              </span>
            )}
          </div>
          <button onClick={handleCloseAll} className="p-2 text-boou-400 hover:text-boou-700">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* 1-BOSQICH: SAVATCHA RO'YXATI */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-boou-500 space-y-3">
                  <i className="fas fa-shopping-bag text-4xl text-boou-300"></i>
                  <p className="text-xs">{t('cart.empty')}</p>
                  <button onClick={handleCloseAll} className="px-4 py-2 bg-boou-600 text-white text-xs font-bold rounded-xl">
                    {t('cart.startShopping')}
                  </button>
                </div>
              ) : (
                cart.map(item => {
                  const displayName = translateProductName({ name: item.name });
                  return (
                    <div key={item.cartItemId} className="flex items-center gap-3 p-3 bg-boou-50 rounded-2xl border border-boou-200/80">
                      <img src={item.image} alt={displayName} className="w-16 h-16 object-cover rounded-xl bg-white border border-boou-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-boou-950 truncate">{displayName}</h4>
                        <div className="text-[11px] text-boou-500 font-medium flex items-center gap-1.5 mt-0.5">
                          <span className="w-2.5 h-2.5 rounded-full inline-block border border-boou-300" style={{ backgroundColor: item.colorHex }} />
                          <span>{translateColor(item.color)}</span>
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
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-boou-200 bg-boou-50 space-y-3">
                <div className="space-y-1.5 text-xs text-boou-600">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <strong className="text-boou-900 font-bold">${total}</strong>
                  </div>
                  <div className="flex justify-between text-base text-boou-950 font-extrabold pt-2 border-t border-boou-200">
                    <span>{t('cart.total')}</span>
                    <span className="text-boou-600">${total}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-full py-3.5 bg-boou-600 hover:bg-boou-700 text-white font-bold rounded-xl text-sm transition"
                >
                  {t('cart.checkout')} &rarr;
                </button>
              </div>
            )}
          </>
        )}

        {/* 2-BOSQICH: MIJOZ MA'LUMOTLARI */}
        {step === 'form' && (
          <form onSubmit={handleSubmitOrder} className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="p-5 space-y-4">
              <button
                type="button"
                onClick={() => { setStep('cart'); setErrorMsg(''); }}
                className="text-xs font-bold text-boou-600 hover:text-boou-900 flex items-center gap-1.5"
              >
                <i className="fas fa-arrow-left"></i> {t('cart.backToCart')}
              </button>

              <div className="p-3.5 rounded-2xl bg-boou-50 border border-boou-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-boou-600">{t('cart.total')}</span>
                <span className="text-lg font-black text-boou-950">${total}</span>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-boou-800">{t('cart.customerName')}</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t('cart.customerNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-boou-200 text-sm focus:outline-none focus:ring-2 focus:ring-boou-600/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-boou-800">{t('cart.customerPhone')}</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-boou-200 text-sm focus:outline-none focus:ring-2 focus:ring-boou-600/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-boou-800">{t('cart.customerNote')}</label>
                <textarea
                  rows="2"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder={t('cart.customerNotePlaceholder')}
                  className="w-full px-3.5 py-2 rounded-xl border border-boou-200 text-sm focus:outline-none focus:ring-2 focus:ring-boou-600/40"
                />
              </div>
            </div>

            <div className="p-4 border-t border-boou-200 bg-boou-50">
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 bg-boou-600 hover:bg-boou-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                <i className="fas fa-paper-plane"></i>
                <span>{sending ? t('cart.sending') : t('cart.confirmOrder')}</span>
              </button>
            </div>
          </form>
        )}

        {/* 3-BOSQICH: BUYURTMA QABUL QILINDI */}
        {step === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl">
              <i className="fas fa-check"></i>
            </div>
            <h4 className="text-xl font-extrabold text-boou-950">{t('cart.successTitle')}</h4>
            <div className="px-4 py-2 rounded-xl bg-boou-100 text-boou-900 text-xs font-bold">
              {t('cart.successCode')} <span className="font-mono text-boou-700">#{confirmedOrderNum}</span>
            </div>
            <p className="text-xs text-boou-600 max-w-xs leading-relaxed">
              {t('cart.successSub')}
            </p>
            <button
              type="button"
              onClick={handleCloseAll}
              className="mt-2 px-6 py-3 rounded-xl bg-boou-600 hover:bg-boou-700 text-white text-xs font-bold transition"
            >
              {t('cart.closeBtn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};