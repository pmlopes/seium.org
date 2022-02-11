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

  console.log(user);

  const [needsUpdate, updateProductInfo] = useState(false);

  useEffect(() => {
    getProduct(router.query.slug)
      .then((response) => {
        updateProduct(response.data.data);
      })
      .catch((_) => router.replace("/404"));
  }, [needsUpdate]);

  const message =
    product.can_buy != 0
      ? `You can redeem ${product.can_buy} more`
      : "You already reached the redeem limit";

  return (
    <Dashboard href="store">
      <Balance
        token_balance={user.token_balance}
        badge_count={user.badge_count}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <Link href="/attendee/store">
              <a className="text-center font-imedium text-secondary">
                &lt; Back to store
              </a>
            </Link>

            <div className="mt-4">
              <h1 className="font-iextrabold text-6xl tracking-tight text-primary">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <div className="mt-4 space-y-6">
                <p className="text-lg text-gray-500">{product.description}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <div className="mt-10">
                {product.can_buy > 0 && product.stock > 0 && (
                  <button
                    onClick={(e) =>
                      buyProduct(product.id).then((response) => {
                        updateProductInfo((needsUpdate) => !needsUpdate);
                        setUser((oldUser) => ({
                          ...oldUser,
                          token_balance: oldUser.token_balance - product.price,
                        }));
                      })
                    }
                    className="m-auto block h-20 w-full rounded-full bg-quinary hover:opacity-75"
                  >
                    <p className="font-ibold font-bold">REDEEM</p>
                    <p className="font-iregular">{product.price} tokens 💰</p>
                  </button>
                )}
              </div>
              <div className="mt-6 text-center">
                <p className="font-ibold font-bold">
                  {product.stock} available
                </p>
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
