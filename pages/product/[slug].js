import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { withAuth, useAuth } from "/components/Auth";

import { getProduct, buyProduct } from "/lib/api";

import Balance from "/components/moonstone/user/store/Balance";

import Dashboard from "/components/moonstone/user/utils/Dashboard";

function ProductSlug() {
  const [product, updateProduct] = useState({});
  const router = useRouter();
  const { user, setUser } = useAuth();

  console.log(user)

  const [needsUpdate, updateProductInfo] = useState(false);

  useEffect(() => {
    getProduct(router.query.slug)
      .then((response) => {
        updateProduct(response.data.data);
      })
      .catch((_) => router.replace("/404"));
  }, [needsUpdate]);


  const message = product.can_buy != 0 ? `You can redeem ${product.can_buy} more` : "You already reached the redeem limit"

  return (
    <Dashboard
      href="store"
    >

      <Balance
        token_balance={user.token_balance}
        badge_count={user.badge_count}
      />

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">


            <Link href="/attendee/store">
              <a
                className="text-center text-secondary font-imedium"
              >
                &lt; Back to store
              </a>
            </Link>


            <div className="mt-4">
              <h1 className="text-6xl font-iextrabold tracking-tight text-primary">{product.name}</h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">

              <div className="mt-4 space-y-6">
                <p className="text-lg text-gray-500">{product.description}</p>
              </div>

            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-center object-cover" />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <div className="mt-10">
                {product.can_buy > 0 &&
                  product.stock > 0 &&
                  <button
                    onClick={(e) =>
                      buyProduct(product.id)
                        .then((response) => {
                          updateProductInfo((needsUpdate) => !needsUpdate)
                          setUser((oldUser) => ({ ...oldUser, token_balance: oldUser.token_balance - product.price }))
                        })}
                    className="hover:opacity-75 m-auto block h-20 w-full rounded-full bg-quinary">
                    <p className="font-ibold font-bold">REDEEM</p>
                    <p className="font-iregular">{product.price} tokens 💰</p>
                  </button>
                }
              </div>
              <div className="mt-6 text-center">
                <p className="font-ibold font-bold">{product.stock} available</p>
                <p className="font-iregular">{message}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default withAuth(ProductSlug);
