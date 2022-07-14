echo "1. Install required libraries: node, yarn, react-native-cli"
scoop install nodejs
npm install -g react-native-cli yarn

echo "2. Reset cache"
Remove-Item $TMPDIR/react-* -Force -Recurse
Remove-Item .\node_modules -Force -Recurse

echo "3. Install libraries"
yarn

echo "Installing successful! Thank you for your purchased and using the product!"