import { defineConfig } from 'tsup'

import { dependencies, peerDependencies } from './package.json'

export default defineConfig((options) => ({
  bundle: true,
  clean: process.env.NODE_ENV === 'production',
  entry: [
    'src/index.ts',
    'src/chains.ts',
    'src/connectors/coinbaseWallet.ts',
    'src/connectors/metaMask.ts',
    'src/connectors/walletConnect.ts',
    'src/connectors/mock/index.ts',
    'src/internal.ts',
    'src/providers/alchemy.ts',
    'src/providers/public.ts',
    'src/providers/infura.ts',
    'src/providers/jsonRpc.ts',
  ],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  format: ['esm'],
  platform: 'browser',

  // Generate declaration maps during development
  ...(options.watch
    ? { dts: true }
    : { onSuccess: 'tsc --emitDeclarationOnly --declaration' }),
}))