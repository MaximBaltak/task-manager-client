const path = require('path');
module.exports = {
  webpack: {
    alias: {
        "@": path.resolve(__dirname, 'src'),
        "@api": path.resolve(__dirname, 'src/api'),
        "@assets": path.resolve(__dirname, 'src/assets'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@routers": path.resolve(__dirname, 'src/routers'),
        "@hooks": path.resolve(__dirname, 'src/hooks'),
        "@utils": path.resolve(__dirname, 'src/utils'),
        "@store": path.resolve(__dirname, 'src/store'),
        "@scss": path.resolve(__dirname, 'src/scss'),
        "@enum": path.resolve(__dirname, 'src/enum'),
    },
  },
};