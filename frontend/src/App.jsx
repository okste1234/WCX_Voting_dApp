import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Popup from "reactjs-popup"
import ETH from "./assets/eth.svg"
import { useEffect, useState } from "react";
// import { ethers } from "ethers"
import { toast } from "react-toastify";
import { useConnect, } from 'wagmi'
import { injected } from "wagmi/connectors";
import { useAccount, useReadContract, useSwitchChain, useWriteContract } from "wagmi";
import { contractAddress } from "@/config/index"
import abi from "./config/abi.json"


export default function Homepage() {
  const CHAINID = 11155111
  const { connect } = useConnect()
  const { switchChain, isError: errorSwitching } = useSwitchChain()
  const { writeContract, isError, error, isSuccess } = useWriteContract()
  const { isConnected, address, chain } = useAccount()
  const [networkDialog, setNetworkDialog] = useState(false);
  const [notReg, setNotReg] = useState(true)


  if (isError) {
    toast.error(error?.name)
  }

  if (errorSwitching) {
    switchChain({ chainId: CHAINID })

  }


  if (isSuccess) {
    toast.success("Awaiting confirmation")

  }


  function votes(arg) {
    if (!isConnected) {
      toast.error("Connect wallet");
      return;
    }
    if (!chain || chain.id !== CHAINID) {
      switchChain({ chainId: CHAINID })
      return;
    }
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: arg,
    })
  }

  function registar() {
    if (!isConnected) {
      toast.error("Connect Wallet first to registar");
      return;
    }
    writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "Transfer",
    })

    setNotReg(false)
  }


  const { data } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getWinner",
    // query: {
    //   refetchInterval: 1000,
    //   retry: true
    // }
  });

  console.log(data)

  useEffect(() => {
    if (!chain || chain.id !== CHAINID) {
      if (isConnected) {
        setNetworkDialog(true)
      }
    }
  }, [chain, isConnected])


  return (
    <>
      <Popup closeOnDocumentClick={false} open={networkDialog} closeOnEscape={false}>
        <div className="flex items-center justify-center">
          <div className="md:w-[calc(100vw/4)] w-full">
            <div className="flex w-full items-center justify-center">
              <div className="w-full bg-white p-5 rounded-3xl  border-[1.563px] border-[#383838]">
                <h1 className="font-[800] text-4xl">Notice!!!</h1>
                <p>Switch To the sepolia test network</p>
                <button
                  onClick={() => {
                    setNetworkDialog(false);
                    switchChain({ chainId: CHAINID })

                  }}
                  className="bg-gradient-to-l mt-5 outline-none w-full from-[#3F26D9] via-[#3F26D9] to-[#8A3FE7] text-white font-bold py-2.5 px-4 rounded-lg"
                >
                  Switch
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
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
          <div className="align-top flex md:space-x-10" id="wallet">
            <div>
              {notReg ?
                <Button
                  onClick={registar}
                  className="text-sm font-bold bg-[#e3e3e5] rounded-full hover:text-[#e3e3e5] text-[#272e3f]" href="#">
                  Voters Registar
                </Button> :
                <Button
                  className="text-sm font-bold bg-[#e3e3e5] hover:text-[#e3e3e5] p-5 hadow-lg text-[#272e3f]">
                  Valid Voter
                </Button>
              }
            </div>

            <div className="">
              {isConnected ? <div className=" shadow-lg">
                <Button
                  onClick={async () => {
                    await navigator.clipboard.writeText(address.toString())
                    toast.success("Copied address to clipboard")
                  }}

                  className="flex cursor-pointer items-center gap-2 bg-gradient-to-l from-[#3F26D9] via-[#3F26D9] to-[#8A3FE7]">

                  <img src={ETH} className="w-5 h-5" alt="" />

                  <small>{`${chain?.name} ${address?.slice(0, 7)}...${address?.slice(address.length - 5)}`}</small>
                </Button>

              </div>
                :
                <Button
                  className="bg-gradient-to-l from-[#3F26D9] via-[#3F26D9] to-[#8A3FE7] font-bold text-sm text-white rounded-full"

                  // className="text-sm font-bold hover:text-[#272e3f] hover:bg-[#e3e3e5]"
                  onClick={() => {
                    connect({ connector: injected(), chainId: CHAINID });
                  }}
                >
                  Connect wallet
                </Button>}
            </div>

          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-36">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-3">
                <Card className="shadow-2xl">
                  <CardHeader>
                    <CardTitle>John Doe</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center gap-3">
                    <img
                      alt="John Doe"
                      className="aspect-[1/1] overflow-hidden rounded-lg object-cover object-center"
                      height="140"
                      src="https://images.squarespace-cdn.com/content/v1/54693b1ee4b07c8a3da7b6d0/1492201646122-7CCYPRAF33QU2MGPW8YJ/Headshot-by-Lamonte-G-Photography-Baltimore-Corporate-Headshot-Photographer-IMG_6763-Edit.JPG?format=1500w"
                      width="140"
                    />

                    <div className="space-y-5">
                      <div className="text-3xl">REP</div>
                      <div className="text-lg">Remix Environment Party</div>
                      <Button onClick={() => votes("Candidate1")}
                        className="bg-gradient-to-l from-[#3F26D9] via-[#3F26D9] to-[#8A3FE7] shadow-lg"
                      >
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-2xl">
                  <CardHeader>
                    <CardTitle>Adekunle Tunde</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center gap-3">
                    <img
                      alt="Adekunle Tunde"
                      className="aspect-[1/1] overflow-hidden rounded-lg object-cover object-center"
                      height={140}
                      src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ="
                      width={140}
                    />
                    <div className="space-y-5">
                      <div className="text-3xl">HFP</div>
                      <div className="text-lg">Hardhat Framework Party</div>

                      <Button onClick={() => votes("Candidate2")}
                        className="bg-gradient-to-l from-[#3F26D9] via-[#3F26D9] to-[#8A3FE7] shadow-lg"
                      >Vote</Button>

                    </div>
                  </CardContent>
                  {/* <CardFooter>
                  </CardFooter> */}
                </Card>
                <Card className="shadow-2xl">
                  <CardHeader>
                    <CardTitle>Zarah Aliyu</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center gap-3">
                    <img
                      alt="Zarah Aliyu"
                      className="aspect-[1/1] overflow-hidden rounded-lg object-cover object-center"
                      height={140}
                      src="https://i.pinimg.com/236x/ce/d8/4a/ced84a67302c60bd1abaaf9314064433.jpg"
                      width={140}
                    />
                    <div className="space-y-5">
                      <div className="text-3xl">TFP</div>
                      <div className="text-lg">Truffle Framework Party</div>

                      <Button onClick={() => votes("Candidate3")}
                        className="bg-gradient-to-r from-[#3F26D9] via-[#3F26D9] to-[#8A3FE7] shadow-lg"
                      >Vote</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section className="w-full bg-gray-100 dark:bg-gray-800">
            <div className="text-center py-14 md:py-16 lg:py-24 text-lg">
              <Button className="tracking-widest font-semibold p-4">See Winner</Button>
              {/* <h4>Winner is:{data}</h4> */}
            </div>
            <div className="py-7 md:py-12 lg:py-16">
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl pb-4 font-bold tracking-tighter md:text-4xl/tight">Current Vote Counts</h2>
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
    </>
  )
}

