import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { ethers } from "ethers"
import { useConnect, } from 'wagmi'
import { metaMask } from "wagmi/connectors";
import { useAccount, useReadContract, useSwitchChain, useWriteContract } from "wagmi";
import { contractAddress } from "@/config/contractAddress"
import abi from "./config/abi.json"


export default function Homepage() {
  const CHAINID = 11155111
  const { connect } = useConnect()
  const { switchChain, isError: errorSwitching } = useSwitchChain()
  const { writeContract, isPending, isError, error, isSuccess } = useWriteContract()
  const { isConnected, address, chain } = useAccount()


  const { data } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getEntityDetails",
    query: {
      refetchInterval: 1000,
      retry: true
    }
  });

  return (
    <section className="w-full py-6 md:pt-8 lg:pt-12">
      <header className="flex h-20 w-full shrink-0 px-4 md:px-6 justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">WCX Council Election 2024</h1>
          <nav className="flex gap-4 md:gap-12 ml-auto md:justify-end pt-2">
            <a className="text-base font-medium hover:underline underline-offset-4 md:pr-12" href="#">
              Home
            </a>
            <a className="text-base font-medium hover:underline underline-offset-4" href="#results">
              Results
            </a>
          </nav>

        </div>
        <div className="align-top md:space-x-10" id="wallet">
          <Button className="text-sm font-bold bg-[#e3e3e5] hover:text-[#e3e3e5] text-[#272e3f]" href="#">
            Voters Registar
          </Button>

          <Button className="text-sm font-bold hover:text-[#272e3f] hover:bg-[#e3e3e5]" href="#"
            onClick={() => {
              connect({ connector: metaMask(), chainId: CHAINID });
            }}
          >
            Connect Wallet
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>John Doe</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <img
                    alt="John Doe"
                    className="aspect-[1/1] overflow-hidden rounded-lg object-cover object-center"
                    height="140"
                    src="https://images.squarespace-cdn.com/content/v1/54693b1ee4b07c8a3da7b6d0/1492201646122-7CCYPRAF33QU2MGPW8YJ/Headshot-by-Lamonte-G-Photography-Baltimore-Corporate-Headshot-Photographer-IMG_6763-Edit.JPG?format=1500w"
                    width="140"
                  />

                  <div className="text-center space-y-3">
                    <div className="text-3xl">REP</div>
                    <div className="text-lg">Remix Environment Party</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Vote</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Adekunle Tunde</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <img
                    alt="Adekunle Tunde"
                    className="aspect-[1/1] overflow-hidden rounded-lg object-cover object-center"
                    height={140}
                    src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                    width={140}
                  />
                  <div className="text-center space-y-3">
                    <div className="text-3xl">HFP</div>
                    <div className="text-lg">Hardhat Framework Party</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Vote</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Zarah Aliyu</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <img
                    alt="Zarah Aliyu"
                    className="aspect-[1/1] overflow-hidden rounded-lg object-cover object-center"
                    height={140}
                    src="https://i.pinimg.com/236x/ce/d8/4a/ced84a67302c60bd1abaaf9314064433.jpg"
                    width={140}
                  />
                  <div className="text-center space-y-3">
                    <div className="text-3xl">TFP</div>
                    <div className="text-lg">Truffle Framework Party</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Vote</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Current Vote Counts</h2>
            <div className="mx-auto grid max-w-5xl divide-y divide-border rounded-lg border border-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0 dark:border-gray-800">
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">John Doe</h3>
                <p className="">150 votes</p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">Jane Smith</h3>
                <p className="">200 votes</p>
              </div>
              <div className="grid gap-1 p-8 md:p-10">
                <h3 className="text-xl text-gray-500 dark:text-gray-400 font-bold">Bob Johnson</h3>
                <p className="">100 votes</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="results" className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Web3Bridge Cohort X. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="/">
            Home
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#wallet">
            Wallet
          </a>
        </nav>
      </footer>
    </section>
  )
}

