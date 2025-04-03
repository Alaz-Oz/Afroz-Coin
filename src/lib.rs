// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

mod erc20;

use crate::erc20::{Erc20, Erc20Error, Erc20Params};
use alloy_primitives::{Address, U256};
use stylus_sdk::{msg, prelude::*};

struct AfrozCoinParams;
impl Erc20Params for AfrozCoinParams {
    const NAME: &'static str = "AfrozCoin";
    const SYMBOL: &'static str = "AZ";
    const DECIMALS: u8 = 18;
}

sol_storage! {
    #[entrypoint]
    struct AfrozCoin {
        #[borrow]
        Erc20<AfrozCoinParams> erc20;
    }
}

#[public]
#[inherit(Erc20<AfrozCoinParams>)]
impl AfrozCoin {
    pub fn mint(&mut self, value: U256) -> Result<(), Erc20Error> {
        self.erc20.mint(msg::sender(), value)?;
        Ok(())
    }

    pub fn mint_to(&mut self, to: Address, value: U256) -> Result<(), Erc20Error> {
        self.erc20.mint(to, value)?;
        Ok(())
    }

    pub fn burn(&mut self, value: U256) -> Result<(), Erc20Error> {
        self.erc20.burn(msg::sender(), value)?;
        Ok(())
    }
}
