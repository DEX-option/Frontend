export function WalletString(account: string): string {
  if (!account) return "";
  const beginning = account.substring(0, 5);
  const ending = account.substring(account.length - 4);
  return `${beginning}...${ending}`;
}

export function IsAddressString(str: string): boolean {
  const addrSymbols = "0123456789abcdefABCDEF";
  const symbols = [...String(str)];
  let checkSymbols = true;
  symbols.forEach((symbol, index) => {
    if (index === 0 && symbol !== "0") {
      checkSymbols = false;
    }
    if (index === 1 && symbol !== "x") {
      checkSymbols = false;
    }
    if (index > 1 && addrSymbols.indexOf(symbol) === -1) {
      checkSymbols = false;
    }
  });
  return checkSymbols;
}
