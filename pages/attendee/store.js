import { useState, useEffect } from "react";

import { withAuth, useAuth } from "/components/Auth";

import * as api from "/lib/api";

import { CheckIcon, ClockIcon } from '@heroicons/react/solid'

import Dashboard from "/components/moonstone/user/utils/Dashboard";

import Balance from "/components/moonstone/user/store/Balance";
import Product from "/components/moonstone/user/store/Product";

function Store() {
  const { user } = useAuth();

  const [owned, updateOwned] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    api.getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Dashboard
      href="store"
      title="Store"
      description="Buy products with your collected tokens"
    >

      <div className="mt-5">
        <button
          className={`font-iregular bg-${owned ? "white" : "quinary"
            } h-12 items-center rounded-full px-4 py-1 text-center`}
          onClick={(e) => {
            updateOwned(false);
          }}
        >
          BUY
        </button>
        <button
          className={`font-iregular bg-${owned ? "quinary" : "white"
            } ml-12 h-12 items-center rounded-full px-4 py-1 text-center`}
          onClick={(e) => {
            updateOwned(true);
          }}
        >
          OWNED
        </button>
      </div>

      <div className="mt-5">
        <Balance
          token_balance={user.token_balance}
          badge_count={user.badge_count}
        />
      </div>

      {!owned ?
        <div className="mt-10 grid grid-cols-1 justify-items-center gap-y-8 gap-x-2 lg:grid-cols-2 xl:grid-cols-3">
          {products &&
            products
              .filter((a) => a.can_buy > 0)
              .sort((a, b) => a.name < b.name)
              .map((product) => (
                <div key={product.id}>
                  <Product
                    name={product.name}
                    id={product.id}
                    image={product.image}
                    price={product.price}
                    enabled={product.can_buy != 0}
                  />
                </div>
              ))}

          {products &&
            products
              .filter((a) => a.can_buy <= 0)
              .sort((a, b) => a.name < b.name)
              .map((product) => (
                <div key={product.id}>
                  <Product
                    name={product.name}
                    id={product.id}
                    image={product.image}
                    price={product.price}
                    enabled={product.can_buy != 0}
                  />
                </div>
              ))}
        </div>
        :
        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {products ?
            products.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm">
                        <div className="font-medium text-gray-700 hover:text-gray-800">
                          {product.name}
                        </div>
                      </h4>
                      <p className="ml-4 text-lg font-medium text-gray-900"> 2 </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>

                  <div className="mt-4 flex-1 flex items-end justify-between">
                    <p className="flex items-center text-sm text-gray-700 space-x-2">
                      {true ? (
                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{true ? 'Delivered' : `Go to the acreditation to pick up your purchase`}</span>
                    </p>
                  </div>

                </div>
              </li>
            ))
            :
            <div className="max-w-lg mx-auto">
              <div className="mt-10">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto text-gray-400 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h2 className="mt-2 text-lg font-medium text-gray-900">Buy Prizes</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven’t purchased any prizes from the store yet. Spen your tokens wisely.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Prizes that you can still purchase
                </h3>
                <ul role="list" className="mt-4 mb-14 border-t border-b border-gray-200 divide-y divide-gray-200">
                  {products.slice(0, 3).filter(product => product.stock >= 0).map(product => (
                    <li key={product.id} className="py-4 flex items-center justify-between space-x-3">
                      <div className="min-w-0 flex-1 flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm font-medium text-gray-500 truncate"> 💰 {product.price} </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        </ul>
      }
    </Dashboard>
  );
}

export default withAuth(Store);
