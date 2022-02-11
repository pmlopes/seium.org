import Link from "next/link";

export default function Product({ name, id, image, price, enabled }) {
  return (
    <button>
      <Link href={`/product/${id}`} className={enabled ? "opacity-100" : "opacity-50"}>
        <div key={id} className="group relative">
          <div href={`/product/${id}`} className={enabled ? "opacity-100" : "opacity-50"}>
            <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-lg text-primary font-ibold">
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
              </h3>
            </div>
            <p className="text-lg font-imedium text-tertiary"> 💰 {price}</p>
          </div>
        </div>
      </Link>
    </button>
  );
}
