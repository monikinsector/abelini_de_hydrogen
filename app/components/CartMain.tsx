import {Image, useOptimisticCart} from '@shopify/hydrogen';
import {useState} from 'react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="cart-details">
        <div aria-labelledby="cart-lines">
          <ul>
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const [showPromoInput, setShowPromoInput] = useState(false);
  
  if (hidden) return null;

  const options = [
    {
      id: 1,
      name: 'SKU',
      value: 'RINE3170',
    },
    {
      id: 2,
      name: 'Metal',
      value: '9K White Gold',
    },
    {
      id: 3,
      name: 'Ring Size',
      value: 'M',
    },
    {
      id: 4,
      name: 'Setting Style',
      value: 'Plain',
    },
    {
      id: 5,
      name: 'Band Style',
      value: 'Plain',
    },
    {
      id: 6,
      name: 'Shank Width',
      value: 'Standard',
    },
    {
      id: 7,
      name: 'Stone Type',
      value: 'Lab Grown Diamond',
    },
    {
      id: 8,
      name: 'Shape',
      value: 'Round',
    },
    {
      id: 9,
      name: 'Carat',
      value: '0.20',
    },
    {
      id: 10,
      name: 'Clarity',
      value: 'SI2',
    },
    {
      id: 11,
      name: 'Colour',
      value: 'I',
    },
    {
      id: 12,
      name: 'Cut',
      value: 'Good',
    },
  ];

  const handleDeliveryDate = () => {
    const deliveryDate = '20th Jan 2026';
    return (
      <div className="text-p-14 leading-p-14">
              <p className="mb-2 flex items-center gap-x-3 text-primary font-medium">
                <Image src="/assets/images/icons/free_delivery.svg" alt="Free Delivery" width={24} height={24} />
                <span>Free and insured delivery – estimated by <span className="text-capitalize">{deliveryDate}</span></span>
              </p>
              <p className="mb-2 flex items-center gap-x-3 text-secondary font-normal">
                <Image src="/assets/images/icons/return.svg" alt="Returns" width={24} height={24} />
                <span>Try it risk-free at home! Not in love with your piece? Return it for free within 60 days</span>
              </p>
            </div>
    );
  };
  
  return (
    <section className="cart-block border-t border-gray-300 border-b">
      <div className="container-fluid px-4 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-1 lg:col-span-8">
            <form id="cart_form" name="cart_form" action="" method="post" encType="multipart/form-data">
              {/* Single Product Item Block */}
              <div className="prod-item-block">
                <div className="grid grid-cols-2 lg:grid-cols-12 lg:gap-8 gap-4">
                  <div className="col-span-1 lg:col-span-5 flex items-start justify-center">
                    <Image className="border border-gray-300" width={400} src="/assets/images/cart/setpln_bandpln_shnkstd_none_med_ww_di_rnd_300_0001.jpg" alt="Cart Empty" />
                  </div>
                  <div className="col-span-1 lg:col-span-7">
                    <ul className="option-list flex flex-col gap-y-1 text-p-14 leading-p-14 text-secondary">
                      <div className="flex items-center gap-x-1 mb-2">
                        <input type="text" readOnly disabled name="quantity[758935]" id="txtProductCount" value="1" className="lg:block hidden border border-gray-300 rounded-[24px] text-center w-15 h-10 bg-[#e9ecef] text-primary mr-3" min="1" max="10" />
                        <Image src="/assets/images/icons/delete.svg" alt="Price" width={20} height={20} className="lg:block hidden" />
                        <span className="font-bold text-p-14 leading-p-14 mr-3 text-primary font-bold lg:block hidden">Delete</span>
                        <span className="font-bold text-p-14 leading-p-14 text-primary">Price:</span>
                        <span className="text-p-14 leading-p-14 text-secondary line-through">£552</span>
                        <span className="text-p-16 leading-p-16 text-tertiary font-bold">£352</span>
                      </div>
                        {options.map((option) => (
                          <li key={option.id} className="order-0">{option.name}: {option.value}</li>
                        ))}
                        <div className="mt-4 text-p-14 leading-p-14 lg:block hidden">
                          {handleDeliveryDate()}
                        </div>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Single Product Item Block End */}
            </form>
            {/* Cart Product End */}
          </div>
          <div className="col-span-1 lg:hidden block">
            {handleDeliveryDate()}
          </div>
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-y-4">
            <h3 className="text-p-16 leading-p-16 text-primary font-bold">PRICE DETAILS</h3>
            <ul className="option-list flex flex-col gap-y-1 text-p-14 leading-p-14 text-secondary gap-y-1">
              <li className="flex items-center justify-between"><span>Delivery Charges</span> <span>FREE</span></li>
              <li className="flex items-center justify-between"><span>VAT (20%)</span> <span>£67</span></li>
              <li className="flex items-center justify-between"><span className="font-bold text-primary">Total</span> <span className="font-bold text-tertiary">£352</span></li>
              <button 
                className="text-p-14 leading-p-14 text-primary mt-3 underline flex items-center gap-x-2 text-left"
                onClick={() => setShowPromoInput(!showPromoInput)}
              >
                <span>Discount Applied - (<b>ABELINI15</b>) Do you have a promo code?</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showPromoInput ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showPromoInput && (
                <li className="mt-3 flex items-center">
                  <input 
                    type="text" 
                    defaultValue="ABELINI15"
                    className="flex-1 border border-gray-300 rounded-l-[24px] rounded-r-none px-4 py-2 focus:outline-none focus:ring-1"
                    placeholder="Enter promo code"
                  />
                  <button className="bg-black text-white rounded-[24px] rounded-l-none px-4 py-2 border border-black">
                    APPLY DISCOUNT
                  </button>
                </li>
              )}
            </ul>
            <button className="w-full btn-yellow">Proceed to Checkout</button>
            <button className="w-full btn-transparent">Save Shopping Bag</button>
            <div className="mt-4 border-t border-dashed border-gray-300 pt-4">
              <div className="flex items-center justify-around">
                <Image src="/assets/images/cart/visa.svg" alt="Visa" width={60} />
                <Image src="/assets/images/cart/mastercard.svg" alt="Mastercard" width={60} />
                <Image src="/assets/images/cart/american.svg" alt="Amex" width={60} />
                <Image src="/assets/images/cart/afterpay.svg" alt="Clearpay" width={60} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
