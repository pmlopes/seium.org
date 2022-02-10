import { buyAward } from "/lib/api";

export default function Award({ name, id, image, cost, available, message, enabled, updateStore, token_balance, setUser}) {
  return (
    <div className="block text-center">
      <div className={enabled ? "opacity-100" : "opacity-50"}>
        <img className="mx-auto" src={image} width="200" height="200" alt={name} />
        <div className="mt-8 w-auto">

          {enabled ?
            <button
              onClick={(e) => buyAward(id)
                .then((response) => {
                  updateStore((needsUpdate) => !needsUpdate)
                  setUser((oldUser) => ({...oldUser ,token_balance: token_balance - cost}))
                })}
              className="m-auto block h-20 w-64 rounded-full bg-quinary">
              <p className="font-ibold font-bold">REDEEM</p>
              <p className="font-iregular">{cost} tokens 💰</p>
            </button>
            :
            <button
              className="m-auto block h-20 w-64 rounded-full bg-quinary">
              <p className="font-ibold font-bold">REDEEM</p>
              <p className="font-iregular">{cost} tokens 💰</p>
            </button>
          }
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="font-ibold font-bold">{available} available</p>
        <p className="font-iregular">{message}</p>
      </div>
    </div>
  );
}
