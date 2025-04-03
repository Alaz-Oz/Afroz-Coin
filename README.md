# Afroz Coin
A demo coin project, that is every bit unsecure.

## Still want to run it??
First you have to deploy the smart (`Yes, smart just like me, now don't stare and run already`) contract.

### Deploy the contract

```bash
cargo stylus deploy --private-key="<private-key>" --endpoint="<endpoint>"
```

> [!NOTE]
> Okay idiots, let me remind you to replace `<private-key>` with your wallet's private key, and YES replace the angular brackets too (angular brackets looks like `<` and `>` dummies)
>
> And `<endpoint>` too with your `RPC URL`. And if you don't know what it is.....
>
> then it is better to google before running the project.

> [!IMPORTANT]
> If the run is successfull, then you will recieve a contract address, (`code Deployed at` for you dummies)
> 
> Copy the contract address for proceeding further, else, nice having you here.



### Test the contract
Here is the fun part. Now you should be able to test the contract using a test script which calls the respective contract methods. Bored already?? Lets dive in.
**Add your secrets in `.env` file**
```bash
RPC_URL="<endpoint>"
PRIVATE_KEY="<private-key>"
CONTRACT_ADDRESS="<contract-address>"
```
> [!NOTE]
> Okay dumbasses, let me remind you AGAIN to replace `<private-key>` with your wallet's private key, and YES replace the angular brackets too (angular brackets looks like `<` and `>` dummies)
>
> And `<endpoint>` too with your `RPC URL`. And if you don't know what it is.....
>
> then why the F haven't you googled it yet??
>
> Finally, paste the copied contract address from the previous step in place of `<contract-address>`

**Install the dependencies**
```bash
npm install
```

**Run the test**
```bash
node test.ts
```

