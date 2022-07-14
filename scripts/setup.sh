#!/bin/sh
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "${BLUE}==>1. Install required libraries: node, watchman, react-native-cli${NC}"
brew install node
brew install watchman
npm install -g react-native-cli yarn
# gem install cocoapods
# pod repo update

echo "${BLUE}==>2. Reset cache${NC}"
watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules

echo "${BLUE}==>3. Install Facebook SDK${NC}"
cp -R ./scripts/FacebookSDK ~/Documents

echo "${BLUE}==>4. Install libraries and open project${NC}"
yarn
react-native link

# cd ios
# pod install
# cd ..

echo "${BLUE} Congratulation! Please go to this page (http://bit.ly/2uR0TDB) for troubleshooting if you can not run the app ${NC}"

echo "${BLUE}==>5. Install Reactotron debug tool (optional) ${NC}"
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    brew update
    brew cask install reactotron
    open /Applications/Reactotron.app
fi

echo "${BLUE} Installing successful! Thank you for your purchased and using the product! ${NC}"
