export default function StoreEmpty({ products }) {
  return (
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
          {products && products.slice(0, 3).filter(product => product.stock >= 0).map(product => (
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
  );
}
