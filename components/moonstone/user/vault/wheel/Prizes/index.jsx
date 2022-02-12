import { CheckIcon, ClockIcon } from '@heroicons/react/solid'

export default function StorePrizes({ products }) {
  return (
    <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
      {products.map((product) => (
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
                {false ? (
                  <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                ) : (
                  <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                )}
                <span>{false ? 'Delivered' : `Go to the acreditation to pick up your purchase`}</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
