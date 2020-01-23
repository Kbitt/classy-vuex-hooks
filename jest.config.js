module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: [
        'js',
        'ts',
        // tell Jest to handle `*.vue` files
        'vue',
    ],
    transform: {
        // process `*.vue` files with `vue-jest`
        '.*\\.(vue)$': 'vue-jest',
    },
}
