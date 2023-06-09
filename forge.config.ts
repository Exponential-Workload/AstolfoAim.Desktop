// @ts-nocheck
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerDMG } from '@electron-forge/maker-dmg';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const binaryName = 'Clusterfuck'

const config: ForgeConfig = {
  packagerConfig: {
    executableName: binaryName
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      iconUrl: 'https://aim.femboy.cafe/favicon.png',
      remoteReleases: ''
    }),
    new MakerZIP({}, ['darwin', 'linux', 'win32']),
    new MakerDeb({
      options: {
        bin: binaryName
      }
    }),
    new MakerDMG({ format: 'ULFO' }),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer-app/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Exponential-Workload',
          name: 'AstolfoAim.Desktop'
        },
        prerelease: false
      }
    }
  ]
};

export default config;