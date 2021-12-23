const {assert} = require('assert')
const { expect } = require("chai");
const { ethers } = require("hardhat");
const crvAddr = "0x2e8880cAdC08E9B438c6052F5ce3869FBd6cE513"
const provider = new ethers.providers.JsonRpcProvider();

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner()
const crvABI = [
    "function balanceOf(address)view returns(uint256)",
    "function _get_D(uint256[2],uint256)view returns(uint256)",
    "function A()view returns(uint256)",
    "function balances(uint256)view returns(uint256) ",
    "function decimals()view public returns(uint256)",
    "function coins(uint256)view returns (address)",
    "function add_liquidity(uint256[2],uint256) returns(uint256)",
    "function exchange(int128,int128,uint256,uint256)",
    "function remove_liquidity(uint256,uint256[2]) ",
    "function remove_liquidity_imbalance(uint256[2],uint256)",
    "function remove_liquidity_one_coin(uint256,int128,uint256)",
    "function initialize(string,string,address[4],uint256[4],uint256,uint256)"
]
const crv = new ethers.Contract(crvAddr,crvABI,provider);
const crvSigner = crv.connect(signer)
const me = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
describe ('test',async ()=>{
    it("add liquidity and then remove it in 3 ways",async ()=>{
        let res;
        res = await crv.balances(0)
        let res1 = ethers.utils.formatUnits(res)
        res = await crvSigner.add_liquidity([ethers.utils.parseUnits("1",18),ethers.utils.parseUnits("1",18)],ethers.utils.parseUnits("0.0001",18))
        console.log(res1)
        res = await crv.balances(0)
        let res2 = ethers.utils.formatUnits(res)
        console.log(res2)
        expect( res2 > res1).equal(true)
        res = await crvSigner.remove_liquidity(ethers.utils.parseUnits("0.1",18),[ethers.utils.parseUnits("0.01",18),ethers.utils.parseUnits("0.01",18)])
        res = await crv.balances(0)
        let res3 = ethers.utils.formatUnits(res)
        console.log(res3)
        expect( res2 < res3).equal(true)
        res = await crvSigner.remove_liquidity_imbalance([ethers.utils.parseUnits("0.01",18),ethers.utils.parseUnits("0.02",18)],ethers.utils.parseUnits("1",18))
        res = await crv.balances(0)
        let res4 = ethers.utils.formatUnits(res)
        expect( res4 < res3).equal(true)
        res = await crvSigner.remove_liquidity_one_coin(ethers.utils.parseUnits("0.1",18),0,ethers.utils.parseUnits("0.0001",18))
        res = await crv.balances(0)
        let res5 = ethers.utils.formatUnits(res)
        expect( res4 < res3).equal(true)

    }),
    it('exchanges',async()=>{
        res = await crvSigner.exchange(0,1,ethers.utils.parseUnits("0.1","18"),ethers.utils.parseUnits("0.1","18"))
    })
})


