import { AbstractHDElectrumWallet } from './abstract-hd-electrum-wallet';

/**
 * HD Wallet (BIP39).
 * In particular, BIP84 (Bech32 Native Segwit)
 * @see https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki
 */
export class HDsegwitBech32ExtraLayer extends AbstractHDElectrumWallet {
  static type = 'HDsegwitBech32ExtraLayer';
  static typeReadable = 'HD SegWit (BIP84 Bech32 Native) + TypingDNA';

  allowSend() {
    return true;
  }

  allowBatchSend() {
    return true;
  }

  allowSendMax() {
    return true;
  }

  allowHodlHodlTrading() {
    return true;
  }

  allowRBF() {
    return true;
  }

  allowPayJoin() {
    return true;
  }
}
