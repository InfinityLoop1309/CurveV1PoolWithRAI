async function main() {
  const [deployer] = await ethers.getSigners();
  const me = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("PoolToken");
  const token = await Token.deploy()

  console.log("Token address:", token.address);
  
  const testPrice = await ethers.getContractFactory("test_price")
  const testprice = await testPrice.deploy()

  console.log("Token address:", testprice.address);

  const Contract = await ethers.getContractFactory("CurveV1PoolWithRAI")
  const contract = await Contract.deploy(me,[token.address,token.address],token.address,testprice.address,1000,0,0)

   console.log("Contract Address:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

