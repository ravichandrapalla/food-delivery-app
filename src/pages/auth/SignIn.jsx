import Button from "../../components/ui/Button";

export default function SignIn() {
  const handleSubmit = (e) => {
    console.log(e);
  };
  return (
    <div className="h-full bg-neutral-950 font-sans">
      <article className="flex flex-col items-center justify-center text-center p-4 pt-8 h-[30%] text-white">
        <h2>Log In</h2>
        <p>Please sign-in to your existing account</p>
      </article>
      <section className=" rounded-t-2xl px-4 py-4 bg-white h-[calc(100vh-30%)]">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4">
            <label htmlFor="input-email" className="font-semibold text-xs">
              EMAIL
            </label>
            <input
              id="input-email"
              placeholder="example@gmail.com"
              className="p-4 bg-indigo-50 rounded-xl outline-none border-none placeholder:text-sm"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <label htmlFor="input-password" className="font-semibold text-xs">
              PASSWORD
            </label>
            <input
              id="input-password"
              placeholder="password"
              className="p-4 bg-indigo-50 rounded-xl outline-none border-none placeholder:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-[50%] justify-start items-center space-x-4 text-xs">
              <input id="input-checkbox" type="checkbox" />
              <label htmlFor="input-checkbox">Remember me</label>
            </div>
            <div className="text-xs">
              <span>Forget Password</span>
            </div>
          </div>
          <Button type="submit">LOG IN</Button>
        </form>
      </section>
    </div>
  );
}
