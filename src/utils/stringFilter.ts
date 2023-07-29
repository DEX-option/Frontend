export function WalletString(account: string) {
  if (!account) return "";
  const beginning = account.substring(0, 5);
  const ending = account.substring(account.length - 4);
  return `${beginning}...${ending}`;
}
