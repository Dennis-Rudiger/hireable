const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
    packagerConfig: {
        asar: true,
        extraResource: ['./src/assets/SystemAudioDump'],
    name: 'Hireable',
        icon: 'src/assets/logo',
        // Exclude dev-only and non-runtime files from the packaged app
        ignore: (file) => {
            const path = require('path');
            const rel = path.relative(__dirname, file).replace(/\\/g, '/');
            // Block these directories entirely
            if (rel === 'website' || rel.startsWith('website/')) return true;
            if (rel === 'scripts' || rel.startsWith('scripts/')) return true;
            if (rel === '.git' || rel.startsWith('.git/')) return true;
            if (rel === '.github' || rel.startsWith('.github/')) return true;
            // Otherwise include
            return false;
        },
        // use `security find-identity -v -p codesigning` to find your identity
        // for macos signing
        // also fuck apple
        // osxSign: {
        //    identity: '<paste your identity here>',
        //   optionsForFile: (filePath) => {
        //       return {
        //           entitlements: 'entitlements.plist',
        //       };
        //   },
        // },
        // notarize if off cuz i ran this for 6 hours and it still didnt finish
        // osxNotarize: {
        //    appleId: 'your apple id',
        //    appleIdPassword: 'app specific password',
        //    teamId: 'your team id',
        // },
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'hireable',
                productName: 'Hireable',
                shortcutName: 'Hireable',
                createDesktopShortcut: true,
                createStartMenuShortcut: true,
                setupIcon: 'src/assets/logo.ico',
            },
        },
        {
            name: '@electron-forge/maker-dmg',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'Dennis-Rudiger',
                    name: 'hireable',
                },
                draft: false,
                prerelease: false,
            },
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};
